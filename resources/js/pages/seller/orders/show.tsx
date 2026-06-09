import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Download,
    Car,
    CreditCard,
    User,
    Hash,
    Calendar,
    CircleCheck,
    CircleX,
    Clock,
    Phone,
    MapPin,
    Mail,
    Fuel,
    Gauge,
    Palette,
    Tag,
    Timer,
    Cpu,
    FolderIcon,
    Check,
    MessageSquare,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import messages from '@/routes/messages';
import seller from '@/routes/seller';

interface OrderShow {
    id: string;
    order_number: string;
    status: string;
    subtotal: number;
    tax: number;
    fees: number;
    total: number;
    notes: string | null;
    placed_at: string | null;
    completed_at: string | null;
    created_at: string;
    buyer: {
        id: string;
        full_name: string;
        email: string;
        phone: string | null;
        location: string | null;
        type: string;
        is_verified: boolean;
        join_date: string | null;
    };
    items: {
        id: string;
        price: number;
        condition: string | null;
        listing: {
            make: { name: string };
            model: { name: string };
            year: number;
            vin: string | null;
            image_url: string | null;
            mileage: number | null;
            fuel_type: string | null;
            transmission: string | null;
            color: string | null;
            interior_color: string | null;
            engine_size: string | null;
            location: string | null;
            category: { name: string } | null;
            original_price: string | null;
        };
        offer_id: string | null;
    }[];
    transactions: {
        id: string;
        type: string;
        method: string | null;
        reference: string | null;
        amount: number;
        status: string;
        processed_at: string | null;
        created_at: string;
    }[];
}

const si: Record<string, any> = {
    pending: Clock,
    confirmed: CircleCheck,
    processing: Clock,
    completed: CircleCheck,
    cancelled: CircleX,
    refunded: CircleX,
};
const sc: Record<string, string> = {
    pending: 'text-yellow-500',
    confirmed: 'text-blue-500',
    processing: 'text-blue-500',
    completed: 'text-green-500',
    cancelled: 'text-red-500',
    refunded: 'text-gray-500',
};

