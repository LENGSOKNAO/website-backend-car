import { Head, Link, useForm, router } from '@inertiajs/react';
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

const sourceOptions = ['website', 'referral', 'walk-in', 'social_media', 'email', 'phone', 'other'];

const trimOptions = ['LE', 'SE', 'XLE', 'Limited', 'Sport', 'Premium', 'Platinum', 'Touring', 'GT', 'TRD'];
const engineOptions = ['V4', 'V6', 'V8', 'Turbo', 'Hybrid', 'Plug-in Hybrid', 'Electric', 'Diesel'];
const transmissionOptions = ['automatic', 'manual', 'cvt', 'dsg'];
const drivetrainOptions = ['fwd', 'rwd', 'awd', '4wd'];
const fuelOptions = ['gasoline', 'diesel', 'hybrid', 'plugin_hybrid', 'electric'];

function SpecIcon({ label }: { label: string }) {
    const icons: Record<string, React.ReactNode> = {
        'Trim Level': <BadgeHelp className="size-3.5" />,
        Engine: <Wrench className="size-3.5" />,
        Transmission: <Cog className="size-3.5" />,
        Drivetrain: <Gauge className="size-3.5" />,
        'Fuel Type': <Palette className="size-3.5" />,
    };

    return <span className="text-muted-foreground">{icons[label] ?? <ChevronRight className="size-3.5" />}</span>;
}

