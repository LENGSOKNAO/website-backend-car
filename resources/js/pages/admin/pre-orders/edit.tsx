import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronDown, Palette, Gauge, Cog, CalendarRange, DollarSign,
    Phone, BadgeHelp, ShoppingCart, ChevronRight, Wrench,
} from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Collapsible, CollapsibleContent, CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/routes/admin';

interface CarMake { id: string; name: string; models: { id: string; name: string }[] }
interface ListingOption { id: string; label: string }
interface PreOrderData {
    id: string; listing_id: string | null; make_id: string; model_id: string;
    make: CarMake; model: { id: string; name: string };
    listing: ListingOption | null;
    customer_name: string; customer_email: string; customer_phone: string | null;
    quantity: number; status: string; notes: string | null;
    color: string | null; interior_color: string | null;
    trim_level: string | null; engine_preference: string | null;
    transmission_preference: string | null; drivetrain_preference: string | null;
    fuel_type: string | null;
    year_min: number | null; year_max: number | null; mileage_max: number | null;
    total_price: number | null;
    budget_min: number | null; budget_max: number | null;
    source: string | null; preferred_contact: string | null;
    internal_notes: string | null; special_requests: string | null;
}

const trimOptions = ['LE', 'SE', 'XLE', 'Limited', 'Sport', 'Premium', 'Platinum', 'Touring', 'GT', 'TRD'];
const engineOptions = ['V4', 'V6', 'V8', 'Turbo', 'Hybrid', 'Plug-in Hybrid', 'Electric', 'Diesel'];
const transmissionOptions = ['automatic', 'manual', 'cvt', 'dsg'];
const drivetrainOptions = ['fwd', 'rwd', 'awd', '4wd'];
const fuelOptions = ['gasoline', 'diesel', 'hybrid', 'plugin_hybrid', 'electric'];
const sourceOptions = ['website', 'referral', 'walk-in', 'social_media', 'email', 'phone', 'other'];