export default function SellerOrderShow({ order }: { order: OrderShow }) {
    const fmt = (n: number) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(n);

    const StatusIcon = si[order.status] || Clock;
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);

    const updateStatus = (newStatus: string) => {
        setUpdatingStatus(newStatus);
        router.put(
            seller.orders.update(order.id).url,
            { status: newStatus },
            { preserveScroll: true, onFinish: () => setUpdatingStatus(null) },
        );
    };

    const sellerOptions = ['confirmed', 'processing', 'completed', 'cancelled'];

    return (
        <>
            <Head title={`Invoice - ${order.order_number}`} />
            <div className="mx-auto flex h-full w-full max-w-4xl flex-1 flex-col gap-5 p-5">
                <div className="no-print flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={seller.orders.index()} className="gap-2">
                            <ArrowLeft className="size-4" /> My Sales
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => window.print()}>
                        <Download className="mr-1.5 size-4" /> Print Invoice
                    </Button>
                </div>

                <div>
                    {/* ── HEADER ── */}
                    <div className="flex items-start justify-between px-6 py-5">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">INVOICE</h1>
                            <p className="mt-0.5 text-sm text-muted-foreground">#{order.order_number}</p>
                        </div>
                        {/* ── STATUS CONTROL ── */}
                        <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
                            <DialogTrigger asChild>
                                <button className="flex items-center gap-2 px-6 py-4 cursor-pointer hover:opacity-80">
                                    <StatusIcon className={`size-5 ${sc[order.status] || 'text-muted-foreground'}`} />
                                    <span className={`text-lg font-semibold capitalize ${sc[order.status]}`}>{order.status}</span>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="w-[200px]">
                                <DialogHeader>
                                    <DialogTitle className="text-sm font-medium">Change Status</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col gap-1">
                                    {sellerOptions.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => {
 updateStatus(s); setStatusDialogOpen(false); 
}}
                                            disabled={updatingStatus !== null}
                                            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium text-left hover:bg-muted transition-colors ${s === order.status ? 'bg-muted' : ''} ${sc[s] || ''}`}
                                        >
                                            {s.charAt(0).toUpperCase() + s.slice(1)}
                                            {s === order.status && <Check className="size-4 ml-auto" />}
                                        </button>
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* ── DATES ── */}
                    <div className="grid grid-cols-2 gap-4 px-6 py-3 text-sm sm:grid-cols-4">
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Invoice Date</p>
                            <p className="mt-0.5 font-medium">
                                {order.placed_at ? new Date(order.placed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Due Date</p>
                            <p className="mt-0.5 font-medium">
                                {order.placed_at ? new Date(new Date(order.placed_at).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                            </p>
                        </div>
                        {order.completed_at && (
                            <div>
                                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Paid Date</p>
                                <p className="mt-0.5 font-medium">
                                    {new Date(order.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                        )}
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Payment Terms</p>
                            <p className="mt-0.5 font-medium capitalize">{order.status === 'completed' ? 'Paid' : 'Net 30'}</p>
                        </div>
                    </div>

                    {/* ── PARTIES ── */}
                    <div className="grid grid-cols-1 gap-6 px-6 py-4 sm:grid-cols-2">
                        <div className="space-y-3">
                            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                <User className="size-3.5" /> Buyer
                            </div>
                            <div className="space-y-2">
                                <p className="text-base font-semibold">{order.buyer.full_name}</p>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <p className="flex items-center gap-2"><Mail className="size-3.5 shrink-0" />{order.buyer.email}</p>
                                    {order.buyer.phone && <p className="flex items-center gap-2"><Phone className="size-3.5 shrink-0" />{order.buyer.phone}</p>}
                                    {order.buyer.location && <p className="flex items-center gap-2"><MapPin className="size-3.5 shrink-0" />{order.buyer.location}</p>}
                                    <p className="flex items-center gap-2"><User className="size-3.5 shrink-0" />{order.buyer.type}</p>
                                    {order.buyer.join_date && <p className="flex items-center gap-2"><Calendar className="size-3.5 shrink-0" />Joined {new Date(order.buyer.join_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>}
                                    {order.buyer.is_verified && <p className="flex items-center gap-2"><CircleCheck className="size-3.5 shrink-0 text-green-500" />Verified</p>}
                                </div>
                                <Button variant="outline" size="sm" asChild className="mt-2">
                                    <Link href={messages.create()} data={{ receiver_id: order.buyer.id }}>
                                        <MessageSquare className="size-3.5 mr-1" /> Message
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* ── VEHICLE DETAILS ── */}
                    {order.items.map((item) => (
                        <div key={item.id}>
                            <div className="px-6 py-4">
                                <div className="flex items-center gap-2 text-sm font-semibold mb-4">
                                    <Car className="size-4 text-muted-foreground" />
                                    Vehicle Details
                                    {order.items.length > 1 && <span className="text-muted-foreground font-normal">(Item {order.items.indexOf(item) + 1} of {order.items.length})</span>}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-5">
                                    <div className="size-32 bg-muted overflow-hidden shrink-0">
                                        {item.listing.image_url ? (
                                            <img src={item.listing.image_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Car className="size-8 text-muted-foreground/30" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2.5 text-sm">
                                        <DetailRow icon={Tag} label="Make/Model" value={`${item.listing.make.name} ${item.listing.model.name}`} />
                                        <DetailRow icon={Calendar} label="Year" value={String(item.listing.year)} />
                                        <DetailRow icon={Hash} label="VIN" value={item.listing.vin || 'N/A'} />
                                        <DetailRow icon={Timer} label="Mileage" value={item.listing.mileage ? `${Number(item.listing.mileage).toLocaleString()} mi` : 'N/A'} />
                                        <DetailRow icon={Fuel} label="Fuel Type" value={item.listing.fuel_type || 'N/A'} />
                                        <DetailRow icon={Gauge} label="Transmission" value={item.listing.transmission || 'N/A'} />
                                        <DetailRow icon={Cpu} label="Engine" value={item.listing.engine_size || 'N/A'} />
                                        <DetailRow icon={Palette} label="Exterior" value={item.listing.color || 'N/A'} />
                                        <DetailRow icon={Palette} label="Interior" value={item.listing.interior_color || 'N/A'} />
                                        <DetailRow icon={Car} label="Condition" value={item.listing.condition ? item.listing.condition.charAt(0).toUpperCase() + item.listing.condition.slice(1) : 'N/A'} />
                                        <DetailRow icon={MapPin} label="Location" value={item.listing.location || 'N/A'} />
                                        {item.listing.category && <DetailRow icon={FolderIcon} label="Category" value={item.listing.category.name} />}
                                    </div>
                                </div>
                            </div>

                            {/* ── PRICING ── */}
                            <div className="px-6 py-4">
                                <div className="flex items-center gap-2 text-sm font-semibold mb-3">Pricing</div>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left">
                                            <th className="pb-2 font-medium text-xs text-muted-foreground uppercase tracking-wider">Description</th>
                                            <th className="pb-2 font-medium text-xs text-muted-foreground uppercase tracking-wider text-right w-28">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2">{item.listing.make.name} {item.listing.model.name} ({item.listing.year})</td>
                                            <td className="py-2 text-right font-semibold">{fmt(item.price)}</td>
                                        </tr>
                                        {item.listing.original_price && Number(item.listing.original_price) > item.price && (
                                            <tr>
                                                <td className="py-2 text-muted-foreground">Original Price</td>
                                                <td className="py-2 text-right text-muted-foreground line-through">{fmt(Number(item.listing.original_price))}</td>
                                            </tr>
                                        )}
                                        {order.subtotal !== item.price && (
                                            <tr>
                                                <td className="py-2 text-muted-foreground">Subtotal</td>
                                                <td className="py-2 text-right">{fmt(order.subtotal)}</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="py-2 text-muted-foreground">Tax</td>
                                            <td className="py-2 text-right">{fmt(order.tax)}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 text-muted-foreground">Fees</td>
                                            <td className="py-2 text-right">{fmt(order.fees)}</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="pt-3 text-base font-bold">Total</td>
                                            <td className="pt-3 text-right text-base font-bold">{fmt(order.total)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    ))}

                    {/* ── PAYMENT ── */}
                    <div className="px-6 py-4">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <CreditCard className="size-4 text-muted-foreground" />
                                Payment Transactions
                            </div>
                        </div>
                        {order.transactions.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No transactions recorded.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left">
                                            <th className="pr-3 pb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">Type</th>
                                            <th className="pr-3 pb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">Method</th>
                                            <th className="pr-3 pb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">Reference</th>
                                            <th className="pr-3 pb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">Date</th>
                                            <th className="pb-2 text-right text-xs font-medium tracking-wider text-muted-foreground uppercase">Amount</th>
                                            <th className="pb-2 text-right text-xs font-medium tracking-wider text-muted-foreground uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.transactions.map((tx) => (
                                            <tr key={tx.id}>
                                                <td className="py-3 pr-3"><span className="text-sm font-medium capitalize">{tx.type}</span></td>
                                                <td className="py-3 pr-3"><span className="text-xs text-muted-foreground">{tx.method || '-'}</span></td>
                                                <td className="py-3 pr-3"><span className="font-mono text-xs text-muted-foreground">{tx.reference || '-'}</span></td>
                                                <td className="py-3 pr-3">
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(tx.processed_at || tx.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                </td>
                                                <td className="py-3 pr-3 text-right font-semibold whitespace-nowrap">{fmt(tx.amount)}</td>
                                                <td className="py-3 text-right">
                                                    <span className={`flex items-center gap-1.5 justify-end text-xs font-medium ${sc[tx.status] || ''}`}>
                                                        <span className={`size-2 rounded-full ${
                                                            tx.status === 'completed' ? 'bg-green-500' :
                                                            tx.status === 'failed' ? 'bg-red-500' :
                                                            tx.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
                                                        }`} />
                                                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* ── NOTES ── */}
                    {order.notes && (
                        <div className="px-6 py-4">
                            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1">Notes</p>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{order.notes}</p>
                        </div>
                    )}

                    {/* ── FOOTER ── */}
                    <div className="px-6 py-4 text-center text-xs text-muted-foreground">
                        <p>Thank you for your business!</p>
                        <p className="mt-0.5">Invoice #{order.order_number} &middot; Generated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    body { background: white !important; padding: 0 !important; margin: 0 !important; }
                    @page { margin: 0.3in; }
                    .no-print { display: none !important; }
                    [data-slot="sidebar"] { display: none !important; }
                    [data-slot="sidebar-inset"] { margin: 0 !important; padding: 0 !important; width: 100% !important; max-width: 100% !important; }
                    [data-slot="sidebar-wrapper"] { display: block !important; }
                }
            `}</style>
        </>
    );
}

function DetailRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
    return (
        <div className="flex items-center gap-2">
            <Icon className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="text-muted-foreground">{label}:</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}

SellerOrderShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Sales', href: seller.orders.index() },
        { title: 'Sale Details', href: '' },
    ],
};