export default function PreOrderCreate({ makes, listings }: { makes: CarMake[]; listings: ListingOption[] }) {
    const { data, setData, post, processing, errors } = useForm({
        listing_id: '',
        make_id: '', model_id: '',
        customer_id: '', customer_name: '', customer_email: '', customer_phone: '',
        quantity: '1',
        color: '', interior_color: '',
        trim_level: '', engine_preference: '', transmission_preference: '',
        drivetrain_preference: '', fuel_type: '',
        year_min: '', year_max: '', mileage_max: '', total_price: '',
        budget_min: '', budget_max: '',
        source: '', preferred_contact: 'email',
        status: 'pending', notes: '', internal_notes: '', special_requests: '',
    });

    const [specsOpen, setSpecsOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const handleTypeChange = (val: string) => {
        setData('listing_id', val === 'listing' ? '' : '');

        if (val === 'listing') {
 setData('make_id', ''); setData('model_id', ''); 
}
    };
    const orderType = data.listing_id ? 'listing' : (data.make_id ? 'model' : '');

    const submit = (e: React.FormEvent) => {
 e.preventDefault(); post(admin.preOrders.store().url); 
};
    const selectedMake = makes.find((m) => m.id === data.make_id);

    return (
        <>
            <Head title="New Pre-Order" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">New Pre-Order</h1>
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
                                    <Label htmlFor="listing_id">Vehicle Listing</Label>
                                    <Select value={data.listing_id} onValueChange={(v) => setData('listing_id', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select a coming soon listing..." /></SelectTrigger>
                                        <SelectContent>{listings.map((l) => <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>)}</SelectContent>
                                    </Select>
                                    <InputError message={errors.listing_id} />
                                </div>
                            )}
                            {orderType === 'model' && (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="make_id">Make *</Label>
                                        <Select value={data.make_id} onValueChange={(v) => {
 setData('make_id', v); setData('model_id', ''); 
}}>
                                            <SelectTrigger><SelectValue placeholder="Select make" /></SelectTrigger>
                                            <SelectContent>{makes.map((m) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <InputError message={errors.make_id} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="model_id">Model *</Label>
                                        <Select value={data.model_id} onValueChange={(v) => setData('model_id', v)} disabled={!data.make_id}>
                                            <SelectTrigger><SelectValue placeholder={data.make_id ? 'Select model' : 'Select make first'} /></SelectTrigger>
                                            <SelectContent>{selectedMake?.models.map((mo) => <SelectItem key={mo.id} value={mo.id}>{mo.name}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <InputError message={errors.model_id} />
                                    </div>
                                </>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="customer_name">Customer Name *</Label>
                                <Input id="customer_name" value={data.customer_name} onChange={(e) => setData('customer_name', e.target.value)} />
                                <InputError message={errors.customer_name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="customer_email">Customer Email *</Label>
                                <Input id="customer_email" type="email" value={data.customer_email} onChange={(e) => setData('customer_email', e.target.value)} />
                                <InputError message={errors.customer_email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="customer_phone">Phone</Label>
                                <Input id="customer_phone" value={data.customer_phone} onChange={(e) => setData('customer_phone', e.target.value)} />
                                <InputError message={errors.customer_phone} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="quantity">Quantity *</Label>
                                <Input id="quantity" type="number" min={1} value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} />
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
                                        <Label htmlFor="color" className="flex items-center gap-1.5"><Palette className="size-3.5 text-muted-foreground" /> Exterior Color</Label>
                                        <Input id="color" value={data.color} onChange={(e) => setData('color', e.target.value)} placeholder="e.g. Black, White, Red" />
                                        <InputError message={errors.color} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="interior_color" className="flex items-center gap-1.5"><Palette className="size-3.5 text-muted-foreground" /> Interior Color</Label>
                                        <Input id="interior_color" value={data.interior_color} onChange={(e) => setData('interior_color', e.target.value)} placeholder="e.g. Black Leather" />
                                        <InputError message={errors.interior_color} />
                                    </div>

                                    <div className="col-span-2 border-t pt-3 mt-1">
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-3"><Wrench className="size-3.5" /> Powertrain</h4>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="trim_level" className="flex items-center gap-1.5"><SpecIcon label="Trim Level" /> Trim Level</Label>
                                        <Select value={data.trim_level} onValueChange={(v) => setData('trim_level', v)}>
                                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                            <SelectContent>{trimOptions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <InputError message={errors.trim_level} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="engine_preference" className="flex items-center gap-1.5"><SpecIcon label="Engine" /> Engine</Label>
                                        <Select value={data.engine_preference} onValueChange={(v) => setData('engine_preference', v)}>
                                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                            <SelectContent>{engineOptions.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <InputError message={errors.engine_preference} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="transmission_preference" className="flex items-center gap-1.5"><SpecIcon label="Transmission" /> Transmission</Label>
                                        <Select value={data.transmission_preference} onValueChange={(v) => setData('transmission_preference', v)}>
                                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                            <SelectContent>{transmissionOptions.map((t) => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <InputError message={errors.transmission_preference} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="drivetrain_preference" className="flex items-center gap-1.5"><SpecIcon label="Drivetrain" /> Drivetrain</Label>
                                        <Select value={data.drivetrain_preference} onValueChange={(v) => setData('drivetrain_preference', v)}>
                                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                            <SelectContent>{drivetrainOptions.map((d) => <SelectItem key={d} value={d}>{d.toUpperCase()}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <InputError message={errors.drivetrain_preference} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="fuel_type" className="flex items-center gap-1.5"><SpecIcon label="Fuel Type" /> Fuel Type</Label>
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
                                        <Label htmlFor="year_min">Year From</Label>
                                        <Input id="year_min" type="number" min="1900" max="2100" value={data.year_min} onChange={(e) => setData('year_min', e.target.value)} placeholder="e.g. 2024" />
                                        <InputError message={errors.year_min} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="year_max">Year To</Label>
                                        <Input id="year_max" type="number" min="1900" max="2100" value={data.year_max} onChange={(e) => setData('year_max', e.target.value)} placeholder="e.g. 2026" />
                                        <InputError message={errors.year_max} />
                                    </div>
                                    <div className="grid gap-2 col-span-2">
                                        <Label htmlFor="mileage_max">Max Mileage (if pre-owned)</Label>
                                        <Input id="mileage_max" type="number" min="0" value={data.mileage_max} onChange={(e) => setData('mileage_max', e.target.value)} placeholder="e.g. 30000" />
                                        <InputError message={errors.mileage_max} />
                                    </div>
                                    <div className="grid gap-2 col-span-2">
                                        <Label htmlFor="total_price" className="flex items-center gap-1.5"><DollarSign className="size-3.5 text-muted-foreground" /> Total Vehicle Price</Label>
                                        <Input id="total_price" type="number" min="0" step="0.01" value={data.total_price} onChange={(e) => setData('total_price', e.target.value)} placeholder="e.g. 45000.00" />
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
                                        <Label htmlFor="budget_min">Budget Min</Label>
                                        <Input id="budget_min" type="number" min="0" step="0.01" placeholder="0.00" value={data.budget_min} onChange={(e) => setData('budget_min', e.target.value)} />
                                        <InputError message={errors.budget_min} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="budget_max">Budget Max</Label>
                                        <Input id="budget_max" type="number" min="0" step="0.01" placeholder="0.00" value={data.budget_max} onChange={(e) => setData('budget_max', e.target.value)} />
                                        <InputError message={errors.budget_max} />
                                    </div>

                                    <div className="col-span-2 border-t pt-3 mt-1">
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 mb-3"><Phone className="size-3.5" /> Source &amp; Contact</h4>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="source">How did they hear?</Label>
                                        <Select value={data.source} onValueChange={(v) => setData('source', v)}>
                                            <SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger>
                                            <SelectContent>{sourceOptions.map((s) => <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>)}</SelectContent>
                                        </Select>
                                        <InputError message={errors.source} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="preferred_contact">Preferred Contact</Label>
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
                                        <Label htmlFor="special_requests">Special Requests</Label>
                                        <Textarea id="special_requests" value={data.special_requests} onChange={(e) => setData('special_requests', e.target.value)} rows={2} placeholder="Accessories, packages, customization..." />
                                        <InputError message={errors.special_requests} />
                                    </div>
                                    <div className="grid gap-2 col-span-2">
                                        <Label htmlFor="notes">Customer Notes</Label>
                                        <Textarea id="notes" value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows={2} />
                                        <InputError message={errors.notes} />
                                    </div>
                                    <div className="grid gap-2 col-span-2">
                                        <Label htmlFor="internal_notes" className="text-orange-600">Internal Notes</Label>
                                        <Textarea id="internal_notes" value={data.internal_notes} onChange={(e) => setData('internal_notes', e.target.value)} rows={2} placeholder="Staff only..." />
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
                        <Button type="submit" disabled={processing}>Create Pre-Order</Button>
                        <Button variant="outline" asChild><Link href={admin.preOrders.index()}>Cancel</Link></Button>
                    </div>
                </form>
            </div>
        </>
    );
}

PreOrderCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Pre-Orders', href: admin.preOrders.index() },
        { title: 'New', href: '' },
    ],
};
