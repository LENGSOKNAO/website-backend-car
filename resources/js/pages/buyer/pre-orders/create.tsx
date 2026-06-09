import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronDown, Palette, Gauge, CalendarRange, BadgeHelp, ShoppingCart, Wrench, Cog,
    Phone, Mail, User, Hash, Tag, ArrowLeft, Fuel, MapPin, Timer, CheckCircle2,
    Search,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import clsx from 'clsx';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
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
import buyer from '@/routes/buyer';

interface CarMake { id: string; name: string; models: { id: string; name: string }[] }

interface ListingCar {
    id: string; label: string; make: string | null; model: string | null;
    year: number | null; price: string | null; mileage: number | null;
    fuel_type: string | null; transmission: string | null;
    status: string; image: string | null;
}

interface AuthUser { name: string; email: string }

const sourceOptions = ['website', 'referral', 'walk-in', 'social_media', 'email', 'phone', 'other'];
const transmissionOptions = ['automatic', 'manual', 'cvt'];
const drivetrainOptions = ['fwd', 'rwd', 'awd', '4wd'];
const fuelOptions = ['gasoline', 'diesel', 'hybrid', 'plugin_hybrid', 'electric'];

const formatCurrency = (v: string | number | null) => {
    if (v == null) return null;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(v));
};

