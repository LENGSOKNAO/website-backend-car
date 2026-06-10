import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Download,
    Car,
    CreditCard,
    Store,
    User,
    Hash,
    Calendar,
    CircleCheck,
    CircleX,
    Clock,
    Phone,
    MapPin,
    Fuel,
    Gauge,
    Palette,
    FileText,
    Building2,
    Tag,
    Plus,
    Check,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import admin from '@/routes/admin';

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
    seller: {
        id: string;
        full_name: string;
        email: string;
        phone: string | null;
        location: string | null;
        dealer_name: string | null;
        is_dealer: boolean;
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
            condition: string | null;
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
export default function OrderShow({ order }: { order: OrderShow }) {
    const fmt = (n: number) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(n);
    const StatusIcon = si[order.status] || Clock;
    const [showTxDialog, setShowTxDialog] = useState(false);

    const txForm = useForm({
        type: 'payment',
        method: '',
        reference: '',
        amount: '',
        status: 'completed',
        notes: '',
    });

    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

    const updateStatus = (newStatus: string) => {
        setUpdatingStatus(newStatus);
        router.put(
            `/admin/orders/${order.id}/status`,
            { status: newStatus },
            {
                preserveScroll: true,
                onFinish: () => setUpdatingStatus(null),
            },
        );
    };

    const submitTransaction = (e: React.FormEvent) => {
        e.preventDefault();
        txForm.post(`/admin/orders/${order.id}/transactions`, {
            preserveScroll: true,
            onSuccess: () => {
                setShowTxDialog(false);
                txForm.reset();
            },
        });
    };

    return (
        <>
            <Head title={`Invoice - ${order.order_number}`} />
            <div className="mx-auto flex h-full w-full max-w-4xl flex-1 flex-col gap-5 p-5">
                <div className="no-print flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={admin.orders.index()} className="gap-2">
                            <ArrowLeft className="size-4" /> Orders
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.print()}
                    >
                        <Download className="mr-1.5 size-4" /> Print Invoice
                    </Button>
                </div>

                <div>
                    {/* ── HEADER ── */}
                    <div className="flex items-start justify-between px-6 py-5">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                INVOICE
                            </h1>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                                #{order.order_number}
                            </p>
                        </div>
                        {/* ── STATUS CONTROL ── */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="flex cursor-pointer items-center gap-2 px-6 py-4 hover:opacity-80">
                                    <StatusIcon
                                        className={`size-3 ${sc[order.status] || 'text-muted-foreground'}`}
                                    />
                                    <span
                                        className={`text-sm font-semibold capitalize ${sc[order.status]}`}
                                    >
                                        {order.status}
                                    </span>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="w-[200px]">
                                <DialogHeader>
                                    <DialogTitle className="text-sm font-medium">
                                        Change Status
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col gap-1">
                                    {[
                                        'pending',
                                        'confirmed',
                                        'processing',
                                        'completed',
                                        'cancelled',
                                        'refunded',
                                    ].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => updateStatus(s)}
                                            disabled={updatingStatus !== null}
                                            className={`flex items-center gap-3 px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-muted ${s === order.status ? 'bg-muted' : ''} ${sc[s] || ''}`}
                                        >
                                            {s.charAt(0).toUpperCase() +
                                                s.slice(1)}
                                            {s === order.status && (
                                                <Check className="ml-auto size-4" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* ── DATES ── */}
                    <div className="grid grid-cols-2 gap-4 px-6 py-3 text-sm sm:grid-cols-4">
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Invoice Date
                            </p>
                            <p className="mt-0.5 font-medium">
                                {order.placed_at
                                    ? new Date(
                                          order.placed_at,
                                      ).toLocaleDateString('en-US', {
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric',
                                      })
                                    : '-'}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Due Date
                            </p>
                            <p className="mt-0.5 font-medium">
                                {order.placed_at
                                    ? new Date(
                                          new Date(order.placed_at).getTime() +
                                              30 * 24 * 60 * 60 * 1000,
                                      ).toLocaleDateString('en-US', {
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric',
                                      })
                                    : '-'}
                            </p>
                        </div>
                        {order.completed_at && (
                            <div>
                                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                    Paid Date
                                </p>
                                <p className="mt-0.5 font-medium">
                                    {new Date(
                                        order.completed_at,
                                    ).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                        )}
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Payment Terms
                            </p>
                            <p className="mt-0.5 font-medium capitalize">
                                {order.status === 'completed'
                                    ? 'Paid'
                                    : 'Net 30'}
                            </p>
                        </div>
                    </div>

                    {/* ── PARTIES ── */}
                    <div className="grid grid-cols-1 gap-6 px-6 py-4 sm:grid-cols-2">
                        <div className="space-y-3">
                            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                <Building2 className="size-3.5" /> Seller
                            </div>
                            <div className="space-y-2">
                                <p className="text-base font-semibold">
                                    {order.seller.dealer_name || order.seller.full_name}
                                </p>
                                {order.seller.is_dealer && (
                                    <p className="text-sm text-muted-foreground">{order.seller.full_name}</p>
                                )}
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <p className="flex items-center gap-2"><Mail className="size-3.5 shrink-0" />{order.seller.email}</p>
                                    {order.seller.phone && <p className="flex items-center gap-2"><Phone className="size-3.5 shrink-0" />{order.seller.phone}</p>}
                                    {order.seller.location && <p className="flex items-center gap-2"><MapPin className="size-3.5 shrink-0" />{order.seller.location}</p>}
                                    <p className="flex items-center gap-2"><User className="size-3.5 shrink-0" />{order.seller.type}</p>
                                    {order.seller.join_date && <p className="flex items-center gap-2"><Calendar className="size-3.5 shrink-0" />Joined {new Date(order.seller.join_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>}
                                    {order.seller.is_verified && <p className="flex items-center gap-2"><CircleCheck className="size-3.5 shrink-0 text-green-500" />Verified</p>}
                                </div>
                            </div>
                        </div>
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
                            </div>
                        </div>
                    </div>

                    {/* ── VEHICLE DETAILS ── */}
                    {order.items.map((item) => (
                        <div key={item.id}>
                            <div className="px-6 py-4">
                                <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
                                    <Car className="size-4 text-muted-foreground" />
                                    Vehicle Details
                                    {order.items.length > 1 && (
                                        <span className="font-normal text-muted-foreground">
                                            (Item{' '}
                                            {order.items.indexOf(item) + 1} of{' '}
                                            {order.items.length})
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-5 sm:flex-row">
                                    <div className="size-32 shrink-0 overflow-hidden bg-muted">
                                        {item.listing.image_url ? (
                                            <img
                                                src={item.listing.image_url}
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <Car className="size-8 text-muted-foreground/30" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-2.5 text-sm sm:grid-cols-3">
                                        <DetailRow
                                            icon={Tag}
                                            label="Make/Model"
                                            value={`${item.listing.make.name} ${item.listing.model.name}`}
                                        />
                                        <DetailRow
                                            icon={Calendar}
                                            label="Year"
                                            value={String(item.listing.year)}
                                        />
                                        <DetailRow
                                            icon={Hash}
                                            label="VIN"
                                            value={item.listing.vin || 'N/A'}
                                        />
                                        <DetailRow
                                            icon={Timer}
                                            label="Mileage"
                                            value={
                                                item.listing.mileage
                                                    ? `${Number(item.listing.mileage).toLocaleString()} mi`
                                                    : 'N/A'
                                            }
                                        />
                                        <DetailRow
                                            icon={Fuel}
                                            label="Fuel Type"
                                            value={
                                                item.listing.fuel_type || 'N/A'
                                            }
                                        />
                                        <DetailRow
                                            icon={Gauge}
                                            label="Transmission"
                                            value={
                                                item.listing.transmission ||
                                                'N/A'
                                            }
                                        />
                                        <DetailRow
                                            icon={Cpu}
                                            label="Engine"
                                            value={
                                                item.listing.engine_size ||
                                                'N/A'
                                            }
                                        />
                                        <DetailRow
                                            icon={Palette}
                                            label="Exterior"
                                            value={item.listing.color || 'N/A'}
                                        />
                                        <DetailRow
                                            icon={Palette}
                                            label="Interior"
                                            value={
                                                item.listing.interior_color ||
                                                'N/A'
                                            }
                                        />
                                        <DetailRow
                                            icon={Car}
                                            label="Condition"
                                            value={
                                                item.listing.condition
                                                    ? item.listing.condition
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                      item.listing.condition.slice(
                                                          1,
                                                      )
                                                    : 'N/A'
                                            }
                                        />
                                        <DetailRow
                                            icon={MapPin}
                                            label="Location"
                                            value={
                                                item.listing.location || 'N/A'
                                            }
                                        />
                                        {item.listing.category && (
                                            <DetailRow
                                                icon={FolderIcon}
                                                label="Category"
                                                value={
                                                    item.listing.category.name
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* ── PRICING ── */}
                            <div className="px-6 py-4">
                                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                                    Pricing
                                </div>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left">
                                            <th className="pb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                                                Description
                                            </th>
                                            <th className="w-28 pb-2 text-right text-xs font-medium tracking-wider text-muted-foreground uppercase">
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2">
                                                {item.listing.make.name}{' '}
                                                {item.listing.model.name} (
                                                {item.listing.year})
                                            </td>
                                            <td className="py-2 text-right font-semibold">
                                                {fmt(item.price)}
                                            </td>
                                        </tr>
                                        {item.listing.original_price &&
                                            Number(
                                                item.listing.original_price,
                                            ) > Number(item.price) && (
                                                <tr>
                                                    <td className="py-2 text-xs text-muted-foreground">
                                                        MSRP / Original Price
                                                    </td>
                                                    <td className="py-2 text-right text-xs text-muted-foreground line-through">
                                                        {fmt(
                                                            Number(
                                                                item.listing
                                                                    .original_price,
                                                            ),
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}

                    {/* ── TOTALS ── */}
                    <div className="flex justify-end px-6 py-4">
                        <div className="w-full max-w-[280px] space-y-2 text-sm">
                            {order.items.length > 1 && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Subtotal ({order.items.length} items)
                                    </span>
                                    <span>{fmt(order.subtotal)}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Tax
                                </span>
                                <span>{fmt(order.tax)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Fees
                                </span>
                                <span>{fmt(order.fees)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between pt-1 text-base font-bold">
                                <span>Total Due</span>
                                <span className="text-lg">
                                    {fmt(order.total)}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Payment Status</span>
                                <span
                                    className={
                                        sc[order.status] ||
                                        'text-muted-foreground'
                                    }
                                >
                                    {order.status.charAt(0).toUpperCase() +
                                        order.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ── PAYMENT ── */}
                    <div className="px-6 py-4">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <CreditCard className="size-4 text-muted-foreground" />
                                Payment Transactions
                            </div>
                            <Dialog
                                open={showTxDialog}
                                onOpenChange={setShowTxDialog}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="no-print"
                                    >
                                        <Plus className="mr-1 size-3.5" /> Add
                                        Payment
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Add Transaction
                                        </DialogTitle>
                                        <DialogDescription>
                                            Record a payment or refund for this
                                            order.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form
                                        onSubmit={submitTransaction}
                                        className="space-y-4"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-1.5">
                                                <Label>Type</Label>
                                                <Select
                                                    value={txForm.data.type}
                                                    onValueChange={(v) =>
                                                        txForm.setData(
                                                            'type',
                                                            v,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="payment">
                                                            Payment
                                                        </SelectItem>
                                                        <SelectItem value="refund">
                                                            Refund
                                                        </SelectItem>
                                                        <SelectItem value="deposit">
                                                            Deposit
                                                        </SelectItem>
                                                        <SelectItem value="adjustment">
                                                            Adjustment
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-1.5">
                                                <Label>Status</Label>
                                                <Select
                                                    value={txForm.data.status}
                                                    onValueChange={(v) =>
                                                        txForm.setData(
                                                            'status',
                                                            v,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="completed">
                                                            Completed
                                                        </SelectItem>
                                                        <SelectItem value="pending">
                                                            Pending
                                                        </SelectItem>
                                                        <SelectItem value="failed">
                                                            Failed
                                                        </SelectItem>
                                                        <SelectItem value="refunded">
                                                            Refunded
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-1.5">
                                                <Label>Method</Label>
                                                <Select
                                                    value={txForm.data.method}
                                                    onValueChange={(v) =>
                                                        txForm.setData(
                                                            'method',
                                                            v,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value=" ">
                                                            None
                                                        </SelectItem>
                                                        <SelectItem value="credit_card">
                                                            Credit Card
                                                        </SelectItem>
                                                        <SelectItem value="bank_transfer">
                                                            Bank Transfer
                                                        </SelectItem>
                                                        <SelectItem value="cash">
                                                            Cash
                                                        </SelectItem>
                                                        <SelectItem value="check">
                                                            Check
                                                        </SelectItem>
                                                        <SelectItem value="wire">
                                                            Wire
                                                        </SelectItem>
                                                        <SelectItem value="other">
                                                            Other
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-1.5">
                                                <Label>Amount ($)</Label>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    placeholder="0.00"
                                                    value={txForm.data.amount}
                                                    onChange={(e) =>
                                                        txForm.setData(
                                                            'amount',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label>Reference (optional)</Label>
                                            <Input
                                                placeholder="Transaction ID / Check #"
                                                value={txForm.data.reference}
                                                onChange={(e) =>
                                                    txForm.setData(
                                                        'reference',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setShowTxDialog(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={txForm.processing}
                                            >
                                                Add Transaction
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                        {order.transactions.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No transactions recorded.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left">
                                            <th className="pr-3 pb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                                                Type
                                            </th>
                                            <th className="pr-3 pb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                                                Method
                                            </th>
                                            <th className="pr-3 pb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                                                Reference
                                            </th>
                                            <th className="pr-3 pb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                                                Date
                                            </th>
                                            <th className="pb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                                                Amount
                                            </th>
                                            <th className="pb-2 text-right text-xs font-medium tracking-wider text-muted-foreground uppercase">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.transactions.map((tx) => (
                                            <TxRow
                                                key={tx.id}
                                                tx={tx}
                                                orderId={order.id}
                                                fmt={fmt}
                                                sc={sc}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* ── NOTES ── */}
                    {order.notes && (
                        <div className="px-6 py-4">
                            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                                <FileText className="size-4 text-muted-foreground" />
                                Notes & Terms
                            </div>
                            <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                                {order.notes}
                            </p>
                        </div>
                    )}

                    {/* ── FOOTER ── */}
                    <div className="space-y-1 px-6 py-4 text-center text-xs text-muted-foreground">
                        <p>Thank you for your business!</p>
                        <p>
                            Invoice #{order.order_number} &middot; Generated{' '}
                            {new Date().toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </p>
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

function TxRow({
    tx,
    orderId,
    fmt,
    sc,
}: {
    tx: any;
    orderId: string;
    fmt: (n: number) => string;
    sc: Record<string, string>;
}) {
    const [status, setStatus] = useState(tx.status);
    const [updating, setUpdating] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const changeStatus = (newStatus: string) => {
        setUpdating(true);
        setStatus(newStatus);
        router.put(
            `/admin/orders/${orderId}/transactions/${tx.id}/status`,
            { status: newStatus },
            {
                preserveScroll: true,
                onFinish: () => setUpdating(false),
            },
        );
    };

    const dotColor =
        status === 'completed'
            ? 'bg-green-500'
            : status === 'failed'
              ? 'bg-red-500'
              : status === 'pending'
                ? 'bg-yellow-500'
                : 'bg-gray-500';

    const ts = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    const txOptions = ['pending', 'completed', 'failed', 'refunded'];

    return (
        <tr>
            <td className="py-3 pr-3">
                <span className="text-sm font-medium capitalize">
                    {tx.type}
                </span>
                {tx.method && (
                    <span className="block text-xs text-muted-foreground">
                        {tx.method}
                    </span>
                )}
            </td>
            <td className="py-3 pr-3">
                <span className="font-mono text-xs text-muted-foreground">
                    {tx.reference || '-'}
                </span>
            </td>
            <td className="py-3 pr-3">
                <span className="text-xs text-muted-foreground">
                    {new Date(tx.processed_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </span>
            </td>
            <td className="py-3 pr-3">
                <span className="text-xs text-muted-foreground">
                    {new Date(tx.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </span>
            </td>
            <td className="py-3 pr-3 font-semibold whitespace-nowrap">
                {fmt(tx.amount)}
            </td>
            <td className="py-3 text-right">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild className="flex w-full justify-end">
                        <button className="flex cursor-pointer items-center gap-1.5 text-xs font-medium hover:opacity-80">
                            <span
                                className={`size-2 rounded-full ${dotColor}`}
                            />
                            <span className={sc[status] || ''}>
                                {ts(status)}
                            </span>
                        </button>
                    </DialogTrigger>
                    <DialogContent className="w-[180px]">
                        <DialogHeader>
                            <DialogTitle className="text-sm font-medium">
                                Change Status
                            </DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-1 text-end">
                            {txOptions.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => {
                                        changeStatus(s);
                                        setDialogOpen(false);
                                    }}
                                    disabled={updating}
                                    className={`flex items-center gap-3 px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-muted ${s === status ? 'bg-muted' : ''} ${sc[s] || ''}`}
                                >
                                    <span
                                        className={`size-2 rounded-full ${
                                            s === 'completed'
                                                ? 'bg-green-500'
                                                : s === 'failed'
                                                  ? 'bg-red-500'
                                                  : s === 'pending'
                                                    ? 'bg-yellow-500'
                                                    : 'bg-gray-500'
                                        }`}
                                    />
                                    {ts(s)}
                                    {s === status && (
                                        <Check className="ml-auto size-4" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
                {updating && (
                    <span className="ml-1 text-xs text-blue-500">...</span>
                )}
            </td>
        </tr>
    );
}

function DetailRow({
    icon: Icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-2">
            <Icon className="size-3.5 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="truncate text-sm font-medium">{value}</p>
            </div>
        </div>
    );
}

function Mail({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
        </svg>
    );
}

function Timer({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );
}

function Cpu({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 3v1.5M16.5 3v1.5M3.375 9h17.25M3.375 13.5h17.25M3.375 18h17.25M3.375 22.5h17.25M16.5 22.5V21M8.25 22.5V21M3.375 6.75h17.25"
            />
        </svg>
    );
}

function FolderIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            />
        </svg>
    );
}

function BadgePercent({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9h.008v.008H9V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 15l6-6"
            />
        </svg>
    );
}

OrderShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Orders', href: admin.orders.index() },
        { title: 'Invoice', href: '' },
    ],
};
