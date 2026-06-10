import { Head, Link, router } from '@inertiajs/react';
import { Search, Car, UserCheck, ShoppingCart, ClipboardList } from 'lucide-react';
import { TableActions } from '@/components/table-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import seller from '@/routes/seller';
import type { Order } from '@/types';

interface PreOrderItem {
    id: string;
    listing: { id: string; make: { name: string }; model: { name: string }; year: number; primary_image: { image_url: string } | null } | null;
    customer_name: string;
    customer_email: string;
    customer_phone: string | null;
    quantity: number;
    status: string;
    source: string | null;
    customer: { id: string; name: string; email: string } | null;
    created_at: string;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface OrderItem {
    listing: { make: { name: string }; model: { name: string }; year: number; image_url: string | null };
}

type OrderData = Order & {
    buyer: { id: string; full_name: string; email: string; phone: string | null };
    items: OrderItem[];
};

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    pending: 'secondary',
    confirmed: 'default',
    processing: 'default',
    completed: 'default',
    cancelled: 'destructive',
    refunded: 'outline',
};

const poStatusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    pending: { label: 'Pending', variant: 'secondary' },
    confirmed: { label: 'Confirmed', variant: 'default' },
    fulfilled: { label: 'Fulfilled', variant: 'outline' },
    cancelled: { label: 'Cancelled', variant: 'destructive' },
};