export default function BuyerPreOrderCreate({ makes, listings, auth }: { makes: CarMake[]; listings: ListingCar[]; auth: { user: AuthUser } }) {
    const { data, setData, post, processing, errors } = useForm({
        listing_id: '',
        make_id: '', model_id: '',
        customer_name: auth.user.name,
        customer_email: auth.user.email,
        customer_phone: '',
        quantity: '1',
        color: '', interior_color: '',
        trim_level: '', engine_preference: '', transmission_preference: '',
        drivetrain_preference: '', fuel_type: '',
        year_min: '', year_max: '', mileage_max: '',
        budget_min: '', budget_max: '',
        source: '', preferred_contact: 'email',
        notes: '',
    });

    const [specsOpen, setSpecsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const inStockListings = useMemo(() => listings.filter((l) => l.status === 'in_stock'), [listings]);
    const comingSoonListings = useMemo(() => listings.filter((l) => l.status === 'coming_soon'), [listings]);
    const hasListings = inStockListings.length > 0 || comingSoonListings.length > 0;

    const filteredListings = useMemo(() => {
        if (!searchQuery) return listings;
        const q = searchQuery.toLowerCase();
        return listings.filter(
            (l) =>
                l.make?.toLowerCase().includes(q) ||
                l.model?.toLowerCase().includes(q) ||
                String(l.year).includes(q) ||
                l.label.toLowerCase().includes(q)
        );
    }, [listings, searchQuery]);

    const selectedListing = listings.find((l) => l.id === data.listing_id);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(buyer.preOrders.store().url);
    };

    const selectedMake = makes.find((m) => m.id === data.make_id);

    return (
        <>
            <Head title="Pre-Order a Vehicle" />
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 p-4 lg:p-8">
                <div className="flex items-center gap-4">
                    <button type="button" onClick={() => window.history.back()} className="flex size-10 items-center justify-center rounded-xl border border-border hover:bg-muted transition-colors">
                        <ArrowLeft className="size-4 text-muted-foreground" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Pre-Order a Vehicle</h1>
                        <p className="text-sm text-muted-foreground">Find and reserve your next vehicle</p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-10">
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">1</div>
                            <div>
                                <h2 className="font-semibold">Choose a Vehicle</h2>
                                <p className="text-xs text-muted-foreground">Select from inventory or search by make &amp; model</p>
                            </div>
                        </div>

                        {hasListings ? (
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        className="pl-10 h-11 rounded-xl border-border/60 bg-muted/30 focus-visible:bg-white transition-colors"
                                        placeholder="Search by make, model, or year..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {filteredListings.length > 0 ? (
                                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                        {filteredListings.map((car) => {
                                            const isSelected = data.listing_id === car.id;
                                            return (
                                                <button
                                                    key={car.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setData('listing_id', car.id);
                                                        setData('make_id', '');
                                                        setData('model_id', '');
                                                    }}
                                                    className={clsx(
                                                        'group relative overflow-hidden rounded-xl border-2 text-left transition-all',
                                                        isSelected
                                                            ? 'border-primary shadow-md shadow-primary/10'
                                                            : 'border-border hover:border-muted-foreground/30 hover:shadow-sm'
                                                    )}
                                                >
                                                    <div className="aspect-[16/9] bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                                                        {car.image ? (
                                                            <img src={car.image} alt={car.label} className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                                        ) : (
                                                            <div className="flex size-full items-center justify-center">
                                                                <CarOutline className="size-16 text-muted-foreground/20" />
                                                            </div>
                                                        )}
                                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <span className="font-semibold text-white truncate">{car.make} {car.model}</span>
                                                                {isSelected && <CheckCircle2 className="size-5 shrink-0 text-white" />}
                                                            </div>
                                                            <div className="text-xs text-white/80">{car.year}</div>
                                                        </div>
                                                        {car.status === 'in_stock' && (
                                                            <span className="absolute left-2 top-2 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">In Stock</span>
                                                        )}
                                                        {car.status === 'coming_soon' && (
                                                            <span className="absolute left-2 top-2 rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">Coming Soon</span>
                                                        )}
                                                    </div>
                                                    <div className="space-y-1.5 p-3">
                                                        {car.price && <div className="font-bold text-foreground">{formatCurrency(car.price)}</div>}
                                                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                                                            {car.mileage != null && <span>{car.mileage.toLocaleString()} mi</span>}
                                                            {car.fuel_type && <span className="capitalize">{car.fuel_type.replace('_', ' ')}</span>}
                                                            {car.transmission && <span className="capitalize">{car.transmission}</span>}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="rounded-xl border-2 border-dashed border-border p-10 text-center">
                                        <Search className="mx-auto mb-3 size-8 text-muted-foreground/40" />
                                        <p className="font-medium text-foreground">No vehicles match "{searchQuery}"</p>
                                        <p className="mt-1 text-sm text-muted-foreground">Try a different search term or browse by make/model below</p>
                                    </div>
                                )}

                                <div className="pt-2">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="h-px flex-1 bg-border" />
                                        <span className="text-xs font-medium text-muted-foreground">or choose by make &amp; model</span>
                                        <div className="h-px flex-1 bg-border" />
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div>
                                            <Label className="text-xs font-medium">Make</Label>
                                            <Select value={data.make_id} onValueChange={(v) => { setData('make_id', v); setData('model_id', ''); setData('listing_id', ''); }}>
                                                <SelectTrigger className="mt-1 rounded-xl border-border/60"><SelectValue placeholder="Select make" /></SelectTrigger>
                                                <SelectContent>{makes.map((m) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent>
                                            </Select>
                                            <InputError message={errors.make_id} />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium">Model</Label>
                                            <Select value={data.model_id} onValueChange={(v) => setData('model_id', v)} disabled={!data.make_id}>
                                                <SelectTrigger className="mt-1 rounded-xl border-border/60"><SelectValue placeholder={data.make_id ? 'Select model' : 'Select make first'} /></SelectTrigger>
                                                <SelectContent>{selectedMake?.models.map((mo) => <SelectItem key={mo.id} value={mo.id}>{mo.name}</SelectItem>)}</SelectContent>
                                            </Select>
                                            <InputError message={errors.model_id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Card className="shadow-sm">
                                <CardContent className="py-10 text-center">
                                    <ShoppingCart className="mx-auto mb-3 size-10 text-muted-foreground/30" />
                                    <p className="font-medium">No vehicles available</p>
                                    <p className="mt-1 text-sm text-muted-foreground">Search by make and model to get started</p>
                                    <div className="mt-6 grid gap-3 sm:grid-cols-2 max-w-md mx-auto">
                                        <div>
                                            <Label className="text-xs font-medium">Make</Label>
                                            <Select value={data.make_id} onValueChange={(v) => { setData('make_id', v); setData('model_id', ''); setData('listing_id', ''); }}>
                                                <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Select make" /></SelectTrigger>
                                                <SelectContent>{makes.map((m) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}</SelectContent>
                                            </Select>
                                            <InputError message={errors.make_id} />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium">Model</Label>
                                            <Select value={data.model_id} onValueChange={(v) => setData('model_id', v)} disabled={!data.make_id}>
                                                <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder={data.make_id ? 'Select model' : 'Select make first'} /></SelectTrigger>
                                                <SelectContent>{selectedMake?.models.map((mo) => <SelectItem key={mo.id} value={mo.id}>{mo.name}</SelectItem>)}</SelectContent>
                                            </Select>
                                            <InputError message={errors.model_id} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {selectedListing && (
                            <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <CheckCircle2 className="size-5 shrink-0 text-primary" />
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium truncate">{selectedListing.make} {selectedListing.model} <span className="text-muted-foreground font-normal">({selectedListing.year})</span></p>
                                            {selectedListing.price && <p className="text-xs text-muted-foreground">{formatCurrency(selectedListing.price)}</p>}
                                        </div>
                                    </div>
                                    <button type="button" onClick={() => { setData('listing_id', ''); }} className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 shrink-0">Change</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">2</div>
                            <div>
                                <h2 className="font-semibold">Your Details</h2>
                                <p className="text-xs text-muted-foreground">We'll use this to confirm your reservation</p>
                            </div>
                        </div>
                        <Card className="shadow-sm">
                            <CardContent className="grid grid-cols-2 gap-x-5 gap-y-5 p-6">
                                <div>
                                    <Label className="text-xs font-medium">Full Name <span className="text-destructive">*</span></Label>
                                    <Input className="mt-1.5 h-11 rounded-xl border-border/60" value={data.customer_name} onChange={(e) => setData('customer_name', e.target.value)} />
                                    <InputError message={errors.customer_name} />
                                </div>
                                <div>
                                    <Label className="text-xs font-medium">Email <span className="text-destructive">*</span></Label>
                                    <Input className="mt-1.5 h-11 rounded-xl border-border/60" type="email" value={data.customer_email} onChange={(e) => setData('customer_email', e.target.value)} />
                                    <InputError message={errors.customer_email} />
                                </div>
                                <div>
                                    <Label className="text-xs font-medium">Phone</Label>
                                    <Input className="mt-1.5 h-11 rounded-xl border-border/60" value={data.customer_phone} onChange={(e) => setData('customer_phone', e.target.value)} placeholder="(555) 123-4567" />
                                    <InputError message={errors.customer_phone} />
                                </div>
                                <div>
                                    <Label className="text-xs font-medium">Quantity <span className="text-destructive">*</span></Label>
                                    <Input className="mt-1.5 h-11 rounded-xl border-border/60" type="number" min={1} value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} />
                                    <InputError message={errors.quantity} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">3</div>
                            <div>
                                <h2 className="font-semibold">Preferences <span className="text-xs font-normal text-muted-foreground">(optional)</span></h2>
                                <p className="text-xs text-muted-foreground">Let us know your ideal specifications</p>
                            </div>
                        </div>
                        <Collapsible open={specsOpen} onOpenChange={setSpecsOpen}>
                            <Card className="shadow-sm">
                                <CollapsibleTrigger asChild>
                                    <CardHeader className="cursor-pointer select-none hover:bg-muted/20 transition-colors">
                                        <CardTitle className="flex items-center justify-between text-sm font-medium">
                                            <span className="flex items-center gap-2 text-muted-foreground">
                                                <Gauge className="size-4" />
                                                Configure preferences
                                            </span>
                                            <ChevronDown className={clsx('size-4 text-muted-foreground transition-transform duration-200', specsOpen && 'rotate-180')} />
                                        </CardTitle>
                                    </CardHeader>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <CardContent className="grid grid-cols-2 gap-x-5 gap-y-5 border-t p-6">
                                        <div className="col-span-2 flex items-center gap-2">
                                            <div className="h-px flex-1 bg-border/50" />
                                            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><Palette className="size-3" /> Colors</span>
                                            <div className="h-px flex-1 bg-border/50" />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium">Exterior</Label>
                                            <Input className="mt-1.5 h-10 rounded-xl border-border/60" value={data.color} onChange={(e) => setData('color', e.target.value)} placeholder="e.g. Black, White" />
                                            <InputError message={errors.color} />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium">Interior</Label>
                                            <Input className="mt-1.5 h-10 rounded-xl border-border/60" value={data.interior_color} onChange={(e) => setData('interior_color', e.target.value)} placeholder="e.g. Black Leather" />
                                            <InputError message={errors.interior_color} />
                                        </div>

                                        <div className="col-span-2 flex items-center gap-2">
                                            <div className="h-px flex-1 bg-border/50" />
                                            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><Wrench className="size-3" /> Specs</span>
                                            <div className="h-px flex-1 bg-border/50" />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium">Trim Level</Label>
                                            <Input className="mt-1.5 h-10 rounded-xl border-border/60" value={data.trim_level} onChange={(e) => setData('trim_level', e.target.value)} placeholder="e.g. LE, XLE" />
                                            <InputError message={errors.trim_level} />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium">Engine</Label>
                                            <Input className="mt-1.5 h-10 rounded-xl border-border/60" value={data.engine_preference} onChange={(e) => setData('engine_preference', e.target.value)} placeholder="e.g. V6, Hybrid" />
                                            <InputError message={errors.engine_preference} />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium">Transmission</Label>
                                            <Select value={data.transmission_preference} onValueChange={(v) => setData('transmission_preference', v)}>
                                                <SelectTrigger className="mt-1.5 h-10 rounded-xl border-border/60"><SelectValue placeholder="Any" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="any">Any</SelectItem>
                                                    {transmissionOptions.map((t) => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.transmission_preference} />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium">Drivetrain</Label>
                                            <Select value={data.drivetrain_preference} onValueChange={(v) => setData('drivetrain_preference', v)}>
                                                <SelectTrigger className="mt-1.5 h-10 rounded-xl border-border/60"><SelectValue placeholder="Any" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="any">Any</SelectItem>
                                                    {drivetrainOptions.map((d) => <SelectItem key={d} value={d}>{d.toUpperCase()}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.drivetrain_preference} />
                                        </div>
                                        <div className="col-span-2">
                                            <Label className="text-xs font-medium">Fuel Type</Label>
                                            <Select value={data.fuel_type} onValueChange={(v) => setData('fuel_type', v)}>
                                                <SelectTrigger className="mt-1.5 h-10 rounded-xl border-border/60"><SelectValue placeholder="Any" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="any">Any</SelectItem>
                                                    {fuelOptions.map((f) => <SelectItem key={f} value={f}>{f.replace(/_/g, ' ')}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.fuel_type} />
                                        </div>

                                        <div className="col-span-2 flex items-center gap-2">
                                            <div className="h-px flex-1 bg-border/50" />
                                            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><CalendarRange className="size-3" /> Year &amp; Mileage</span>
                                            <div className="h-px flex-1 bg-border/50" />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium">Year From</Label>
                                            <Input className="mt-1.5 h-10 rounded-xl border-border/60" type="number" min="1900" max="2100" value={data.year_min} onChange={(e) => setData('year_min', e.target.value)} placeholder="2024" />
                                            <InputError message={errors.year_min} />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium">Year To</Label>
                                            <Input className="mt-1.5 h-10 rounded-xl border-border/60" type="number" min="1900" max="2100" value={data.year_max} onChange={(e) => setData('year_max', e.target.value)} placeholder="2026" />
                                            <InputError message={errors.year_max} />
                                        </div>
                                        <div className="col-span-2">
                                            <Label className="text-xs font-medium">Max Mileage</Label>
                                            <Input className="mt-1.5 h-10 rounded-xl border-border/60" type="number" min="0" value={data.mileage_max} onChange={(e) => setData('mileage_max', e.target.value)} placeholder="30,000" />
                                            <InputError message={errors.mileage_max} />
                                        </div>

                                        <div className="col-span-2 flex items-center gap-2">
                                            <div className="h-px flex-1 bg-border/50" />
                                            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><BadgeHelp className="size-3" /> Budget</span>
                                            <div className="h-px flex-1 bg-border/50" />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium">Min</Label>
                                            <Input className="mt-1.5 h-10 rounded-xl border-border/60" type="number" min="0" step="0.01" placeholder="$0" value={data.budget_min} onChange={(e) => setData('budget_min', e.target.value)} />
                                            <InputError message={errors.budget_min} />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium">Max</Label>
                                            <Input className="mt-1.5 h-10 rounded-xl border-border/60" type="number" min="0" step="0.01" placeholder="$0" value={data.budget_max} onChange={(e) => setData('budget_max', e.target.value)} />
                                            <InputError message={errors.budget_max} />
                                        </div>

                                        <div className="col-span-2 flex items-center gap-2">
                                            <div className="h-px flex-1 bg-border/50" />
                                            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><BadgeHelp className="size-3" /> Other</span>
                                            <div className="h-px flex-1 bg-border/50" />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium">How did you hear?</Label>
                                            <Select value={data.source} onValueChange={(v) => setData('source', v)}>
                                                <SelectTrigger className="mt-1.5 h-10 rounded-xl border-border/60"><SelectValue placeholder="Select" /></SelectTrigger>
                                                <SelectContent>{sourceOptions.map((s) => <SelectItem key={s} value={s}>{s.replace(/_/g, ' ')}</SelectItem>)}</SelectContent>
                                            </Select>
                                            <InputError message={errors.source} />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium">Preferred Contact</Label>
                                            <Select value={data.preferred_contact} onValueChange={(v) => setData('preferred_contact', v)}>
                                                <SelectTrigger className="mt-1.5 h-10 rounded-xl border-border/60"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="email">Email</SelectItem>
                                                    <SelectItem value="phone">Phone</SelectItem>
                                                    <SelectItem value="text">Text</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.preferred_contact} />
                                        </div>
                                        <div className="col-span-2">
                                            <Label className="text-xs font-medium">Notes</Label>
                                            <Textarea className="mt-1.5 rounded-xl border-border/60" value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows={3} placeholder="Anything else we should know..." />
                                            <InputError message={errors.notes} />
                                        </div>
                                    </CardContent>
                                </CollapsibleContent>
                            </Card>
                        </Collapsible>
                    </div>

                    <div className="flex items-center justify-between gap-4 rounded-2xl border bg-card p-5 shadow-sm">
                        <div className="hidden sm:block">
                            <p className="text-sm font-medium">Ready to submit?</p>
                            <p className="text-xs text-muted-foreground">We'll confirm your reservation promptly</p>
                        </div>
                        <div className="flex w-full sm:w-auto gap-3">
                            <Button type="submit" size="lg" disabled={processing} className="min-w-[180px] rounded-xl h-12">
                                {processing ? (
                                    <span className="flex items-center gap-2"><Timer className="size-4 animate-spin" /> Submitting...</span>
                                ) : (
                                    'Place Pre-Order'
                                )}
                            </Button>
                            <Button variant="outline" size="lg" asChild className="rounded-xl h-12">
                                <Link href={buyer.preOrders.index()}>Cancel</Link>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

function CarOutline({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
            <circle cx="6.5" cy="16.5" r="2.5" />
            <circle cx="16.5" cy="16.5" r="2.5" />
        </svg>
    );
}

BuyerPreOrderCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: buyer.dashboard() },
        { title: 'Pre-Orders', href: buyer.preOrders.index() },
        { title: 'New', href: '' },
    ],
};
