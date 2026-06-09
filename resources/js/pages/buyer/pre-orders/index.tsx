import { Head, Link } from '@inertiajs/react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import buyer from '@/routes/buyer';

interface PreOrder {
    id: string;
    listing: { id: string; make: { name: string }; model: { name: string }; year: number } | null;
    make: { id: string; name: string } | null;
    model: { id: string; name: string } | null;
    customer_name: string;
    quantity: number;
    status: string;
    created_at: string;
}

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    pending: { label: 'Pending', variant: 'secondary' },
    confirmed: { label: 'Confirmed', variant: 'default' },
    fulfilled: { label: 'Fulfilled', variant: 'outline' },
    cancelled: { label: 'Cancelled', variant: 'destructive' },
};

export default function BuyerPreOrderIndex({ preOrders }: { preOrders: { data: PreOrder[] } }) {
    const vehicleName = (p: PreOrder) =>
        p.listing ? `${p.listing.make.name} ${p.listing.model.name} (${p.listing.year})`
            : (p.make && p.model ? `${p.make.name} ${p.model.name}` : 'Vehicle TBD');

    return (
        <>
            <Head title="My Pre-Orders" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">My Pre-Orders</h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">Vehicles you've pre-ordered</p>
                    </div>
                    <Button asChild>
                        <Link href={buyer.preOrders.create()}><Plus className="size-4 mr-1" /> New Pre-Order</Link>
                    </Button>
                </div>
                <Card>
                    <CardHeader><CardTitle>Pre-Orders</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Vehicle</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {preOrders.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            No pre-orders yet. <Link href={buyer.preOrders.create()} className="text-primary underline">Pre-order a vehicle</Link>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    preOrders.data.map((p) => {
                                        const cfg = statusConfig[p.status] ?? { label: p.status, variant: 'outline' as const };

                                        return (
                                            <TableRow key={p.id}>
                                                <TableCell className="font-medium">{vehicleName(p)}</TableCell>
                                                <TableCell>{p.quantity}</TableCell>
                                                <TableCell><Badge variant={cfg.variant}>{cfg.label}</Badge></TableCell>
                                                <TableCell className="text-muted-foreground text-sm">
                                                    {new Date(p.created_at).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={buyer.preOrders.show(p.id)}>View</Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

BuyerPreOrderIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: buyer.dashboard() },
        { title: 'Pre-Orders', href: buyer.preOrders.index() },
    ],
};