export default function SellerOrders({ orders, preOrders, filters }: {
    orders: PaginatedData<OrderData> & { data: OrderData[] };
    preOrders: PaginatedData<PreOrderItem>;
    filters: { search?: string; status?: string; tab?: string };
}) {
    const currentTab = filters?.tab || 'orders';

    const switchTab = (tab: string) => {
        router.get(seller.orders.index().url, { ...filters, tab }, { preserveState: true, replace: true });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get(seller.orders.index().url, { ...filters, search: e.target.value }, { preserveState: true, replace: true });
    };
    const handleStatusFilter = (value: string) => {
        router.get(seller.orders.index().url, { ...filters, status: value }, { preserveState: true, replace: true });
    };

    const vehicleName = (p: PreOrderItem) => {
        if (p.listing) {
return `${p.listing.make.name} ${p.listing.model.name} (${p.listing.year})`;
}

        return 'Vehicle TBD';
    };

    const activeData = currentTab === 'orders' ? orders : preOrders;

    return (
        <>
            <Head title={currentTab === 'orders' ? 'My Sales' : 'Pre-Orders'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {currentTab === 'orders' ? 'My Sales' : 'Pre-Orders'}
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            {currentTab === 'orders' ? 'Orders from your listings' : 'Pre-orders for your upcoming vehicles'}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
                    <button
                        onClick={() => switchTab('orders')}
                        className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                            currentTab === 'orders' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <ShoppingCart className="size-4" />
                        Orders
                        {orders.total > 0 && <span className="text-xs text-muted-foreground">({orders.total})</span>}
                    </button>
                    <button
                        onClick={() => switchTab('pre-orders')}
                        className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                            currentTab === 'pre-orders' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <ClipboardList className="size-4" />
                        Pre-Orders
                        {preOrders.total > 0 && <span className="text-xs text-muted-foreground">({preOrders.total})</span>}
                    </button>
                </div>

                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>{currentTab === 'orders' ? 'Sales History' : 'Pre-Order Requests'}</CardTitle>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="relative max-w-md flex-1">
                                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder={currentTab === 'orders' ? 'Search order or buyer...' : 'Search customer or vehicle...'}
                                        defaultValue={filters?.search ?? ''}
                                        onChange={handleSearch}
                                        className="h-9 pl-9"
                                    />
                                </div>
                                <Select value={filters?.status ?? ''} onValueChange={handleStatusFilter}>
                                    <SelectTrigger className="h-9 w-[150px]">
                                        <SelectValue placeholder="All statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value=" ">All Statuses</SelectItem>
                                        {currentTab === 'orders' ? (
                                            <>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                                <SelectItem value="processing">Processing</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                                <SelectItem value="refunded">Refunded</SelectItem>
                                            </>
                                        ) : (
                                            <>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                                <SelectItem value="fulfilled">Fulfilled</SelectItem>
                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                            </>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {currentTab === 'orders' ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order #</TableHead>
                                        <TableHead>Buyer</TableHead>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                                No sales yet.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        orders.data.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-mono text-xs">{order.order_number}</TableCell>
                                                <TableCell>
                                                    <p className="font-medium text-sm">{order.buyer.full_name}</p>
                                                    <p className="text-xs text-muted-foreground">{order.buyer.email}</p>
                                                    {order.buyer.phone && <p className="text-xs text-muted-foreground">{order.buyer.phone}</p>}
                                                    <div className="text-[10px] text-primary font-medium mt-0.5 flex items-center gap-0.5">
                                                        <UserCheck className="size-3" />
                                                        Registered
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {order.items.length > 0 && (() => {
                                                        const first = order.items[0];

                                                        return (
                                                            <div className="flex items-center gap-3">
                                                                <div className="relative size-10 rounded bg-muted overflow-hidden shrink-0">
                                                                    {first.listing.image_url ? (
                                                                        <img src={first.listing.image_url} alt="" className="size-full object-cover" />
                                                                    ) : (
                                                                        <div className="size-full flex items-center justify-center">
                                                                            <Car className="size-5 text-muted-foreground/30" />
                                                                        </div>
                                                                    )}
                                                                    {order.items.length > 1 && (
                                                                        <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground shadow">
                                                                            +{order.items.length - 1}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium">{first.listing.make.name} {first.listing.model.name}</p>
                                                                    <p className="text-xs text-muted-foreground">{first.listing.year}{order.items.length > 1 ? ` +${order.items.length - 1} more` : ''}</p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })()}
                                                </TableCell>
                                                <TableCell className="font-semibold">${Number(order.total).toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Badge variant={statusVariant[order.status] ?? 'secondary'}>
                                                        {order.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground text-sm">
                                                    {order.placed_at ? new Date(order.placed_at).toLocaleDateString() : '-'}
                                                </TableCell>
                                                <TableCell>
                                                    <TableActions
                                                        actions={[
                                                            { label: 'View', href: seller.orders.show(order.id) },
                                                        ]}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Vehicle</TableHead>
                                        <TableHead>Qty</TableHead>
                                        <TableHead>Source</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {preOrders.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                                No pre-orders yet.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        preOrders.data.map((p) => {
                                            const cfg = poStatusConfig[p.status] ?? { label: p.status, variant: 'outline' as const };

                                            return (
                                                <TableRow key={p.id}>
                                                    <TableCell>
                                                        <p className="font-medium text-sm">{p.customer_name}</p>
                                                        <p className="text-xs text-muted-foreground">{p.customer_email}</p>
                                                        {p.customer_phone && <p className="text-xs text-muted-foreground">{p.customer_phone}</p>}
                                                        {p.customer && (
                                                            <div className="text-[10px] text-primary font-medium mt-0.5 flex items-center gap-0.5">
                                                                <UserCheck className="size-3" />
                                                                Registered
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-sm">
                                                        <div className="flex items-center gap-3">
                                                            <div className="relative size-10 rounded bg-muted overflow-hidden shrink-0">
                                                                {p.listing?.primary_image ? (
                                                                    <img src={p.listing.primary_image.image_url} alt="" className="size-full object-cover" />
                                                                ) : (
                                                                    <div className="size-full flex items-center justify-center">
                                                                        <Car className="size-5 text-muted-foreground/30" />
                                                                    </div>
                                                                )}
                                                                {p.quantity > 1 && (
                                                                    <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground shadow">
                                                                        +{p.quantity - 1}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium">{vehicleName(p)}</p>
                                                                {p.quantity > 1 && <p className="text-xs text-muted-foreground">+{p.quantity - 1} more</p>}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell><span className="font-semibold">{p.quantity}</span></TableCell>
                                                    <TableCell className="text-xs capitalize">{p.source?.replace(/_/g, ' ') || '\u2014'}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-xs text-muted-foreground">
                                                        {new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </TableCell>
                                                    <TableCell>
                                                        <TableActions
                                                            actions={[
                                                                { label: 'View', href: seller.preOrders.show(p.id) },
                                                            ]}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        )}
                        {'last_page' in activeData && activeData.last_page > 1 && (
                            <div className="mt-4 flex flex-col items-center justify-between gap-3 pt-4 border-t sm:flex-row">
                                <p className="order-2 text-sm text-muted-foreground sm:order-1">
                                    Showing <span className="font-medium">{activeData.from}</span> to <span className="font-medium">{activeData.to}</span> of <span className="font-medium">{activeData.total}</span> {currentTab === 'orders' ? 'orders' : 'pre-orders'}
                                </p>
                                <div className="order-1 flex items-center gap-1 sm:order-2">
                                    {activeData.links.filter((l) => !l.label.toLowerCase().includes('previous') && !l.label.toLowerCase().includes('next')).map((link, i) => (
                                        <Button key={i} variant={link.active ? 'default' : 'outline'} size="sm" disabled={!link.url} onClick={() => {
                                            if (link.url) {
                                                const url = new URL(link.url, window.location.origin);
                                                const page = url.searchParams.get('page') || '1';
                                                router.get(seller.orders.index().url, { ...filters, page, tab: currentTab }, { preserveState: true, replace: true });
                                            }
                                        }}>
                                            <span dangerouslySetInnerHTML={{ __html: link.label.replace(/&laquo;|&raquo;/g, '') }} />
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

SellerOrders.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Sales', href: seller.orders.index() },
    ],
};
