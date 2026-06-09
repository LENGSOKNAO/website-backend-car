import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ShoppingCart, DollarSign, Clock, CheckCircle, TrendingUp, Car, MessageSquare, Tag, Star, Check } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import seller from '@/routes/seller';

// Import Echo for real-time broadcasting
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;

interface MonthlyRevenue {
    month: string;
    revenue: number;
}

interface StatusBreakdown {
    status: string;
    count: number;
}

interface RecentOrder {
    id: string;
    order_number: string;
    buyer_name: string;
    total: number;
    status: string;
    item: string;
    placed_at: string | null;
}

interface Stats {
    total_sales: number;
    total_revenue: number;
    pending_orders: number;
    completed_orders: number;
    cancelled_orders: number;
    active_listings: number;
    pending_inquiries: number;
    pending_offers: number;
    avg_rating: number | null;
    monthly_revenue: MonthlyRevenue[];
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

export default function SellerDashboard({ stats }: { stats: Stats }) {
    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

    // State for dashboard stats
    const [dashboardStats, setDashboardStats] = React.useState<Stats>(stats);

    // Set up real-time updates using Echo/Pusher
    React.useEffect(() => {
        // In a real app, you would get the seller ID from auth context or props
        // For now, we'll simulate getting it from somewhere or use a placeholder
        const sellerId = 1; // This should come from auth/user context
        
        // Set up Echo to listen for seller dashboard updates
        // Only proceed if Echo is available (initialized in bootstrap.js)
        if (!window.Echo) {
            console.warn('Echo not available. Real-time updates disabled.');
            return;
        }
        
        const echo = window.Echo;

        // Subscribe to the private channel for this seller's dashboard updates
        const channel = echo.private(`seller-dashboard.${sellerId}`);

        // Listen for the seller-dashboard-updated event
        channel.listen('.seller-dashboard-updated', (e: any) => {
            // When we receive an update, fetch the latest dashboard data
            fetch(`/api/v1/seller/dashboard`)
                .then(response => response.json())
                .then(data => {
                    setDashboardStats(data);
                })
                .catch(error => {
                    console.error('Failed to fetch dashboard data:', error);
                });
        });

        // Also fetch initial data
        const fetchInitialData = async () => {
            try {
                const response = await fetch(`/api/v1/seller/dashboard`);
                if (response.ok) {
                    const data = await response.json();
                    setDashboardStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch initial dashboard data:', error);
            }
        };

        fetchInitialData();

        // Clean up on unmount
        return () => {
            echo.leave(channel);
        };
    }, []); // Empty deps array to run once on mount

    return (
        <>
            <Head title="My Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">My Dashboard</h1>
                    <p className="text-sm text-muted-foreground">Track your sales and performance</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
                            <div className="rounded-md bg-muted p-2 text-muted-foreground"><ShoppingCart className="size-4" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold tracking-tight">{dashboardStats.total_sales}</div>
                            <p className="text-xs text-muted-foreground">Orders received</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
                            <div className="rounded-md bg-muted p-2 text-muted-foreground"><DollarSign className="size-4" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold tracking-tight">{formatCurrency(dashboardStats.total_revenue)}</div>
                            <p className="text-xs text-muted-foreground">Total earnings</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Active Listings</CardTitle>
                            <div className="rounded-md bg-muted p-2 text-muted-foreground"><Car className="size-4" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold tracking-tight">{dashboardStats.active_listings}</div>
                            <p className="text-xs text-muted-foreground">Available for sale</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
                            <div className="rounded-md bg-muted p-2 text-muted-foreground"><Clock className="size-4" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold tracking-tight">{dashboardStats.pending_orders}</div>
                            <p className="text-xs text-muted-foreground">Awaiting action</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
                            <div className="rounded-md bg-muted p-2 text-muted-foreground"><CheckCircle className="size-4" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold tracking-tight">{dashboardStats.completed_orders}</div>
                            <p className="text-xs text-muted-foreground">{dashboardStats.cancelled_orders} cancelled</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Rating</CardTitle>
                            <div className="rounded-md bg-muted p-2 text-muted-foreground"><Star className="size-4" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold tracking-tight">{dashboardStats.avg_rating ?? '-'}</div>
                            <p className="text-xs text-muted-foreground">Average rating</p>
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
                                 {dashboardStats.pending_inquiries > 0 ? dashboardStats.pending_inquiries : <Check className="size-6" />}
                            </span>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={seller.inquiries.index()}>{stats.pending_inquiries > 0 ? 'View' : 'Browse'}</Link>
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
                                 {dashboardStats.pending_offers > 0 ? dashboardStats.pending_offers : <Check className="size-6" />}
                            </span>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={seller.offers.index()}>{stats.pending_offers > 0 ? 'View' : 'Browse'}</Link>
                            </Button>
                        </CardContent>
                    </Card>

                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <TrendingUp className="size-4" /> Revenue Trend
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-72">
                            {stats.monthly_revenue.length === 0 ? (
                                <div className="flex h-full items-center justify-center">
                                    <div className="text-center">
                                        <TrendingUp className="mx-auto size-8 text-muted-foreground/40" />
                                        <p className="mt-2 text-sm text-muted-foreground">No revenue data yet.</p>
                                    </div>
                                </div>
                             ) : (
                                 <ResponsiveContainer width="100%" height="100%">
                                     <LineChart data={dashboardStats.monthly_revenue}>
                                         <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                         <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
                                         <Tooltip formatter={(v: number) => formatCurrency(v)} />
                                         <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                                     </LineChart>
                                 </ResponsiveContainer>
                             )}
                        </CardContent>
                    </Card>

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
                                             data={dashboardStats.status_breakdown}
                                             dataKey="count"
                                             nameKey="status"
                                             cx="50%" cy="50%"
                                             outerRadius={80}
                                             label={({ status, count }) => `${status} (${count})`}
                                         >
                                             {dashboardStats.status_breakdown.map((entry) => (
                                                 <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? '#6b7280'} />
                                             ))}
                                         </Pie>
                                         <Tooltip />
                                     </PieChart>
                                 </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base">Recent Orders</CardTitle>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={seller.orders.index()}>View All</Link>
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
                                        <TableHead>Buyer</TableHead>
                                        <TableHead>Item</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                        <TableHead className="text-center">Status</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                     {dashboardStats.recent_orders.map((o) => (
                                         <TableRow key={o.id}>
                                             <TableCell className="font-mono text-xs">{o.order_number}</TableCell>
                                             <TableCell>{o.buyer_name}</TableCell>
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

SellerDashboard.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Dashboard', href: seller.dashboard() },
    ],
};
