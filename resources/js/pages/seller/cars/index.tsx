import { BlurImage } from '@/components/blur-image';
import { Head, Link, router } from '@inertiajs/react';
import {
    Car as CarIcon,
    Search,
    ShoppingCart,
    ClipboardList,
    Plus,
} from 'lucide-react';
import { TableActions } from '@/components/table-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { dashboard } from '@/routes';
import seller from '@/routes/seller';

interface Car {
    id: string;
    make: { id: string; name: string };
    model: { id: string; name: string };
    year: number;
    price: string;
    mileage: string | null;
    status: string;
    image_url: string | null;
    order_date: string | null;
    expected_arrival: string | null;
    total: number;
    seller: { id: string; name: string };
    orders_count: number;
    pre_orders_count: number;
}

interface PaginatedCars {
    data: Car[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
    prev_page_url: string | null;
    next_page_url: string | null;
}

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    coming_soon: { label: 'Coming Soon', variant: 'secondary' },
    in_stock: { label: 'In Stock', variant: 'default' },
    out_of_stock: { label: 'Out of Stock', variant: 'destructive' },
};

export default function SellerCarIndex({ cars, filters }: { cars: PaginatedCars; filters: { search?: string; status?: string } }) {
    const handleDelete = (car: Car) => {
        if (confirm(`Delete "${car.make.name} ${car.model.name} ${car.year}"?`)) {
            router.delete(seller.cars.destroy(car.id).url);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get(seller.cars.index().url, { ...filters, search: e.target.value }, { preserveState: true, replace: true });
    };

    const handleStatusFilter = (value: string) => {
        router.get(seller.cars.index().url, { ...filters, status: value }, { preserveState: true, replace: true });
    };

    const formatCurrency = (amount: number | string) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(Number(amount));

    const formatMileage = (mileage: string | null) => {
        if (!mileage) {
return 'N/A';
}

        return `${Number(mileage).toLocaleString()} mi`;
    };

    return (
        <>
            <Head title="My Cars" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">My Cars</h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">Manage your car listings</p>
                    </div>
                    <Button asChild>
                        <Link href={seller.cars.create()}>
                            <Plus className="size-4" /> Add Car
                        </Link>
                    </Button>
                </div>

                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>My Listings</CardTitle>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Select value={filters.status ?? ''} onValueChange={handleStatusFilter}>
                                    <SelectTrigger className="h-9 w-[150px]">
                                        <SelectValue placeholder="All statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value=" ">All Statuses</SelectItem>
                                        <SelectItem value="in_stock">In Stock</SelectItem>
                                        <SelectItem value="coming_soon">Coming Soon</SelectItem>
                                        <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="relative max-w-md flex-1">
                                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by make, model, or year..."
                                        defaultValue={filters.search ?? ''}
                                        onChange={handleSearch}
                                        className="h-9 pl-9"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">Image</TableHead>
                                    <TableHead>Vehicle</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Mileage</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Order / Arrival</TableHead>
                                    <TableHead>Orders</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cars.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={10} className="py-8 text-center text-muted-foreground">
                                            No cars found. Try adjusting your search or filter criteria.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    cars.data.map((car) => {
                                        const cfg = statusConfig[car.status] ?? { label: car.status, variant: 'outline' as const };

                                        return (
                                            <TableRow key={car.id}>
                                                <TableCell>
                                                    {car.image_url ? (
                                                        <Link href={seller.cars.show(car.id)}>
                                                            <BlurImage
                                                                src={car.image_url}
                                                                alt={`${car.make.name} ${car.model.name}`}
                                                                containerClassName="h-12 w-16 rounded"
                                                                className="rounded"
                                                            />
                                                        </Link>
                                                    ) : (
                                                        <div className="flex h-12 w-16 items-center justify-center rounded bg-muted">
                                                            <CarIcon className="size-5 text-muted-foreground/40" />
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    <Link href={seller.cars.show(car.id)} className="text-primary hover:underline">
                                                        {car.make.name} {car.model.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{car.year}</TableCell>
                                                <TableCell className="font-semibold">{formatCurrency(car.price)}</TableCell>
                                                <TableCell>{formatMileage(car.mileage)}</TableCell>
                                                <TableCell>
                                                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
                                                </TableCell>
                                                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                                                    <div className="flex flex-col gap-0.5">
                                                        {car.order_date ? (
                                                            <span>Order: {new Date(car.order_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                        ) : (
                                                            <span className="text-muted-foreground/50">Order: -</span>
                                                        )}
                                                        {car.expected_arrival ? (
                                                            <span className={new Date(car.expected_arrival) < new Date() && car.status !== 'arrived' ? 'font-medium text-red-600' : ''}>
                                                                Arrival: {new Date(car.expected_arrival).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                            </span>
                                                        ) : (
                                                            <span className="text-muted-foreground/50">Arrival: -</span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {car.orders_count > 0 && (
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-[10px] font-medium">
                                                                <ShoppingCart className="size-3" />
                                                                {car.orders_count}
                                                            </span>
                                                        )}
                                                        {car.pre_orders_count > 0 && (
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-[10px] font-medium">
                                                                <ClipboardList className="size-3" />
                                                                {car.pre_orders_count}
                                                            </span>
                                                        )}
                                                        {car.orders_count === 0 && car.pre_orders_count === 0 && (
                                                            <span className="text-xs text-muted-foreground">-</span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1.5">
                                                        {car.status !== 'coming_soon' && (
                                                            <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                                                {car.total}
                                                            </span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <TableActions
                                                        actions={[
                                                            { label: 'View', href: seller.cars.show(car.id) },
                                                            { label: 'Edit', href: seller.cars.edit(car.id) },
                                                            { label: 'Delete', onClick: () => handleDelete(car), destructive: true },
                                                        ]}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                        {cars.last_page > 1 && (
                            <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t pt-4 sm:flex-row">
                                <p className="order-2 text-sm text-muted-foreground sm:order-1">
                                    Showing <span className="font-medium">{cars.from}</span> to <span className="font-medium">{cars.to}</span> of <span className="font-medium">{cars.total}</span> cars
                                </p>
                                <div className="order-1 flex items-center gap-1 sm:order-2">
                                    {cars.links
                                        .filter((link) => {
                                            const label = link.label.toLowerCase();

                                            return !label.includes('previous') && !label.includes('next');
                                        })
                                        .map((link, i) => (
                                            <Button key={i} variant={link.active ? 'default' : 'outline'} size="sm" disabled={!link.url} asChild={!!link.url}>
                                                {link.url ? (
                                                    <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label.replace(/&laquo;|&raquo;/g, '') }} />
                                                ) : (
                                                    <span dangerouslySetInnerHTML={{ __html: link.label.replace(/&laquo;|&raquo;/g, '') }} />
                                                )}
                                            </Button>
                                        ))}
                                    <Button variant="outline" size="sm" disabled={!cars.prev_page_url} asChild={!!cars.prev_page_url}>
                                        {cars.prev_page_url ? <Link href={cars.prev_page_url}>Previous</Link> : <span>Previous</span>}
                                    </Button>
                                    <Button variant="outline" size="sm" disabled={!cars.next_page_url} asChild={!!cars.next_page_url}>
                                        {cars.next_page_url ? <Link href={cars.next_page_url}>Next</Link> : <span>Next</span>}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

SellerCarIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'My Cars', href: seller.cars.index() },
    ],
};
