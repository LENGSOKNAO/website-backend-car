import { Head } from '@inertiajs/react';
import { TableActions } from '@/components/table-actions';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import buyer from '@/routes/buyer';
import type { Order } from '@/types';

interface PaginatedOrders {
    data: (Order & {
        seller: { id: string; full_name: string };
        items: { listing: { make: { name: string }; model: { name: string } } }[];
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

export default function BuyerOrders({ orders }: { orders: PaginatedOrders }) {
    return (
        <>
            <Head title="My Orders" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">My Orders</h1>
                        <p className="text-sm text-muted-foreground">Your purchase history</p>
                    </div>
                </div>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Purchase History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order #</TableHead>
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
                                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                            No purchases yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    orders.data.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-mono text-xs">{order.order_number}</TableCell>
                                            <TableCell>{order.seller.full_name}</TableCell>
                                            <TableCell>
                                                {order.items.map((item, i) => (
                                                    <span key={i} className="text-sm">
                                                        {item.listing.make.name} {item.listing.model.name}
                                                    </span>
                                                ))}
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
                                                        { label: 'View', href: buyer.orders.show(order.id) },
                                                    ]}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

BuyerOrders.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Orders', href: buyer.orders.index() },
    ],
};
