import { Head, Link } from '@inertiajs/react';
import { ShoppingCart, Car } from 'lucide-react';
import { TableActions } from '@/components/table-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import admin from '@/routes/admin';
import type { Order } from '@/types';

interface PaginatedOrders {
    data: (Order & {
        buyer: { id: string; full_name: string };
        seller: { id: string; full_name: string };
        items: { listing: { make: { name: string }; model: { name: string }; year: number; image_url: string | null } }[];
    })[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    pending: 'secondary',
    confirmed: 'default',
    processing: 'default',
    completed: 'default',
    cancelled: 'destructive',
    refunded: 'outline',
};

export default function OrderIndex({ orders }: { orders: PaginatedOrders }) {
    return (
        <>
            <Head title="Orders" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Orders</h1>
                        <p className="text-sm text-muted-foreground">Track all sales across the dealership</p>
                    </div>
                </div>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>All Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order #</TableHead>
                                    <TableHead>Buyer</TableHead>
                                    <TableHead>Seller</TableHead>
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
                                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                            No orders yet. Orders appear when an offer is accepted.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    orders.data.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-mono text-xs">{order.order_number}</TableCell>
                                            <TableCell>{order.buyer.full_name}</TableCell>
                                            <TableCell>{order.seller.full_name}</TableCell>
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
                                            <TableCell>${Number(order.total).toLocaleString()}</TableCell>
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
                                                        { label: 'View', href: admin.orders.show(order.id) },
                                                    ]}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        {orders.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {orders.from} to {orders.to} of {orders.total}
                                </p>
                                <div className="flex gap-1">
                                    {orders.links.map((link, i) => (
                                        <Button
                                            key={i}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            disabled={!link.url}
                                            asChild={!!link.url}
                                        >
                                            {link.url ? (
                                                <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                                            ) : (
                                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
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

OrderIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Orders', href: admin.orders.index() },
    ],
};
