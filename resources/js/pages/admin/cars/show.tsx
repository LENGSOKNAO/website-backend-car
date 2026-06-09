import { Head, Link } from '@inertiajs/react';
import {
    Car,
    Fuel,
    Gauge,
    Timer,
    Palette,
    Users,
    MapPin,
    Hash,
    ChevronLeft,
    ChevronRight,
    Pencil,
    ArrowLeft,
    Calendar,
    DollarSign,
    BarChart3,
    Eye,
    FileText,
    ShoppingCart,
    ClipboardList,
    Store,
    Phone,
    Mail,
    ShieldCheck,
    UserCheck,
    Award,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import admin from '@/routes/admin';

interface ListingImage {
    id: string;
    image_url: string;
    is_primary: boolean;
    sort_order: number;
}

interface OrderItem {
    id: string;
    price: string;
    condition: string | null;
}

interface Order {
    id: string;
    order_number: string;
    status: string;
    total: string;
    placed_at: string | null;
    buyer: { id: string; full_name: string };
    items: OrderItem[];
}

interface PreOrderPayment {
    id: string;
    amount: string;
    status: string;
}

interface PreOrder {
    id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string | null;
    quantity: number;
    status: string;
    total_price: string | null;
    created_at: string;
    customer: { id: string; full_name: string } | null;
    payments: PreOrderPayment[];
}

interface CarDetail {
    id: string;
    year: number;
    price: string;
    original_price: string | null;
    mileage: string | null;
    fuel_type: string | null;
    transmission: string | null;
    engine_size: string | null;
    color: string | null;
    interior_color: string | null;
    condition: string | null;
    number_of_owners: number | null;
    vin: string | null;
    license_plate: string | null;
    description: string | null;
    location: string | null;
    status: string;
    views_count: number | null;
    created_at: string;
    order_date: string | null;
    expected_arrival: string | null;
    actual_arrival: string | null;
    make: { id: string; name: string };
    model: { id: string; name: string };
    seller: {
        id: string;
        name: string;
        full_name: string;
        email: string;
        phone: string | null;
        avatar: string | null;
        is_verified: boolean;
        is_dealer: boolean;
        dealer_name: string | null;
        location: string | null;
        join_date: string | null;
        seller_verification: { verification_status: string } | null;
    };
    category: { id: string; name: string } | null;
    images: ListingImage[];
    orders: Order[];
    pre_orders: PreOrder[];
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    pending: 'secondary',
    confirmed: 'default',
    processing: 'default',
    completed: 'default',
    cancelled: 'destructive',
    refunded: 'outline',
};

export default function AdminCarShow({ car }: { car: CarDetail }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const images = car.images;
    const currentImage = images[selectedIndex];

    const nextImage = () => setSelectedIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);

    const formatCurrency = (amount: string | number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(Number(amount));

    const statusBadge = (status: string) => {
        const map: Record<string, { label: string; className: string }> = {
            coming_soon: { label: 'Coming Soon', className: 'bg-amber-100 text-amber-700' },
            in_stock: { label: 'In Stock', className: 'bg-green-100 text-green-700' },
            out_of_stock: { label: 'Out of Stock', className: 'bg-red-100 text-red-700' },
        };
        const s = map[status] ?? { label: status, className: 'bg-gray-100 text-gray-700' };

        return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.className}`}>{s.label}</span>;
    };

    return (
        <>
            <Head title={`${car.make.name} ${car.model.name} (${car.year})`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={admin.cars.index()}>
                                <ArrowLeft className="size-5" />
                            </Link>
                        </Button>
                        <Car className="size-6 text-muted-foreground" />
                        <div>
                            <h1 className="text-2xl font-bold">
                                {car.make.name} {car.model.name}
                                <span className="text-muted-foreground font-normal ml-2">({car.year})</span>
                            </h1>
                            <p className="text-sm text-muted-foreground">Listed by {car.seller.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {statusBadge(car.status)}
                        <Button variant="outline" size="sm" asChild>
                            <Link href={admin.cars.edit(car.id)}>
                                <Pencil className="size-4 mr-1" />
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 space-y-4">
                        {images.length > 0 && currentImage ? (
                            <Card className="overflow-hidden">
                                <div className="relative bg-muted">
                                    <div className="aspect-[16/9] relative">
                                        <img
                                            src={currentImage.image_url}
                                            alt={`${car.make.name} ${car.model.name}`}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    {images.length > 1 && (
                                        <>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/80 rounded-full"
                                                onClick={prevImage}
                                            >
                                                <ChevronLeft className="size-5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/80 rounded-full"
                                                onClick={nextImage}
                                            >
                                                <ChevronRight className="size-5" />
                                            </Button>
                                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs">
                                                {selectedIndex + 1} / {images.length}
                                            </div>
                                        </>
                                    )}
                                </div>
                                {images.length > 1 && (
                                    <div className="flex gap-2 p-3 overflow-x-auto">
                                        {images.map((img, i) => (
                                            <button
                                                key={img.id}
                                                onClick={() => setSelectedIndex(i)}
                                                className={`shrink-0 size-16 rounded-md overflow-hidden border-2 transition-all ${
                                                    i === selectedIndex
                                                        ? 'border-primary ring-2 ring-primary/20'
                                                        : 'border-transparent opacity-60 hover:opacity-100'
                                                }`}
                                            >
                                                <img
                                                    src={img.image_url}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        ) : (
                            <Card>
                                <CardContent className="p-12 text-center text-muted-foreground">
                                    <Car className="size-12 mx-auto mb-2 opacity-30" />
                                    <p>No images available</p>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="size-5 text-muted-foreground" />
                                    Description
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {car.description || 'No description provided.'}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Store className="size-5 text-muted-foreground" />
                                    Owner
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                                        {car.seller.avatar ? (
                                            <img src={car.seller.avatar} alt="" className="size-full object-cover" />
                                        ) : (
                                            <UserCheck className="size-5 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium">{car.seller.full_name}</p>
                                        <div className="flex gap-1 mt-0.5">
                                            {car.seller.is_verified && (
                                                <span className="inline-flex items-center gap-0.5 rounded-full bg-blue-100 text-blue-700 px-1.5 py-0.5 text-[10px] font-medium">
                                                    <ShieldCheck className="size-3" /> Verified
                                                </span>
                                            )}
                                            {car.seller.is_dealer && (
                                                <span className="inline-flex items-center gap-0.5 rounded-full bg-purple-100 text-purple-700 px-1.5 py-0.5 text-[10px] font-medium">
                                                    <Award className="size-3" /> Dealer
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-1.5 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="size-3.5 shrink-0" />
                                        <span className="truncate">{car.seller.email}</span>
                                    </div>
                                    {car.seller.phone && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Phone className="size-3.5 shrink-0" />
                                            <span>{car.seller.phone}</span>
                                        </div>
                                    )}
                                    {car.seller.is_dealer && car.seller.dealer_name && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Store className="size-3.5 shrink-0" />
                                            <span>{car.seller.dealer_name}</span>
                                        </div>
                                    )}
                                    {car.seller.location && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <MapPin className="size-3.5 shrink-0" />
                                            <span>{car.seller.location}</span>
                                        </div>
                                    )}
                                    {car.seller.join_date && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="size-3.5 shrink-0" />
                                            <span>Member since {new Date(car.seller.join_date).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                    {car.seller.seller_verification && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <ShieldCheck className="size-3.5 shrink-0" />
                                            <span>Verification: {car.seller.seller_verification.verification_status}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="size-5 text-muted-foreground" />
                                    Pricing
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-baseline justify-between">
                                    <span className="text-sm text-muted-foreground">Price</span>
                                    <span className="text-2xl font-bold">{formatCurrency(car.price)}</span>
                                </div>
                                {car.original_price && Number(car.original_price) > Number(car.price) && (
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-sm text-muted-foreground">Original Price</span>
                                        <span className="text-sm text-muted-foreground line-through">
                                            {formatCurrency(car.original_price)}
                                        </span>
                                    </div>
                                )}
                                <Separator />
                                <div className="flex items-baseline justify-between">
                                    <span className="text-sm text-muted-foreground">Status</span>
                                    {statusBadge(car.status)}
                                </div>
                                {car.views_count !== null && (
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-sm text-muted-foreground">Views</span>
                                        <span className="text-sm font-medium">{car.views_count}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="size-5 text-muted-foreground" />
                                    Specifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                    <SpecItem icon={Calendar} label="Year" value={String(car.year)} />
                                    <SpecItem icon={Timer} label="Mileage" value={car.mileage ? `${Number(car.mileage).toLocaleString()} mi` : 'N/A'} />
                                    <SpecItem icon={Fuel} label="Fuel Type" value={car.fuel_type || 'N/A'} />
                                    <SpecItem icon={Gauge} label="Transmission" value={car.transmission || 'N/A'} />
                                    <SpecItem icon={Car} label="Engine" value={car.engine_size || 'N/A'} />
                                    <SpecItem icon={Palette} label="Exterior" value={car.color || 'N/A'} />
                                    <SpecItem icon={Palette} label="Interior" value={car.interior_color || 'N/A'} />
                                    <SpecItem icon={Car} label="Condition" value={car.condition ? car.condition.charAt(0).toUpperCase() + car.condition.slice(1) : 'N/A'} />
                                    <SpecItem icon={Users} label="Owners" value={car.number_of_owners !== null ? String(car.number_of_owners) : 'N/A'} />
                                    <SpecItem icon={Hash} label="VIN" value={car.vin || 'N/A'} className="col-span-2" />
                                    <SpecItem icon={MapPin} label="Location" value={car.location || 'N/A'} className="col-span-2" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Eye className="size-5 text-muted-foreground" />
                                    History
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Listed</span>
                                    <span>{new Date(car.created_at).toLocaleDateString()}</span>
                                </div>
                                {car.category && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Category</span>
                                        <span>{car.category.name}</span>
                                    </div>
                                )}
                                {car.order_date && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Order Date</span>
                                        <span>{new Date(car.order_date).toLocaleDateString()}</span>
                                    </div>
                                )}
                                {car.expected_arrival && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Expected Arrival</span>
                                        <span>{new Date(car.expected_arrival).toLocaleDateString()}</span>
                                    </div>
                                )}
                                {car.actual_arrival && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Actual Arrival</span>
                                        <span>{new Date(car.actual_arrival).toLocaleDateString()}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {car.orders.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShoppingCart className="size-5 text-muted-foreground" />
                                Orders ({car.orders.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-muted-foreground text-xs uppercase">
                                            <th className="text-left px-4 py-3 font-medium">Order #</th>
                                            <th className="text-left px-4 py-3 font-medium">Buyer</th>
                                            <th className="text-left px-4 py-3 font-medium">Status</th>
                                            <th className="text-right px-4 py-3 font-medium">Total</th>
                                            <th className="text-left px-4 py-3 font-medium">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {car.orders.map((order) => (
                                            <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50">
                                                <td className="px-4 py-3 font-mono text-xs">{order.order_number}</td>
                                                <td className="px-4 py-3">{order.buyer.full_name}</td>
                                                <td className="px-4 py-3">
                                                    <Badge variant={statusVariant[order.status] ?? 'secondary'}>
                                                        {order.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-right font-medium">{formatCurrency(order.total)}</td>
                                                <td className="px-4 py-3 text-muted-foreground">
                                                    {order.placed_at ? new Date(order.placed_at).toLocaleDateString() : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {car.pre_orders.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ClipboardList className="size-5 text-muted-foreground" />
                                Pre-Orders ({car.pre_orders.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-muted-foreground text-xs uppercase">
                                            <th className="text-left px-4 py-3 font-medium">Customer</th>
                                            <th className="text-left px-4 py-3 font-medium">Contact</th>
                                            <th className="text-left px-4 py-3 font-medium">Status</th>
                                            <th className="text-right px-4 py-3 font-medium">Qty</th>
                                            <th className="text-right px-4 py-3 font-medium">Total Paid</th>
                                            <th className="text-left px-4 py-3 font-medium">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {car.pre_orders.map((po) => {
                                            const totalPaid = po.payments
                                                .filter((p) => p.status === 'completed')
                                                .reduce((sum, p) => sum + Number(p.amount), 0);

                                            return (
                                                <tr key={po.id} className="border-b last:border-0 hover:bg-muted/50">
                                                    <td className="px-4 py-3 font-medium">{po.customer_name}</td>
                                                    <td className="px-4 py-3 text-muted-foreground">
                                                        {po.customer_email}
                                                        {po.customer_phone && <> &middot; {po.customer_phone}</>}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Badge variant={statusVariant[po.status] ?? 'secondary'}>
                                                            {po.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3 text-right">{po.quantity}</td>
                                                    <td className="px-4 py-3 text-right font-medium">{formatCurrency(totalPaid)}</td>
                                                    <td className="px-4 py-3 text-muted-foreground">
                                                        {new Date(po.created_at).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

function SpecItem({ icon: Icon, label, value, className = '' }: { icon: any; label: string; value: string; className?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Icon className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium truncate">{value}</p>
            </div>
        </div>
    );
}

AdminCarShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Cars', href: admin.cars.index() },
        { title: 'Detail', href: '' },
    ],
};
