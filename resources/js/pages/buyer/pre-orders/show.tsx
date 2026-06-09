import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, DollarSign, Palette, Gauge, CalendarRange, Wrench, Cog, Tag, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import buyer from '@/routes/buyer';

interface Payment {
    id: string;
    amount: string;
    payment_type: string;
    payment_method: string | null;
    payment_date: string;
    status: string;
}

interface PreOrder {
    id: string;
    listing: {
        id: string;
        make: { name: string };
        model: { name: string };
        year: number;
        order_date: string | null;
        expected_arrival: string | null;
        primary_image: { image_url: string } | null;
    } | null;
    make: { id: string; name: string } | null;
    model: { id: string; name: string } | null;
    customer_name: string;
    quantity: number;
    color: string | null;
    interior_color: string | null;
    trim_level: string | null;
    engine_preference: string | null;
    transmission_preference: string | null;
    drivetrain_preference: string | null;
    fuel_type: string | null;
    year_min: number | null;
    year_max: number | null;
    mileage_max: number | null;
    total_price: number | null;
    budget_min: number | null;
    budget_max: number | null;
    source: string | null;
    preferred_contact: string | null;
    status: string;
    notes: string | null;
    created_at: string;
    payments: Payment[];
}

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    pending: { label: 'Pending', variant: 'secondary' },
    confirmed: { label: 'Confirmed', variant: 'default' },
    fulfilled: { label: 'Fulfilled', variant: 'outline' },
    cancelled: { label: 'Cancelled', variant: 'destructive' },
};

const paymentTypeLabels: Record<string, string> = {
    deposit: 'Deposit',
    partial: 'Partial',
    full: 'Full Payment',
    refund: 'Refund',
};

function SpecBadge({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <Icon className="size-3" />
            {label}: <span className="text-foreground">{value}</span>
        </span>
    );
}

