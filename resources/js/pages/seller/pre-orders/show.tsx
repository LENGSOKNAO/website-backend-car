import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft, Info, User, Mail, Phone, DollarSign,
    Palette, Gauge, CalendarRange, Wrench, Cog, Tag,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { dashboard } from '@/routes';
import seller from '@/routes/seller';

interface Payment {
    id: string;
    amount: string;
    payment_type: string;
    payment_method: string | null;
    reference: string | null;
    payment_date: string;
    status: string;
    notes: string | null;
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
    customer_email: string;
    customer_phone: string | null;
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
    budget_min: number | null;
    budget_max: number | null;
    total_price: number | null;
    source: string | null;
    preferred_contact: string | null;
    status: string;
    notes: string | null;
    special_requests: string | null;
    customer: { id: string; name: string; email: string; phone: string | null } | null;
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

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-medium text-right">{children}</span>
        </div>
    );
}

export default function SellerPreOrderShow({ preOrder, totalPaid }: { preOrder: PreOrder; totalPaid: number }) {
    const vehicleName = preOrder.listing
        ? `${preOrder.listing.make.name} ${preOrder.listing.model.name} (${preOrder.listing.year})`
        : (preOrder.make && preOrder.model ? `${preOrder.make.name} ${preOrder.model.name}` : 'Vehicle TBD');

    const cfg = statusConfig[preOrder.status] ?? { label: preOrder.status, variant: 'outline' as const };

    const formatCurrency = (amount: number | string) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(amount));

    return (
        <>
            <Head title={`Pre-Order: ${preOrder.customer_name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={seller.preOrders.index()}><ArrowLeft className="size-4" /></Link>
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
                                <h1 className="text-2xl font-bold tracking-tight">{preOrder.customer_name}</h1>
                                <Badge variant={cfg.variant} className="text-xs">{cfg.label}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-0.5">{vehicleName}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 space-y-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex items-center gap-2"><Info className="size-4 text-muted-foreground" /> Pre-Order Details</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="divide-y divide-border/50">
                                    <DetailRow label="Vehicle">
                                        <span className="font-semibold">{vehicleName}</span>
                                    </DetailRow>
                                    {preOrder.listing?.order_date && (
                                        <DetailRow label="Order Date">
                                            {new Date(preOrder.listing.order_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </DetailRow>
                                    )}
                                    {preOrder.listing?.expected_arrival && (
                                        <DetailRow label="Expected Arrival">
                                            <span className="text-amber-600 font-medium">
                                                {new Date(preOrder.listing.expected_arrival).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </DetailRow>
                                    )}
                                    <DetailRow label="Quantity">{preOrder.quantity}</DetailRow>
                                    <DetailRow label="Total Paid">
                                        <span className="font-bold text-emerald-600">{formatCurrency(totalPaid)}</span>
                                    </DetailRow>
                                    {preOrder.total_price != null && (
                                        <DetailRow label="Vehicle Price">
                                            <span className="font-semibold">{formatCurrency(preOrder.total_price)}</span>
                                        </DetailRow>
                                    )}
                                    {preOrder.total_price != null && (
                                        <DetailRow label="Remaining">
                                            <span className={`font-bold ${totalPaid >= preOrder.total_price ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                {totalPaid >= preOrder.total_price ? 'Paid in full' : formatCurrency(preOrder.total_price - totalPaid)}
                                            </span>
                                        </DetailRow>
                                    )}
                                    <DetailRow label="Date">
                                        {new Date(preOrder.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </DetailRow>
                                </div>
                            </CardContent>
                        </Card>

                        {(preOrder.color || preOrder.interior_color || preOrder.trim_level || preOrder.engine_preference ||
                            preOrder.transmission_preference || preOrder.drivetrain_preference || preOrder.fuel_type ||
                            preOrder.year_min || preOrder.year_max || preOrder.mileage_max) && (
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base flex items-center gap-2"><Gauge className="size-4 text-muted-foreground" /> Vehicle Specifications</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    {(preOrder.color || preOrder.interior_color) && (
                                        <div className="mb-3">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                <Palette className="size-3" /> Colors
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {preOrder.color && (
                                                    <span className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs">
                                                        <span className="size-3 rounded-full border" style={{ backgroundColor: preOrder.color.toLowerCase() }} />
                                                        Exterior: {preOrder.color}
                                                    </span>
                                                )}
                                                {preOrder.interior_color && (
                                                    <span className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs">
                                                        Interior: {preOrder.interior_color}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {(preOrder.trim_level || preOrder.engine_preference || preOrder.transmission_preference ||
                                        preOrder.drivetrain_preference || preOrder.fuel_type) && (
                                        <div className="mb-3">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                <Wrench className="size-3" /> Powertrain
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {preOrder.trim_level && <SpecBadge icon={Tag} label="Trim" value={preOrder.trim_level} />}
                                                {preOrder.engine_preference && <SpecBadge icon={Wrench} label="Engine" value={preOrder.engine_preference} />}
                                                {preOrder.transmission_preference && <SpecBadge icon={Cog} label="Trans" value={preOrder.transmission_preference.charAt(0).toUpperCase() + preOrder.transmission_preference.slice(1)} />}
                                                {preOrder.drivetrain_preference && <SpecBadge icon={Gauge} label="Drive" value={preOrder.drivetrain_preference.toUpperCase()} />}
                                                {preOrder.fuel_type && <SpecBadge icon={Palette} label="Fuel" value={preOrder.fuel_type.replace('_', ' ')} />}
                                            </div>
                                        </div>
                                    )}
                                    {(preOrder.year_min || preOrder.year_max || preOrder.mileage_max) && (
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                <CalendarRange className="size-3" /> Year &amp; Mileage
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <SpecBadge icon={CalendarRange} label="Year" value={`${preOrder.year_min || 'Any'} – ${preOrder.year_max || 'Any'}`} />
                                                {preOrder.mileage_max && <SpecBadge icon={Gauge} label="Max" value={`≤${preOrder.mileage_max.toLocaleString()} mi`} />}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {(preOrder.notes || preOrder.special_requests) && (
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base flex items-center gap-2"><Info className="size-4 text-muted-foreground" /> Notes</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0 space-y-3">
                                    {preOrder.notes && (
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Customer Notes</p>
                                            <p className="text-sm whitespace-pre-wrap">{preOrder.notes}</p>
                                        </div>
                                    )}
                                    {preOrder.special_requests && (
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Special Requests</p>
                                            <p className="text-sm whitespace-pre-wrap">{preOrder.special_requests}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex items-center gap-2"><User className="size-4 text-muted-foreground" /> Customer</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 space-y-3 text-sm">
                                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/50">
                                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                                        {preOrder.customer_name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-medium leading-tight">{preOrder.customer_name}</p>
                                {preOrder.preferred_contact && (
                                    <p className="text-xs text-muted-foreground capitalize">Prefers {preOrder.preferred_contact}</p>
                                )}
                                {preOrder.customer && (
                                    <p className="text-xs font-medium text-primary flex items-center gap-1">
                                        <User className="size-3" />
                                        Registered: {preOrder.customer.name}
                                    </p>
                                )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="size-4 text-muted-foreground shrink-0" />
                                    <a href={`mailto:${preOrder.customer_email}`} className="text-primary hover:underline truncate">{preOrder.customer_email}</a>
                                </div>
                                {preOrder.customer_phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="size-4 text-muted-foreground shrink-0" />
                                        <a href={`tel:${preOrder.customer_phone}`} className="text-primary hover:underline">{preOrder.customer_phone}</a>
                                    </div>
                                )}
                                {(preOrder.source || preOrder.preferred_contact) && (
                                    <>
                                        <div className="border-t border-border/50" />
                                        {preOrder.source && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground text-xs">Source</span>
                                                <span className="capitalize text-sm">{preOrder.source.replace('_', ' ')}</span>
                                            </div>
                                        )}
                                        {preOrder.preferred_contact && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground text-xs">Contact via</span>
                                                <span className="capitalize text-sm">{preOrder.preferred_contact}</span>
                                            </div>
                                        )}
                                    </>
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
                    </div>
                </div>

                {preOrder.payments.length > 0 && (
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <DollarSign className="size-4 text-muted-foreground" />
                                Payments
                                <Badge variant="secondary" className="ml-1 text-xs">{preOrder.payments.length}</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="rounded-lg border">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/30">
                                            <TableHead className="text-xs font-semibold">Date</TableHead>
                                            <TableHead className="text-xs font-semibold">Type</TableHead>
                                            <TableHead className="text-xs font-semibold">Amount</TableHead>
                                            <TableHead className="text-xs font-semibold">Method</TableHead>
                                            <TableHead className="text-xs font-semibold">Reference</TableHead>
                                            <TableHead className="text-xs font-semibold">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {preOrder.payments.map((p) => (
                                            <TableRow key={p.id} className="hover:bg-muted/20">
                                                <TableCell className="text-sm">{new Date(p.payment_date).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <span className="text-sm font-medium">{paymentTypeLabels[p.payment_type] ?? p.payment_type}</span>
                                                </TableCell>
                                                <TableCell className="font-semibold">{formatCurrency(p.amount)}</TableCell>
                                                <TableCell className="text-sm text-muted-foreground">{p.payment_method ?? '-'}</TableCell>
                                                <TableCell className="text-xs font-mono text-muted-foreground">{p.reference ?? '-'}</TableCell>
                                                <TableCell>
                                                    <Badge variant={p.status === 'completed' ? 'default' : p.status === 'pending' ? 'secondary' : 'destructive'} className="text-xs">
                                                        {p.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

SellerPreOrderShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Pre-Orders', href: seller.preOrders.index() },
        { title: 'Detail', href: '' },
    ],
};
