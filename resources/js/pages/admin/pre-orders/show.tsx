import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft, Edit, Mail, Phone, User, DollarSign, Trash2,
    Palette, Gauge, CalendarRange, Wrench, Cog, Tag, Info, Plus,
} from 'lucide-react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/routes/admin';

interface Payment {
    id: string;
    amount: string;
    payment_type: string;
    payment_method: string | null;
    reference: string | null;
    payment_date: string;
    status: string;
    notes: string | null;
    created_by: { id: string; name: string } | null;
    created_at: string;
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
        seller: { id: string; full_name: string; email: string; phone: string | null } | null;
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
    internal_notes: string | null;
    special_requests: string | null;
    customer: { id: string; name: string; email: string; phone: string | null } | null;
    created_by: { id: string; name: string } | null;
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

export default function PreOrderShow({ preOrder, totalPaid, paymentSummary }: { preOrder: PreOrder; totalPaid: number; paymentSummary: { total_paid: number; deposit: number; partial: number; full: number; refund: number; payment_count: number; completed_count: number } }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: '',
        payment_type: 'deposit',
        payment_method: '',
        reference: '',
        payment_date: new Date().toISOString().split('T')[0],
        status: 'completed',
        notes: '',
    });

    const cfg = statusConfig[preOrder.status] ?? { label: preOrder.status, variant: 'outline' as const };
    const vehicleName = preOrder.listing
        ? `${preOrder.listing.make.name} ${preOrder.listing.model.name} (${preOrder.listing.year})`
        : (preOrder.make && preOrder.model ? `${preOrder.make.name} ${preOrder.model.name}` : 'Vehicle TBD');

    const submitPayment = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.preOrders.show(preOrder.id).url + '/payments', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const deletePayment = (paymentId: string) => {
        if (confirm('Delete this payment?')) {
            router.delete(`/admin/pre-orders/${preOrder.id}/payments/${paymentId}`, { preserveScroll: true });
        }
    };

    const formatCurrency = (amount: number | string) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(amount));

    return (
        <>
            <Head title={`Pre-Order: ${preOrder.customer_name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={admin.preOrders.index()}><ArrowLeft className="size-4" /></Link>
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
                    <Button asChild size="sm">
                        <Link href={admin.preOrders.edit(preOrder.id)}><Edit className="size-3.5 mr-1.5" /> Edit</Link>
                    </Button>
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
                                        <span className="font-bold text-emerald-600">{formatCurrency(paymentSummary.total_paid)}</span>
                                    </DetailRow>
                                    {preOrder.total_price != null && (
                                        <DetailRow label="Vehicle Price">
                                            <span className="font-semibold">{formatCurrency(preOrder.total_price)}</span>
                                        </DetailRow>
                                    )}
                                    {preOrder.total_price != null && (
                                        <DetailRow label="Remaining">
                                            <span className={`font-bold ${paymentSummary.total_paid >= preOrder.total_price ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                {paymentSummary.total_paid >= preOrder.total_price ? 'Paid in full' : formatCurrency(preOrder.total_price - paymentSummary.total_paid)}
                                            </span>
                                        </DetailRow>
                                    )}
                                    <DetailRow label="Created">
                                        {new Date(preOrder.created_at).toLocaleDateString('en-US', {
                                            month: 'long', day: 'numeric', year: 'numeric',
                                        })}
                                    </DetailRow>
                                    <DetailRow label="Created By">{preOrder.created_by?.name ?? 'Customer'}</DetailRow>
                                    {preOrder.listing?.seller && (
                                        <DetailRow label="Seller">{preOrder.listing.seller.full_name}</DetailRow>
                                    )}
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
                                    {preOrder.internal_notes && (
                                        <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
                                            <p className="text-xs font-semibold text-orange-700 uppercase tracking-wider mb-1">Internal Notes</p>
                                            <p className="text-sm whitespace-pre-wrap text-orange-900">{preOrder.internal_notes}</p>
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
                                            <p className="text-xs font-medium text-primary flex items-center gap-1 mt-0.5">
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
                                        <Separator />
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

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <DollarSign className="size-4 text-muted-foreground" />
                            Payments
                            <Badge variant="secondary" className="ml-1 text-xs">{paymentSummary.payment_count}</Badge>
                        </CardTitle>
                        <span className="text-sm font-bold text-emerald-600">{formatCurrency(paymentSummary.total_paid)} collected</span>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                            <div className="rounded-lg border bg-card p-3">
                                <p className="text-xs text-muted-foreground mb-0.5">Deposits</p>
                                <p className="text-lg font-bold">{formatCurrency(paymentSummary.deposit)}</p>
                            </div>
                            <div className="rounded-lg border bg-card p-3">
                                <p className="text-xs text-muted-foreground mb-0.5">Partial</p>
                                <p className="text-lg font-bold">{formatCurrency(paymentSummary.partial)}</p>
                            </div>
                            <div className="rounded-lg border bg-card p-3">
                                <p className="text-xs text-muted-foreground mb-0.5">Full Payments</p>
                                <p className="text-lg font-bold">{formatCurrency(paymentSummary.full)}</p>
                            </div>
                            <div className="rounded-lg border bg-card p-3">
                                <p className="text-xs text-muted-foreground mb-0.5">Refunds</p>
                                <p className="text-lg font-bold text-red-500">{formatCurrency(paymentSummary.refund)}</p>
                            </div>
                        </div>

                        {paymentSummary.payment_count > 0 && (
                            <div className="mb-5">
                                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                                    <span>Total collected</span>
                                    <span>{formatCurrency(paymentSummary.total_paid)}</span>
                                </div>
                                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-emerald-500 transition-all"
                                        style={{ width: `${Math.min((paymentSummary.total_paid / (preOrder.total_price ?? paymentSummary.total_paid + 1)) * 100, 100)}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs mt-1">
                                    <span className="text-muted-foreground">{paymentSummary.completed_count} of {paymentSummary.payment_count} payments completed</span>
                                    {preOrder.total_price != null && (
                                        <span className={paymentSummary.total_paid >= preOrder.total_price ? 'text-emerald-600 font-medium' : 'text-muted-foreground'}>
                                            {formatCurrency(paymentSummary.total_paid)} / {formatCurrency(preOrder.total_price)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
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
                                        <TableHead className="text-xs font-semibold">Notes</TableHead>
                                        <TableHead className="w-10"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {preOrder.payments.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                                                <DollarSign className="size-8 mx-auto mb-2 text-muted-foreground/40" />
                                                <p className="font-medium">No payments recorded</p>
                                                <p className="text-xs mt-0.5">Add a payment using the form below.</p>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        preOrder.payments.map((p) => (
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
                                                <TableCell className="text-xs text-muted-foreground max-w-[120px] truncate">{p.notes ?? '-'}</TableCell>
                                                <TableCell>
                                                    <Button variant="ghost" size="icon" className="size-7" onClick={() => deletePayment(p.id)}>
                                                        <Trash2 className="size-3 text-muted-foreground hover:text-destructive" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="mt-6 rounded-lg border border-dashed bg-muted/20 p-5">
                            <h3 className="text-sm font-semibold flex items-center gap-1.5 mb-4">
                                <Plus className="size-3.5" /> Add Payment
                            </h3>
                            <form onSubmit={submitPayment} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium">Amount *</Label>
                                    <Input type="number" min="0.01" step="0.01" placeholder="0.00" value={data.amount} onChange={(e) => setData('amount', e.target.value)} />
                                    <InputError message={errors.amount} />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium">Type *</Label>
                                    <Select value={data.payment_type} onValueChange={(v) => setData('payment_type', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="deposit">Deposit</SelectItem>
                                            <SelectItem value="partial">Partial</SelectItem>
                                            <SelectItem value="full">Full Payment</SelectItem>
                                            <SelectItem value="refund">Refund</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.payment_type} />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium">Method</Label>
                                    <Select value={data.payment_method} onValueChange={(v) => setData('payment_method', v)}>
                                        <SelectTrigger><SelectValue placeholder="Method" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="credit_card">Credit Card</SelectItem>
                                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                            <SelectItem value="check">Check</SelectItem>
                                            <SelectItem value="wire">Wire</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.payment_method} />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium">Date *</Label>
                                    <Input type="date" value={data.payment_date} onChange={(e) => setData('payment_date', e.target.value)} />
                                    <InputError message={errors.payment_date} />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium">Reference</Label>
                                    <Input placeholder="TXN-xxx" value={data.reference} onChange={(e) => setData('reference', e.target.value)} />
                                    <InputError message={errors.reference} />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label className="text-xs font-medium">Status</Label>
                                    <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="failed">Failed</SelectItem>
                                            <SelectItem value="refunded">Refunded</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>
                                <div className="grid gap-1.5 col-span-2 lg:col-span-2">
                                    <Label className="text-xs font-medium">Notes</Label>
                                    <Input placeholder="Optional notes..." value={data.notes} onChange={(e) => setData('notes', e.target.value)} />
                                    <InputError message={errors.notes} />
                                </div>
                                <div className="flex items-end lg:col-span-4">
                                    <Button type="submit" disabled={processing} size="sm">
                                        <Plus className="size-3.5 mr-1.5" /> Add Payment
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

PreOrderShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Pre-Orders', href: admin.preOrders.index() },
        { title: 'Detail', href: '' },
    ],
};