export default function BuyerPreOrderShow({ preOrder }: { preOrder: PreOrder }) {
    const cfg = statusConfig[preOrder.status] ?? { label: preOrder.status, variant: 'outline' as const };

    const vehicleName = preOrder.listing
        ? `${preOrder.listing.make.name} ${preOrder.listing.model.name} (${preOrder.listing.year})`
        : (preOrder.make && preOrder.model ? `${preOrder.make.name} ${preOrder.model.name}` : 'Vehicle TBD');

    const formatCurrency = (amount: number | string) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(amount));

    const totalPaid = preOrder.payments
        .filter((p) => p.status === 'completed' && p.payment_type !== 'refund')
        .reduce((sum, p) => sum + Number(p.amount), 0);

    const remaining = preOrder.total_price != null ? preOrder.total_price - totalPaid : null;

    return (
        <>
            <Head title={`Pre-Order: ${vehicleName}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={buyer.preOrders.index()}><ArrowLeft className="size-4" /></Link>
                    </Button>
                    {preOrder.listing?.primary_image && (
                        <img
                            src={preOrder.listing.primary_image.image_url}
                            alt={vehicleName}
                            className="size-14 rounded-lg object-cover border shrink-0"
                        />
                    )}
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h1 className="text-2xl font-bold tracking-tight">{vehicleName}</h1>
                            <Badge variant={cfg.variant} className="text-xs">{cfg.label}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">Pre-order details</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2"><Info className="size-4 text-muted-foreground" /> Pre-Order Details</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-3 text-sm">
                            <div className="flex justify-between border-b border-border/50 pb-2.5">
                                <span className="text-muted-foreground">Status</span>
                                <Badge variant={cfg.variant}>{cfg.label}</Badge>
                            </div>
                            <div className="flex justify-between border-b border-border/50 pb-2.5">
                                <span className="text-muted-foreground">Quantity</span>
                                <span className="font-semibold">{preOrder.quantity}</span>
                            </div>
                            {preOrder.listing?.order_date && (
                                <div className="flex justify-between border-b border-border/50 pb-2.5">
                                    <span className="text-muted-foreground">Order Date</span>
                                    <span>{new Date(preOrder.listing.order_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                            )}
                            {preOrder.listing?.expected_arrival && (
                                <div className="flex justify-between border-b border-border/50 pb-2.5">
                                    <span className="text-muted-foreground">Expected Arrival</span>
                                    <span className="text-amber-600 font-medium">
                                        {new Date(preOrder.listing.expected_arrival).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                            )}
                            {preOrder.color && (
                                <div className="flex justify-between border-b border-border/50 pb-2.5">
                                    <span className="text-muted-foreground">Exterior Color</span>
                                    <span className="font-medium">{preOrder.color}</span>
                                </div>
                            )}
                            {preOrder.interior_color && (
                                <div className="flex justify-between border-b border-border/50 pb-2.5">
                                    <span className="text-muted-foreground">Interior Color</span>
                                    <span className="font-medium">{preOrder.interior_color}</span>
                                </div>
                            )}
                            {(preOrder.trim_level || preOrder.engine_preference || preOrder.transmission_preference || preOrder.drivetrain_preference || preOrder.fuel_type) && (
                                <div className="border-b border-border/50 pb-2.5">
                                    <div className="flex flex-wrap gap-2">
                                        {preOrder.trim_level && <SpecBadge icon={Tag} label="Trim" value={preOrder.trim_level} />}
                                        {preOrder.engine_preference && <SpecBadge icon={Wrench} label="Engine" value={preOrder.engine_preference} />}
                                        {preOrder.transmission_preference && <SpecBadge icon={Cog} label="Trans" value={preOrder.transmission_preference.charAt(0).toUpperCase() + preOrder.transmission_preference.slice(1)} />}
                                        {preOrder.drivetrain_preference && <SpecBadge icon={Gauge} label="Drive" value={preOrder.drivetrain_preference.toUpperCase()} />}
                                        {preOrder.fuel_type && <SpecBadge icon={Palette} label="Fuel" value={preOrder.fuel_type.replace('_', ' ')} />}
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-between border-b border-border/50 pb-2.5">
                                <span className="text-muted-foreground">Placed on</span>
                                <span>{new Date(preOrder.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            {preOrder.notes && (
                                <div className="pt-1">
                                    <p className="text-muted-foreground text-xs mb-1">Notes:</p>
                                    <p className="whitespace-pre-wrap">{preOrder.notes}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex items-center gap-2"><DollarSign className="size-4 text-muted-foreground" /> Payment Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 space-y-3 text-sm">
                                <div className="flex justify-between border-b border-border/50 pb-2.5">
                                    <span className="text-muted-foreground">Total Paid</span>
                                    <span className="font-bold text-emerald-600">{formatCurrency(totalPaid)}</span>
                                </div>
                                {preOrder.total_price != null && (
                                    <div className="flex justify-between border-b border-border/50 pb-2.5">
                                        <span className="text-muted-foreground">Vehicle Price</span>
                                        <span className="font-semibold">{formatCurrency(preOrder.total_price)}</span>
                                    </div>
                                )}
                                {remaining != null && (
                                    <div className="flex justify-between pb-2.5">
                                        <span className="text-muted-foreground">Remaining</span>
                                        <span className={`font-bold ${remaining <= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                            {remaining <= 0 ? 'Paid in full ✓' : formatCurrency(remaining)}
                                        </span>
                                    </div>
                                )}
                                {preOrder.total_price != null && totalPaid > 0 && (
                                    <div className="pt-1">
                                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-emerald-500 transition-all"
                                                style={{ width: `${Math.min((totalPaid / preOrder.total_price) * 100, 100)}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                            <span>{formatCurrency(totalPaid)} paid</span>
                                            <span>{formatCurrency(preOrder.total_price)} total</span>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {(preOrder.budget_min || preOrder.budget_max) && (
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base flex items-center gap-2"><DollarSign className="size-4 text-muted-foreground" /> Budget</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                        <div className="text-center flex-1">
                                            <p className="text-xs text-muted-foreground mb-0.5">Min</p>
                                            <p className="font-semibold">{preOrder.budget_min ? formatCurrency(preOrder.budget_min) : '—'}</p>
                                        </div>
                                        <span className="text-muted-foreground text-lg font-light px-2">→</span>
                                        <div className="text-center flex-1">
                                            <p className="text-xs text-muted-foreground mb-0.5">Max</p>
                                            <p className="font-semibold">{preOrder.budget_max ? formatCurrency(preOrder.budget_max) : '∞'}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-3">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <DollarSign className="size-4 text-muted-foreground" />
                                    Payments
                                    <Badge variant="secondary" className="ml-1 text-xs">{preOrder.payments.length}</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                {preOrder.payments.length === 0 ? (
                                    <p className="text-sm text-muted-foreground text-center py-4">No payments recorded yet.</p>
                                ) : (
                                    <div className="rounded-lg border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-muted/30">
                                                    <TableHead className="text-xs font-semibold">Date</TableHead>
                                                    <TableHead className="text-xs font-semibold">Type</TableHead>
                                                    <TableHead className="text-xs font-semibold">Amount</TableHead>
                                                    <TableHead className="text-xs font-semibold">Method</TableHead>
                                                    <TableHead className="text-xs font-semibold">Status</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {preOrder.payments.map((p) => (
                                                    <TableRow key={p.id}>
                                                        <TableCell className="text-sm">{new Date(p.payment_date).toLocaleDateString()}</TableCell>
                                                        <TableCell className="text-sm">{paymentTypeLabels[p.payment_type] ?? p.payment_type}</TableCell>
                                                        <TableCell className="font-semibold">{formatCurrency(p.amount)}</TableCell>
                                                        <TableCell className="text-sm text-muted-foreground">{p.payment_method ?? '-'}</TableCell>
                                                        <TableCell>
                                                            <Badge variant={p.status === 'completed' ? 'default' : 'secondary'} className="text-xs">{p.status}</Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

BuyerPreOrderShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: buyer.dashboard() },
        { title: 'Pre-Orders', href: buyer.preOrders.index() },
        { title: 'Detail', href: '' },
    ],
};