export default function PreOrderEdit({ preOrder, makes, listings }: { preOrder: PreOrderData; makes: CarMake[]; listings: ListingOption[] }) {
    const { data, setData, put, processing, errors } = useForm({
        listing_id: preOrder.listing_id ?? '',
        make_id: preOrder.listing_id ? '' : preOrder.make_id,
        model_id: preOrder.listing_id ? '' : preOrder.model_id,
        customer_name: preOrder.customer_name,
        customer_email: preOrder.customer_email,
        customer_phone: preOrder.customer_phone ?? '',
        quantity: preOrder.quantity.toString(),
        color: preOrder.color ?? '',
        interior_color: preOrder.interior_color ?? '',
        trim_level: preOrder.trim_level ?? '',
        engine_preference: preOrder.engine_preference ?? '',
        transmission_preference: preOrder.transmission_preference ?? '',
        drivetrain_preference: preOrder.drivetrain_preference ?? '',
        fuel_type: preOrder.fuel_type ?? '',
        year_min: preOrder.year_min?.toString() ?? '',
        year_max: preOrder.year_max?.toString() ?? '',
        mileage_max: preOrder.mileage_max?.toString() ?? '',
        total_price: preOrder.total_price?.toString() ?? '',
        budget_min: preOrder.budget_min?.toString() ?? '',
        budget_max: preOrder.budget_max?.toString() ?? '',
        source: preOrder.source ?? '',
        preferred_contact: preOrder.preferred_contact ?? 'email',
        status: preOrder.status,
        notes: preOrder.notes ?? '',
        internal_notes: preOrder.internal_notes ?? '',
        special_requests: preOrder.special_requests ?? '',
    });

    const [specsOpen, setSpecsOpen] = useState(
        !!(preOrder.color || preOrder.interior_color || preOrder.trim_level || preOrder.engine_preference ||
           preOrder.transmission_preference || preOrder.drivetrain_preference || preOrder.fuel_type ||
           preOrder.year_min || preOrder.year_max || preOrder.mileage_max)
    );
    const [detailsOpen, setDetailsOpen] = useState(
        !!(preOrder.budget_min || preOrder.budget_max || preOrder.source || preOrder.notes ||
           preOrder.internal_notes || preOrder.special_requests)
    );

    const handleTypeChange = (val: string) => {
        if (val === 'listing') {
 setData('listing_id', ''); setData('make_id', ''); setData('model_id', ''); 
} else {
 setData('listing_id', ''); 
}
    };
    const orderType = data.listing_id ? 'listing' : 'model';

    const submit = (e: React.FormEvent) => {
 e.preventDefault(); put(admin.preOrders.update(preOrder.id).url); 
};
    const selectedMake = makes.find((m) => m.id === data.make_id);

    return (
        <>
            <Head title="Edit Pre-Order" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Edit Pre-Order</h1>
                <form onSubmit={submit} className="max-w-3xl space-y-6">
                    <Card>
                        <CardHeader><CardTitle className="text-base flex items-center gap-2"><ShoppingCart className="size-4" /> Order</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2 col-span-2">
                                <Label>Order Type</Label>
                                <div className="flex gap-2">
                                    <Button type="button" variant={orderType === 'listing' ? 'default' : 'outline'} onClick={() => handleTypeChange('listing')}>From Listing</Button>
                                    <Button type="button" variant={orderType === 'model' ? 'default' : 'outline'} onClick={() => handleTypeChange('model')}>By Make/Model</Button>
                                </div>
                            </div>
                            {orderType === 'listing' && (
                                <div className="grid gap-2 col-span-2">
                                    <Label>Vehicle Listing</Label>
                                    <Select value={data.listing_id} onValueChange={(v) => setData('listing_id', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select a listing..." /></SelectTrigger>
                                        <SelectContent>{listings.map((l) => <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>)}</SelectContent>
                                    </Select>
                                    <InputError message={errors.listing_id} />
                                </div>
                            )}
                            {orderType === 'model' && (
                                <>
                                    <div className="grid gap-2">
                                        <Label>Make</Label>
                                        <Select value={data.make_id} onValueChange={(v) => {
 setData('make_id', v); setData('model_id', ''); 
}}>
                                            <SelectTrigger><SelectValue placeholder="Select make" /></SelectTrigger>
                                            <SelectContent>{makes.map((m) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <InputError message={errors.make_id} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Model</Label>
                                        <Select value={data.model_id} onValueChange={(v) => setData('model_id', v)} disabled={!data.make_id}>
                                            <SelectTrigger><SelectValue placeholder={data.make_id ? 'Select model' : 'Select make first'} /></SelectTrigger>
                                            <SelectContent>{selectedMake?.models.map((mo) => <SelectItem key={mo.id} value={mo.id}>{mo.name}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <InputError message={errors.model_id} />
                                    </div>
                                </>
                            )}
                            <div className="grid gap-2">
                                <Label>Customer Name *</Label>
                                <Input value={data.customer_name} onChange={(e) => setData('customer_name', e.target.value)} />
                                <InputError message={errors.customer_name} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Customer Email *</Label>
                                <Input type="email" value={data.customer_email} onChange={(e) => setData('customer_email', e.target.value)} />
                                <InputError message={errors.customer_email} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Phone</Label>
                                <Input value={data.customer_phone} onChange={(e) => setData('customer_phone', e.target.value)} />
                                <InputError message={errors.customer_phone} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Quantity *</Label>
                                <Input type="number" min={1} value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} />
                                <InputError message={errors.quantity} />
                            </div>
                        </CardContent>
                    </Card>

                    <Collapsible open={specsOpen} onOpenChange={setSpecsOpen}>
                        <Card>
                            <CollapsibleTrigger asChild>
                                <CardHeader className="cursor-pointer select-none hover:bg-muted/50 transition-colors">
                                    <CardTitle className="text-base flex items-center justify-between">
                                        <span className="flex items-center gap-2"><Gauge className="size-4" /> Vehicle Specifications</span>
                                        <ChevronDown className={`size-4 text-muted-foreground transition-transform ${specsOpen ? 'rotate-0' : '-rotate-90'}`} />
                                    </CardTitle>
                                </CardHeader>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <CardContent className="grid grid-cols-2 gap-4 border-t pt-4">
                                    <div className="col-span-2">
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-3"><Palette className="size-3.5" /> Colors</h4>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="flex items-center gap-1.5"><Palette className="size-3.5 text-muted-foreground" /> Exterior Color</Label>
                                        <Input value={data.color} onChange={(e) => setData('color', e.target.value)} placeholder="e.g. Black, White, Red" />
                                        <InputError message={errors.color} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="flex items-center gap-1.5"><Palette className="size-3.5 text-muted-foreground" /> Interior Color</Label>
                                        <Input value={data.interior_color} onChange={(e) => setData('interior_color', e.target.value)} placeholder="e.g. Black Leather" />
                                        <InputError message={errors.interior_color} />
                                    </div>

                                    <div className="col-span-2 border-t pt-3 mt-1">
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-3"><Wrench className="size-3.5" /> Powertrain</h4>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="flex items-center gap-1.5"><BadgeHelp className="size-3.5 text-muted-foreground" /> Trim Level</Label>
                                        <Select value={data.trim_level} onValueChange={(v) => setData('trim_level', v)}>
                                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                            <SelectContent>{trimOptions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <InputError message={errors.trim_level} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="flex items-center gap-1.5"><Wrench className="size-3.5 text-muted-foreground" /> Engine</Label>
                                        <Select value={data.engine_preference} onValueChange={(v) => setData('engine_preference', v)}>
                                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                            <SelectContent>{engineOptions.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <InputError message={errors.engine_preference} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="flex items-center gap-1.5"><Cog className="size-3.5 text-muted-foreground" /> Transmission</Label>
                                        <Select value={data.transmission_preference} onValueChange={(v) => setData('transmission_preference', v)}>
                                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                            <SelectContent>{transmissionOptions.map((t) => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <InputError message={errors.transmission_preference} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="flex items-center gap-1.5"><Gauge className="size-3.5 text-muted-foreground" /> Drivetrain</Label>
                                        <Select value={data.drivetrain_preference} onValueChange={(v) => setData('drivetrain_preference', v)}>
                                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                            <SelectContent>{drivetrainOptions.map((d) => <SelectItem key={d} value={d}>{d.toUpperCase()}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <InputError message={errors.drivetrain_preference} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="flex items-center gap-1.5"><Palette className="size-3.5 text-muted-foreground" /> Fuel Type</Label>
                                        <Select value={data.fuel_type} onValueChange={(v) => setData('fuel_type', v)}>
                                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                            <SelectContent>{fuelOptions.map((f) => <SelectItem key={f} value={f}>{f.replace('_', ' ')}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <InputError message={errors.fuel_type} />
                                    </div>

                                    <div className="col-span-2 border-t pt-3 mt-1">
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-3"><CalendarRange className="size-3.5" /> Year &amp; Mileage</h4>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Year From</Label>
                                        <Input type="number" min="1900" max="2100" value={data.year_min} onChange={(e) => setData('year_min', e.target.value)} placeholder="e.g. 2024" />
                                        <InputError message={errors.year_min} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Year To</Label>
                                        <Input type="number" min="1900" max="2100" value={data.year_max} onChange={(e) => setData('year_max', e.target.value)} placeholder="e.g. 2026" />
                                        <InputError message={errors.year_max} />
                                    </div>
                                    <div className="grid gap-2 col-span-2">
                                        <Label>Max Mileage (if pre-owned)</Label>
                                        <Input type="number" min="0" value={data.mileage_max} onChange={(e) => setData('mileage_max', e.target.value)} placeholder="e.g. 30000" />
                                        <InputError message={errors.mileage_max} />
                                    </div>
                                    <div className="grid gap-2 col-span-2">
                                        <Label className="flex items-center gap-1.5"><DollarSign className="size-3.5 text-muted-foreground" /> Total Vehicle Price</Label>
                                        <Input type="number" min="0" step="0.01" value={data.total_price} onChange={(e) => setData('total_price', e.target.value)} placeholder="e.g. 45000.00" />
                                        <InputError message={errors.total_price} />
                                    </div>
                                </CardContent>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>

                    <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
                        <Card>
                            <CollapsibleTrigger asChild>
                                <CardHeader className="cursor-pointer select-none hover:bg-muted/50 transition-colors">
                                    <CardTitle className="text-base flex items-center justify-between">
                                        <span className="flex items-center gap-2"><BadgeHelp className="size-4" /> Additional Details</span>
                                        <ChevronDown className={`size-4 text-muted-foreground transition-transform ${detailsOpen ? 'rotate-0' : '-rotate-90'}`} />
                                    </CardTitle>
                                </CardHeader>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <CardContent className="grid grid-cols-2 gap-4 border-t pt-4">
                                    <div className="col-span-2">
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-3"><DollarSign className="size-3.5" /> Budget</h4>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Budget Min</Label>
                                        <Input type="number" min="0" step="0.01" placeholder="0.00" value={data.budget_min} onChange={(e) => setData('budget_min', e.target.value)} />
                                        <InputError message={errors.budget_min} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Budget Max</Label>
                                        <Input type="number" min="0" step="0.01" placeholder="0.00" value={data.budget_max} onChange={(e) => setData('budget_max', e.target.value)} />
                                        <InputError message={errors.budget_max} />
                                    </div>

                                    <div className="col-span-2 border-t pt-3 mt-1">
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-3"><Phone className="size-3.5" /> Source &amp; Contact</h4>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>How did they hear?</Label>
                                        <Select value={data.source} onValueChange={(v) => setData('source', v)}>
                                            <SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger>
                                            <SelectContent>{sourceOptions.map((s) => <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <InputError message={errors.source} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Preferred Contact</Label>
                                        <Select value={data.preferred_contact} onValueChange={(v) => setData('preferred_contact', v)}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="email">Email</SelectItem>
                                                <SelectItem value="phone">Phone</SelectItem>
                                                <SelectItem value="text">Text</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.preferred_contact} />
                                    </div>

                                    <div className="col-span-2 border-t pt-3 mt-1">
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-3"><BadgeHelp className="size-3.5" /> Notes</h4>
                                    </div>
                                    <div className="grid gap-2 col-span-2">
                                        <Label>Special Requests</Label>
                                        <Textarea value={data.special_requests} onChange={(e) => setData('special_requests', e.target.value)} rows={2} placeholder="Accessories, packages, customization..." />
                                        <InputError message={errors.special_requests} />
                                    </div>
                                    <div className="grid gap-2 col-span-2">
                                        <Label>Customer Notes</Label>
                                        <Textarea value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows={2} />
                                        <InputError message={errors.notes} />
                                    </div>
                                    <div className="grid gap-2 col-span-2">
                                        <Label className="text-orange-600">Internal Notes</Label>
                                        <Textarea value={data.internal_notes} onChange={(e) => setData('internal_notes', e.target.value)} rows={2} placeholder="Staff only..." />
                                        <InputError message={errors.internal_notes} />
                                    </div>
                                </CardContent>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>

                    <Card>
                        <CardHeader><CardTitle className="text-base">Status</CardTitle></CardHeader>
                        <CardContent>
                            <div className="grid gap-2 max-w-xs">
                                <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="confirmed">Confirmed</SelectItem>
                                        <SelectItem value="fulfilled">Fulfilled</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>Update Pre-Order</Button>
                        <Button variant="outline" asChild><Link href={admin.preOrders.index()}>Cancel</Link></Button>
                    </div>
                </form>
            </div>
        </>
    );
}

PreOrderEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Pre-Orders', href: admin.preOrders.index() },
        { title: 'Edit', href: '' },
    ],
};
