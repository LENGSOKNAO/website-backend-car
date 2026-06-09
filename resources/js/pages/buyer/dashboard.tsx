import { Head, Link } from '@inertiajs/react';
import { ShoppingCart, DollarSign, Clock, CheckCircle, Car, MessageSquare, Tag, Heart, Check } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import buyer from '@/routes/buyer';

interface RecentOrder {
    id: string;
    order_number: string;
    seller_name: string;
    total: number;
    status: string;
    item: string;
    placed_at: string | null;
}

interface StatusBreakdown {
    status: string;
    count: number;
}

interface Stats {
    total_orders: number;
    total_spent: number;
    pending_orders: number;
    completed_orders: number;
    saved_listings: number;
    pending_inquiries: number;
    pending_offers: number;
    status_breakdown: StatusBreakdown[];
    recent_orders: RecentOrder[];
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    pending: 'secondary',
    confirmed: 'default',
    processing: 'default',
    completed: 'default',
    cancelled: 'destructive',
    refunded: 'outline',
};

const STATUS_COLORS: Record<string, string> = {
    pending: '#f59e0b',
    confirmed: '#3b82f6',
    processing: '#8b5cf6',
    completed: '#10b981',
    cancelled: '#ef4444',
    refunded: '#6b7280',
};

export default function BuyerDashboard({ stats }: { stats: Stats }) {
    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

    return (
        <>
            <Head title="My Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">My Dashboard</h1>
                    <p className="text-sm text-muted-foreground">Track your purchases and activity</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                            <div className="rounded-md bg-muted p-2 text-muted-foreground"><ShoppingCart className="size-4" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold tracking-tight">{stats.total_orders}</div>
                            <p className="text-xs text-muted-foreground">Orders placed</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
                            <div className="rounded-md bg-muted p-2 text-muted-foreground"><DollarSign className="size-4" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold tracking-tight">{formatCurrency(stats.total_spent)}</div>
                            <p className="text-xs text-muted-foreground">Lifetime purchases</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Saved Listings</CardTitle>
                            <div className="rounded-md bg-muted p-2 text-muted-foreground"><Heart className="size-4" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold tracking-tight">{stats.saved_listings}</div>
                            <p className="text-xs text-muted-foreground">In your wishlist</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
                            <div className="rounded-md bg-muted p-2 text-muted-foreground"><Clock className="size-4" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold tracking-tight">{stats.pending_orders}</div>
                            <p className="text-xs text-muted-foreground">Awaiting processing</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
                            <div className="rounded-md bg-muted p-2 text-muted-foreground"><CheckCircle className="size-4" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold tracking-tight">{stats.completed_orders}</div>
                            <p className="text-xs text-muted-foreground">Delivered orders</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Inquiries</CardTitle>
                            <div className="rounded-md bg-muted p-2 text-muted-foreground">
                                {stats.pending_inquiries > 0 ? <MessageSquare className="size-4" /> : <Check className="size-4" />}
                            </div>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <span className="text-2xl font-semibold tracking-tight">
                                {stats.pending_inquiries > 0 ? stats.pending_inquiries : <Check className="size-6" />}
                            </span>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={buyer.inquiries.index()}>{stats.pending_inquiries > 0 ? 'View' : 'Browse'}</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Offers</CardTitle>
                            <div className="rounded-md bg-muted p-2 text-muted-foreground">
                                {stats.pending_offers > 0 ? <Tag className="size-4" /> : <Check className="size-4" />}
                            </div>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <span className="text-2xl font-semibold tracking-tight">
                                {stats.pending_offers > 0 ? stats.pending_offers : <Check className="size-6" />}
                            </span>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={buyer.offers.index()}>{stats.pending_offers > 0 ? 'View' : 'Browse'}</Link>
                            </Button>
                        </CardContent>
                    </Card>

                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Orders by Status</CardTitle>
                        </CardHeader>
                        <CardContent className="h-72">
                            {stats.status_breakdown.length === 0 ? (
                                <div className="flex h-full items-center justify-center">
                                    <div className="text-center">
                                        <ShoppingCart className="mx-auto size-8 text-muted-foreground/40" />
                                        <p className="mt-2 text-sm text-muted-foreground">No orders yet.</p>
                                    </div>
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={stats.status_breakdown}
                                            dataKey="count"
                                            nameKey="status"
                                            cx="50%" cy="50%"
                                            outerRadius={80}
                                            label={({ status, count }) => `${status} (${count})`}
                                        >
                                            {stats.status_breakdown.map((entry) => (
                                                <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? '#6b7280'} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start" asChild>
                                <Link href={buyer.inquiries.index()}>
                                    <MessageSquare className="mr-2 size-4" /> View My Inquiries
                                </Link>
                            </Button>
                            <Button variant="outline" className="w-full justify-start" asChild>
                                <Link href={buyer.offers.index()}>
                                    <Tag className="mr-2 size-4" /> View My Offers
                                </Link>
                            </Button>
                            <Button variant="outline" className="w-full justify-start" asChild>
                                <Link href={buyer.savedListings.index()}>
                                    <Heart className="mr-2 size-4" /> View Saved Listings
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base">Recent Orders</CardTitle>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={buyer.orders.index()}>View All</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {stats.recent_orders.length === 0 ? (
                            <div className="py-8 text-center">
                                <ShoppingCart className="mx-auto size-8 text-muted-foreground/40" />
                                <p className="mt-2 text-sm text-muted-foreground">No orders yet.</p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order</TableHead>
                                        <TableHead>Seller</TableHead>
                                        <TableHead>Item</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                        <TableHead className="text-center">Status</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stats.recent_orders.map((o) => (
                                        <TableRow key={o.id}>
                                            <TableCell className="font-mono text-xs">{o.order_number}</TableCell>
                                            <TableCell>{o.seller_name}</TableCell>
                                            <TableCell className="text-sm">{o.item}</TableCell>
                                            <TableCell className="text-right font-medium">{formatCurrency(o.total)}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={statusVariant[o.status] ?? 'secondary'} className="capitalize">{o.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {o.placed_at ? new Date(o.placed_at).toLocaleDateString() : '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

BuyerDashboard.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Dashboard', href: '/buyer/dashboard' },
    ],
};
