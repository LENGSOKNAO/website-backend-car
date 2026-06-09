import { BlurImage } from '@/components/blur-image';
import { Head, Link, router } from '@inertiajs/react';
import {
    Car,
    CheckCircle,
    XCircle,
    ClockArrowUp,
    Search,
    AlertCircle,
    Clock,
    ShoppingCart,
    ClipboardList,
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
import admin from '@/routes/admin';

interface CarListing {
    id: string;
    make: { id: string; name: string };
    model: { id: string; name: string };
    year: number;
    price: string;
    mileage: string | null;
    fuel_type: string | null;
    transmission: string | null;
    color: string | null;
    status: string;
    image_url: string | null;
    seller: { id: string; name: string };
    created_at: string;
    order_date: string | null;
    expected_arrival: string | null;
    actual_arrival: string | null;
    model_total: number;
    model_in_stock: number;
    model_coming_soon: number;
    orders_count: number;
    pre_orders_count: number;
}

interface ModelStat {
    make_name: string;
    model_name: string;
    total: number;
    coming_soon: number;
    in_stock: number;
    out_of_stock: number;
}

interface PaginatedCars {
    data: CarListing[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
    prev_page_url: string | null;
    next_page_url: string | null;
}

const statusConfig: Record<
    string,
    {
        label: string;
        variant: 'default' | 'secondary' | 'destructive' | 'outline';
    }
> = {
    coming_soon: {
        label: 'Coming Soon',
        variant: 'secondary',
    },
    in_stock: {
        label: 'In Stock',
        variant: 'default',
    },
    out_of_stock: {
        label: 'Out of Stock',
        variant: 'destructive',
    },
};

export default function AdminCarIndex({
    cars,
    filters,
    modelStats,
}: {
    cars: PaginatedCars;
    filters: { search?: string; status?: string };
    modelStats: ModelStat[];
}) {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get(
            admin.cars.index().url,
            { ...filters, search: e.target.value },
            { preserveState: true, replace: true },
        );
    };

    const handleStatusFilter = (value: string) => {
        router.get(
            admin.cars.index().url,
            { ...filters, status: value },
            { preserveState: true, replace: true },
        );
    };

    const handleDelete = (car: CarListing) => {
        if (
            confirm(
                `Delete "${car.make.name} ${car.model.name} ${car.year}"? This cannot be undone.`,
            )
        ) {
            router.delete(admin.cars.destroy(car.id).url);
        }
    };

    const formatCurrency = (amount: number | string) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(Number(amount));

    const formatMileage = (mileage: string | null) => {
        if (!mileage) {
return 'N/A';
}

        return `${Number(mileage).toLocaleString()} mi`;
    };

    return (
        <>
            <Head title="Manage Cars" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Manage Cars
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Browse and manage your car inventory
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {modelStats.map((model) => {
                        let statusLabel = '';
                        let statusColor = '';
                        let statusIcon: React.ReactNode = null;

                        if (model.in_stock === 0 && model.out_of_stock > 0) {
                            statusLabel = 'Out of Stock';
                            statusColor = 'bg-red-100 text-red-700';
                            statusIcon = <XCircle className="size-3" />;
                        } else if (model.in_stock > 0 && model.in_stock <= 3) {
                            statusLabel = 'Limited Stock';
                            statusColor = 'bg-amber-100 text-amber-700';
                            statusIcon = <AlertCircle className="size-3" />;
                        } else if (model.in_stock > 3) {
                            statusLabel = 'In Stock';
                            statusColor = 'bg-emerald-100 text-emerald-700';
                            statusIcon = <CheckCircle className="size-3" />;
                        } else if (model.coming_soon > 0) {
                            statusLabel = 'Coming Soon';
                            statusColor = 'bg-purple-100 text-purple-700';
                            statusIcon = <ClockArrowUp className="size-3" />;
                        } else {
                            statusLabel = 'No Stock';
                            statusColor = 'bg-gray-100 text-gray-700';
                            statusIcon = <XCircle className="size-3" />;
                        }

                        return (
                            <Card
                                key={`${model.make_name}-${model.model_name}`}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                        <p className="truncate text-sm font-medium">
                                            {model.make_name} {model.model_name}
                                        </p>
                                        <span
                                            className={`ml-2 inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColor}`}
                                        >
                                            {statusIcon}
                                            {statusLabel}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-2xl font-bold">
                                        {model.total}
                                    </p>
                                    <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                                        {model.in_stock > 0 && (
                                            <span className="flex items-center gap-1 text-emerald-600">
                                                <CheckCircle className="size-3" />
                                                {model.in_stock} in stock
                                            </span>
                                        )}
                                        {model.coming_soon > 0 && (
                                            <span className="flex items-center gap-1 text-amber-600">
                                                <ClockArrowUp className="size-3" />
                                                {model.coming_soon} coming
                                            </span>
                                        )}
                                        {model.out_of_stock > 0 && (
                                            <span className="flex items-center gap-1 text-red-600">
                                                <XCircle className="size-3" />
                                                {model.out_of_stock} out
                                            </span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>All Cars</CardTitle>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Select
                                    value={filters.status ?? ''}
                                    onValueChange={handleStatusFilter}
                                >
                                    <SelectTrigger className="h-9 w-[150px]">
                                        <SelectValue placeholder="All statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value=" ">
                                            All Statuses
                                        </SelectItem>
                                        <SelectItem value="in_stock">
                                            In Stock
                                        </SelectItem>
                                        <SelectItem value="coming_soon">
                                            Coming Soon
                                        </SelectItem>
                                        <SelectItem value="out_of_stock">
                                            Out of Stock
                                        </SelectItem>
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
                                    <TableHead className="w-[80px]">
                                        Image
                                    </TableHead>
                                    <TableHead>Vehicle</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Mileage</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Order / Arrival</TableHead>
                                    <TableHead>Orders</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cars.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={11}
                                            className="py-8 text-center text-muted-foreground"
                                        >
                                            No cars found. Try adjusting your
                                            search or filter criteria.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    cars.data.map((car) => {
                                        const cfg = statusConfig[
                                            car.status
                                        ] ?? {
                                            label: car.status,
                                            variant: 'outline' as const,
                                        };

                                        return (
                                            <TableRow key={car.id}>
                                                <TableCell>
                                                    {car.image_url ? (
                                                        <Link
                                                            href={admin.cars.show(
                                                                car.id,
                                                            )}
                                                        >
                                                            <BlurImage
                                                                src={car.image_url}
                                                                alt={`${car.make.name} ${car.model.name}`}
                                                                containerClassName="h-12 w-16 rounded"
                                                                className="rounded"
                                                            />
                                                        </Link>
                                                    ) : (
                                                        <div className="flex h-12 w-16 items-center justify-center rounded bg-muted">
                                                            <Car className="size-5 text-muted-foreground/40" />
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    <Link
                                                        href={admin.cars.show(
                                                            car.id,
                                                        )}
                                                        className="text-primary hover:underline"
                                                    >
                                                        {car.make.name}{' '}
                                                        {car.model.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {car.year}
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    {formatCurrency(car.price)}
                                                </TableCell>
                                                <TableCell>
                                                    {formatMileage(car.mileage)}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={cfg.variant}
                                                    >
                                                        {cfg.label}
                                                    </Badge>
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
                                                        {car.status !==
                                                            'coming_soon' && (
                                                            <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                                                {car.total}
                                                            </span>
                                                        )}
                                                        {car.model_coming_soon >
                                                            0 && (
                                                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600">
                                                                <Clock className="size-3" />
                                                                {
                                                                    car.model_coming_soon
                                                                }{' '}
                                                                coming
                                                            </span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {car.seller?.name ?? 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    <TableActions
                                                        actions={[
                                                            {
                                                                label: 'View',
                                                                href: admin.cars.show(
                                                                    car.id,
                                                                ),
                                                            },
                                                            {
                                                                label: 'Edit',
                                                                href: admin.cars.edit(
                                                                    car.id,
                                                                ),
                                                            },
                                                            {
                                                                label: 'Delete',
                                                                onClick: () =>
                                                                    handleDelete(
                                                                        car,
                                                                    ),
                                                                destructive: true,
                                                            },
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
                                    Showing{' '}
                                    <span className="font-medium">
                                        {cars.from}
                                    </span>{' '}
                                    to{' '}
                                    <span className="font-medium">
                                        {cars.to}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-medium">
                                        {cars.total}
                                    </span>{' '}
                                    cars
                                </p>
                                <div className="order-1 flex items-center gap-1 sm:order-2">
                                    {cars.links
                                        .filter((link) => {
                                            const label =
                                                link.label.toLowerCase();

                                            return (
                                                !label.includes('previous') &&
                                                !label.includes('next')
                                            );
                                        })
                                        .map((link, i) => (
                                            <Button
                                                key={i}
                                                variant={
                                                    link.active
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                size="sm"
                                                disabled={!link.url}
                                                asChild={!!link.url}
                                            >
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label.replace(
                                                                /&laquo;|&raquo;/g,
                                                                '',
                                                            ),
                                                        }}
                                                    />
                                                ) : (
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label.replace(
                                                                /&laquo;|&raquo;/g,
                                                                '',
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            </Button>
                                        ))}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={!cars.prev_page_url}
                                        asChild={!!cars.prev_page_url}
                                    >
                                        {cars.prev_page_url ? (
                                            <Link href={cars.prev_page_url}>
                                                Previous
                                            </Link>
                                        ) : (
                                            <span>Previous</span>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={!cars.next_page_url}
                                        asChild={!!cars.next_page_url}
                                    >
                                        {cars.next_page_url ? (
                                            <Link href={cars.next_page_url}>
                                                Next
                                            </Link>
                                        ) : (
                                            <span>Next</span>
                                        )}
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

AdminCarIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Cars', href: admin.cars.index() },
    ],
};
