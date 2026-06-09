import { Head, Link, router } from '@inertiajs/react';
import {
    Plus,
    Search,
    ShoppingCart,
    CheckCircle2,
    Clock,
    XCircle,
    Package,
    UserCheck,
    Car,
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

interface PreOrder {
    id: string;
    listing: {
        id: string;
        make: { name: string };
        model: { name: string };
        year: number;
        seller: { id: string; full_name: string } | null;
        primary_image: { image_url: string } | null;
    } | null;
    make: { id: string; name: string } | null;
    model: { id: string; name: string } | null;
    customer_name: string;
    customer_email: string;
    customer_phone: string | null;
    quantity: number;
    status: string;
    source: string | null;
    notes: string | null;
    budget_min: string | null;
    budget_max: string | null;
    customer: { id: string; name: string; email: string } | null;
    created_by: { id: string; name: string } | null;
    created_at: string;
}

interface Paginated {
    data: PreOrder[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
    prev_page_url: string | null;
    next_page_url: string | null;
}

interface Stats {
    total: number;
    pending: number;
    confirmed: number;
    fulfilled: number;
    cancelled: number;
}

const statusConfig: Record<
    string,
    {
        label: string;
        variant: 'default' | 'secondary' | 'destructive' | 'outline';
    }
> = {
    pending: { label: 'Pending', variant: 'secondary' },
    confirmed: { label: 'Confirmed', variant: 'default' },
    fulfilled: { label: 'Fulfilled', variant: 'outline' },
    cancelled: { label: 'Cancelled', variant: 'destructive' },
};

const statCards = [
    {
        key: 'total' as const,
        label: 'Total Pre-Orders',
        icon: Package,
        color: 'text-blue-600',
    },
    {
        key: 'pending' as const,
        label: 'Pending',
        icon: Clock,
        color: 'text-amber-600',
    },
    {
        key: 'confirmed' as const,
        label: 'Confirmed',
        icon: ShoppingCart,
        color: 'text-indigo-600',
    },
    {
        key: 'fulfilled' as const,
        label: 'Fulfilled',
        icon: CheckCircle2,
        color: 'text-emerald-600',
    },
    {
        key: 'cancelled' as const,
        label: 'Cancelled',
        icon: XCircle,
        color: 'text-red-600',
    },
];

export default function PreOrderIndex({
    preOrders,
    filters,
    stats,
}: {
    preOrders: Paginated;
    filters: { search?: string; status?: string };
    stats: Stats;
}) {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get(
            admin.preOrders.index().url,
            { ...filters, search: e.target.value },
            { preserveState: true, replace: true },
        );
    };
    const handleStatusFilter = (value: string) => {
        router.get(
            admin.preOrders.index().url,
            { ...filters, status: value },
            { preserveState: true, replace: true },
        );
    };
    const handleDelete = (p: PreOrder) => {
        if (confirm(`Delete pre-order from ${p.customer_name}?`)) {
            router.delete(admin.preOrders.destroy(p.id).url);
        }
    };
    const vehicleName = (p: PreOrder) => {
        if (p.listing) {
            return `${p.listing.make.name} ${p.listing.model.name} (${p.listing.year})`;
        }

        if (p.make && p.model) {
            return `${p.make.name} ${p.model.name}`;
        }

        return 'Vehicle TBD';
    };
    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(amount);

    return (
        <>
            <Head title="Pre-Orders" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Pre-Orders
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Customer pre-orders for upcoming vehicles
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {statCards.map(({ key, label, icon: Icon, color }) => (
                        <Card key={key}>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        {label}
                                    </p>
                                    <Icon className={`size-4 ${color}`} />
                                </div>
                                <p className="mt-1 text-2xl font-bold">
                                    {stats[key]}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>All Pre-Orders</CardTitle>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="relative max-w-md flex-1">
                                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search customer or vehicle..."
                                        defaultValue={filters.search ?? ''}
                                        onChange={handleSearch}
                                        className="h-9 pl-9"
                                    />
                                </div>
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
                                        <SelectItem value="pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="confirmed">
                                            Confirmed
                                        </SelectItem>
                                        <SelectItem value="fulfilled">
                                            Fulfilled
                                        </SelectItem>
                                        <SelectItem value="cancelled">
                                            Cancelled
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Vehicle</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Source</TableHead>
                                    <TableHead>Seller</TableHead>
                                    <TableHead>Budget</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created By</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {preOrders.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={10}
                                            className="py-8 text-center text-muted-foreground"
                                        >
                                            No pre-orders yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    preOrders.data.map((p) => {
                                        const cfg = statusConfig[p.status] ?? {
                                            label: p.status,
                                            variant: 'outline' as const,
                                        };

                                        return (
                                            <TableRow key={p.id}>
                                                <TableCell>
                                                    <Link
                                                        href={admin.preOrders.show(
                                                            p.id,
                                                        )}
                                                        className="font-medium text-primary hover:underline"
                                                    >
                                                        {p.customer_name}
                                                    </Link>
                                                    <div className="text-xs text-muted-foreground">
                                                        {p.customer_email}
                                                    </div>
                                                    {p.customer_phone && (
                                                        <div className="text-xs text-muted-foreground">
                                                            {p.customer_phone}
                                                        </div>
                                                    )}
                                                    {p.customer && (
                                                        <div className="mt-0.5 flex items-center gap-0.5 text-[10px] font-medium text-primary">
                                                            <UserCheck className="size-3" />
                                                            Registered:{' '}
                                                            {p.customer.name}
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative size-10 shrink-0 overflow-hidden rounded bg-muted">
                                                            {p.listing
                                                                ?.primary_image ? (
                                                                <img
                                                                    src={
                                                                        p
                                                                            .listing
                                                                            .primary_image
                                                                            .image_url
                                                                    }
                                                                    alt=""
                                                                    className="size-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex size-full items-center justify-center">
                                                                    <Car className="size-5 text-muted-foreground/30" />
                                                                </div>
                                                            )}
                                                            {p.quantity > 1 && (
                                                                <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground shadow">
                                                                    +
                                                                    {p.quantity -
                                                                        1}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium">
                                                                {vehicleName(p)}
                                                            </p>
                                                            {p.quantity > 1 && (
                                                                <p className="text-xs text-muted-foreground">
                                                                    +
                                                                    {p.quantity -
                                                                        1}{' '}
                                                                    more
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="font-semibold">
                                                        {p.quantity}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-xs capitalize">
                                                    {p.source?.replace(
                                                        /_/g,
                                                        ' ',
                                                    ) || '\u2014'}
                                                </TableCell>
                                                <TableCell className="text-xs text-muted-foreground">
                                                    {p.listing?.seller
                                                        ?.full_name || '\u2014'}
                                                </TableCell>
                                                <TableCell className="text-xs whitespace-nowrap">
                                                    {p.budget_min ||
                                                    p.budget_max
                                                        ? `${p.budget_min ? formatCurrency(Number(p.budget_min)) : '$0'} \u2192 ${p.budget_max ? formatCurrency(Number(p.budget_max)) : '\u221E'}`
                                                        : '\u2014'}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={cfg.variant}
                                                    >
                                                        {cfg.label}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-xs text-muted-foreground">
                                                    {p.created_by?.name ||
                                                        '\u2014'}
                                                </TableCell>
                                                <TableCell className="text-xs text-muted-foreground">
                                                    {new Date(
                                                        p.created_at,
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            month: 'short',
                                                            day: 'numeric',
                                                        },
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <TableActions
                                                        actions={[
                                                            {
                                                                label: 'View',
                                                                href: admin.preOrders.show(
                                                                    p.id,
                                                                ),
                                                            },
                                                            {
                                                                label: 'Edit',
                                                                href: admin.preOrders.edit(
                                                                    p.id,
                                                                ),
                                                            },
                                                            {
                                                                label: 'Delete',
                                                                onClick: () =>
                                                                    handleDelete(
                                                                        p,
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
                        {preOrders.last_page > 1 && (
                            <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t pt-4 sm:flex-row">
                                <p className="order-2 text-sm text-muted-foreground sm:order-1">
                                    Showing{' '}
                                    <span className="font-medium">
                                        {preOrders.from}
                                    </span>{' '}
                                    to{' '}
                                    <span className="font-medium">
                                        {preOrders.to}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-medium">
                                        {preOrders.total}
                                    </span>{' '}
                                    pre-orders
                                </p>
                                <div className="order-1 flex items-center gap-1 sm:order-2">
                                    {preOrders.links
                                        .filter(
                                            (l) =>
                                                !l.label
                                                    .toLowerCase()
                                                    .includes('previous') &&
                                                !l.label
                                                    .toLowerCase()
                                                    .includes('next'),
                                        )
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
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

PreOrderIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Pre-Orders', href: admin.preOrders.index() },
    ],
};
