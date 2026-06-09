import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    ArrowRight,
    BarChart3,
    Car,
    Clock,
    MessageSquare,
    ShoppingCart,
    TrendingUp,
    Trophy,
} from 'lucide-react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
} from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
} from '@/components/ui/chart';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import admin from '@/routes/admin';

interface Stats {
    inventory_trend: { month: string; new: number; used: number; other: number }[];
    revenue_trend: { month: string; pending: number; confirmed: number; processing: number; completed: number; cancelled: number; refunded: number }[];
    pending_inquiries: number;
    pending_orders: number;
    recent_orders: { id: string; order_number: string; buyer_name: string; item: string; total: number; status: string; placed_at: string | null }[];
    top_sellers: { seller_name: string; total_revenue: number; total_orders: number }[];
    order_status_breakdown: { status: string; count: number }[];
    inventory_by_condition: { name: string; value: number }[];
}

interface StatCard {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    value: (stats: Stats) => number;
    subtitle: string | ((stats: Stats) => string);
    isCurrency?: boolean;
}

interface MiniStatCard extends StatCard {
    badge?: (stats: Stats) => string;
}

const statCards: StatCard[] = [
    { title: 'Total Listings', icon: Car, value: (s) => s.inventory_trend.reduce((a, b) => a + b.new + b.used + b.other, 0), subtitle: 'Active listings' },
    { title: 'Total Orders', icon: ShoppingCart, value: (s) => s.recent_orders.length, subtitle: 'All time' },
    { title: 'Pending Orders', icon: Clock, value: (s) => s.pending_orders, subtitle: 'Awaiting action', isCurrency: false },
    { title: 'Inquiries', icon: MessageSquare, value: (s) => s.pending_inquiries, subtitle: 'Pending response' },
];

const miniStatCards: MiniStatCard[] = [
    { title: 'Revenue', icon: TrendingUp, value: (s) => s.revenue_trend.reduce((a, b) => a + b.completed, 0), subtitle: 'Completed orders', isCurrency: true },
];

const inventoryTrendConfig = {
    new: { label: 'New', color: 'var(--color-chart-1)' },
    used: { label: 'Used', color: 'var(--color-chart-2)' },
    other: { label: 'Other', color: 'var(--color-chart-3)' },
};

const conditionConfig = {
    new: { label: 'New', color: 'var(--color-chart-1)' },
    used: { label: 'Used', color: 'var(--color-chart-2)' },
    other: { label: 'Other', color: 'var(--color-chart-3)' },
};

const conditionPieColors = ['var(--color-chart-1)', 'var(--color-chart-2)', 'var(--color-chart-3)'];

const revenueConfig = {
    pending: { label: 'Pending', color: 'var(--color-chart-1)' },
    confirmed: { label: 'Confirmed', color: 'var(--color-chart-2)' },
    processing: { label: 'Processing', color: 'var(--color-chart-3)' },
    completed: { label: 'Completed', color: 'var(--color-chart-4)' },
    cancelled: { label: 'Cancelled', color: 'var(--color-chart-5)' },
    refunded: { label: 'Refunded', color: 'var(--color-muted-foreground)' },
};

const orderStatusConfig: Record<string, { label: string; color: string }> = {
    pending: { label: 'Pending', color: 'var(--color-chart-1)' },
    confirmed: { label: 'Confirmed', color: 'var(--color-chart-2)' },
    processing: { label: 'Processing', color: 'var(--color-chart-3)' },
    completed: { label: 'Completed', color: 'var(--color-chart-4)' },
    cancelled: { label: 'Cancelled', color: 'var(--color-chart-5)' },
    refunded: { label: 'Refunded', color: 'var(--color-muted-foreground)' },
};

const orderStatusPieColors = [
    'var(--color-chart-1)',
    'var(--color-chart-2)',
    'var(--color-chart-3)',
    'var(--color-chart-4)',
    'var(--color-chart-5)',
    'var(--color-muted-foreground)',
];

const orderStatusVariant: Record<string, string> = {
    pending: 'secondary',
    confirmed: 'default',
    processing: 'default',
    completed: 'success',
    cancelled: 'destructive',
    refunded: 'outline',
};

function InventoryTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
            <div className="text-xs text-muted-foreground">{label}</div>
            {payload.map((entry: any) => (
                <div key={entry.name} className="flex items-center gap-2 text-xs font-medium">
                    <span className="size-2 rounded-full" style={{ background: entry.color }} />
                    {entry.name}: {entry.value}
                </div>
            ))}
        </div>
    );
}

function RevenueTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
            <div className="text-xs text-muted-foreground">{label}</div>
            {payload.map((entry: any) => (
                <div key={entry.name} className="flex items-center gap-2 text-xs font-medium">
                    <span className="size-2 rounded-full" style={{ background: entry.color }} />
                    {entry.name}: ${entry.value?.toLocaleString()}
                </div>
            ))}
        </div>
    );
}

function PieChartCard({ data, config, colors, title, icon: Icon }: { data: { name: string; value: number }[]; config: Record<string, { label: string; color: string }>; colors: string[]; title: string; icon: React.ComponentType<{ className?: string }> }) {
    const total = data.reduce((s, d) => s + d.value, 0);
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <Icon className="size-4" /> {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">No data</p>
                ) : (
                    <div className="space-y-2">
                        {data.map((d, i) => (
                            <div key={d.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="size-3 rounded-sm" style={{ background: colors[i] }} />
                                    <span>{config[d.name]?.label ?? d.name}</span>
                                </div>
                                <span className="font-medium">{total > 0 ? Math.round((d.value / total) * 100) : 0}%</span>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default function AdminDashboard({ stats }: { stats: Stats }) {
  const [freshStats, setFreshStats] = useState(stats);

  useEffect(() => {
    const fetchStats = () => {
      router.reload({
        only: ['stats'],
        preserveState: true,
        preserveScroll: true,
        onSuccess: (page) => {
          if (page.props.stats) {
            setFreshStats(page.props.stats);
          }
        },
        onError: () => {
          console.error('Failed to refresh stats');
        },
      });
    };

    // Fetch stats every 5 seconds for near real-time updates
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);
    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(amount);

    const hasAlerts =
        stats.pending_inquiries > 0 ||
        stats.pending_orders > 0;

    const totalRevenue = stats.revenue_trend.reduce(
        (sum, d) =>
            sum +
            d.pending +
            d.confirmed +
            d.processing +
            d.completed +
            d.cancelled +
            d.refunded,
        0,
    );

    return (
        <>
            <Head title="Dealership Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Dealership Dashboard
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Overview of your dealership performance
                        </p>
                    </div>
                    <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
                        <Clock className="size-4" />
                        <span>
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </span>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((card) => {
                        const Icon = card.icon;
                        const val = card.value(stats);
                        const sub =
                            typeof card.subtitle === 'function'
                                ? card.subtitle(stats)
                                : card.subtitle;

                        return (
                            <Card key={card.title}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        {card.title}
                                    </CardTitle>
                                    <div className="rounded-md bg-muted p-2 text-muted-foreground">
                                        <Icon className="size-4" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-semibold tracking-tight">
                                        {card.isCurrency
                                            ? formatCurrency(val as number)
                                            : val}
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {sub}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {miniStatCards.map((card) => {
                        const Icon = card.icon;
                        const val = card.value(stats);
                        const sub =
                            typeof card.subtitle === 'function'
                                ? card.subtitle(stats)
                                : card.subtitle;

                        return (
                            <Card
                                key={card.title}
                                className="shadow-sm transition-all hover:shadow-md"
                            >
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {card.title}
                                    </CardTitle>
                                    <Icon className="size-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold">
                                            {card.isCurrency
                                                ? formatCurrency(val as number)
                                                : val}
                                        </span>
                                        {card.badge?.(stats) && (
                                            <Badge
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {card.badge(stats)}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {sub}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {hasAlerts && (
                    <div className="grid gap-4 md:grid-cols-2">
                        {stats.pending_inquiries > 0 && (
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        Pending Inquiries
                                    </CardTitle>
                                    <MessageSquare className="size-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent className="flex items-center justify-between">
                                    <span className="text-2xl font-semibold tracking-tight">
                                        {stats.pending_inquiries}
                                    </span>
                                    <Button variant="outline" size="sm">
                                        View
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                <div className="grid gap-6 lg:grid-cols-[70%_30%]">
                    <Card>
                        <CardHeader>
                            <CardTitle>Inventory Trend</CardTitle>
                            <CardDescription>
                                Listings added per month by condition
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={inventoryTrendConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={stats.inventory_trend}
                                    margin={{ left: 12, right: 12 }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => {
                                            const [y, m] = value.split('-');
                                            const date = new Date(
                                                Number(y),
                                                Number(m) - 1,
                                            );

                                            return date.toLocaleDateString(
                                                'en-US',
                                                { month: 'short' },
                                            );
                                        }}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<InventoryTooltip />}
                                    />
                                    <ChartLegend
                                        content={<ChartLegendContent />}
                                    />
                                    <defs>
                                        {(
                                            ['new', 'used', 'other'] as const
                                        ).map((cond) => (
                                            <linearGradient
                                                key={cond}
                                                id={`fillInv${cond}`}
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor={`var(--color-${cond})`}
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor={`var(--color-${cond})`}
                                                    stopOpacity={0.1}
                                                />
                                            </linearGradient>
                                        ))}
                                    </defs>
                                    {(['new', 'used', 'other'] as const).map(
                                        (cond) => (
                                            <Area
                                                key={cond}
                                                dataKey={cond}
                                                type="natural"
                                                fill={`url(#fillInv${cond})`}
                                                fillOpacity={0.4}
                                                stroke={`var(--color-${cond})`}
                                                stackId="a"
                                            />
                                        ),
                                    )}
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex items-center gap-2 leading-none font-medium">
                                {stats.inventory_trend.reduce(
                                    (s, d) => s + d.new + d.used + d.other,
                                    0,
                                )}{' '}
                                total listings added{' '}
                                <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="leading-none text-muted-foreground">
                                Last 6 months
                            </div>
                        </CardFooter>
                    </Card>
                    <PieChartCard
                        data={stats.inventory_by_condition}
                        config={conditionConfig}
                        colors={conditionPieColors}
                        title="Inventory by Condition"
                        icon={Car}
                    />
                </div>

                <div className="grid gap-6 lg:grid-cols-[70%_30%]">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Trend</CardTitle>
                            <CardDescription>
                                Showing total revenue for the last 6 months
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={revenueConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={stats.revenue_trend}
                                    margin={{ left: 12, right: 12 }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => {
                                            const [y, m] = value.split('-');
                                            const date = new Date(
                                                Number(y),
                                                Number(m) - 1,
                                            );

                                            return date.toLocaleDateString(
                                                'en-US',
                                                { month: 'short' },
                                            );
                                        }}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<RevenueTooltip />}
                                    />
                                    <ChartLegend
                                        content={<ChartLegendContent />}
                                    />
                                    <defs>
                                        {(
                                            [
                                                'pending',
                                                'confirmed',
                                                'processing',
                                                'completed',
                                                'cancelled',
                                                'refunded',
                                            ] as const
                                        ).map((status) => (
                                            <linearGradient
                                                key={status}
                                                id={`fill${status}`}
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor={`var(--color-${status})`}
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor={`var(--color-${status})`}
                                                    stopOpacity={0.1}
                                                />
                                            </linearGradient>
                                        ))}
                                    </defs>
                                    {(
                                        [
                                            'pending',
                                            'confirmed',
                                            'processing',
                                            'completed',
                                            'cancelled',
                                            'refunded',
                                        ] as const
                                    ).map((status) => (
                                        <Area
                                            key={status}
                                            dataKey={status}
                                            type="natural"
                                            fill={`url(#fill${status})`}
                                            fillOpacity={0.4}
                                            stroke={`var(--color-${status})`}
                                            stackId="a"
                                        />
                                    ))}
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex items-center gap-2 leading-none font-medium">
                                Total revenue {formatCurrency(totalRevenue)}{' '}
                                <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="leading-none text-muted-foreground">
                                Last 6 months
                            </div>
                        </CardFooter>
                    </Card>
                    <PieChartCard
                        data={stats.order_status_breakdown.map((d) => ({
                            name: d.status,
                            value: d.count,
                        }))}
                        config={orderStatusConfig}
                        colors={orderStatusPieColors}
                        title="Order Status"
                        icon={BarChart3}
                    />
                </div>
                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="shadow-sm lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-base">
                                Recent Orders
                            </CardTitle>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={admin.orders.index()}>
                                    View All{' '}
                                    <ArrowRight className="ml-1 size-3" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {stats.recent_orders.length === 0 ? (
                                <div className="py-8 text-center">
                                    <ShoppingCart className="mx-auto size-8 text-muted-foreground/40" />
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        No orders yet.
                                    </p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Order #</TableHead>
                                            <TableHead>Buyer</TableHead>
                                            <TableHead>Item</TableHead>
                                            <TableHead className="text-right">
                                                Total
                                            </TableHead>
                                            <TableHead className="text-center">
                                                Status
                                            </TableHead>
                                            <TableHead>Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {stats.recent_orders.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-mono text-xs">
                                                    {order.order_number}
                                                </TableCell>
                                                <TableCell>
                                                    {order.buyer_name}
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {order.item}
                                                </TableCell>
                                                <TableCell className="text-right font-medium">
                                                    {formatCurrency(
                                                        order.total,
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge
                                                        variant={
                                                            orderStatusVariant[
                                                                order.status
                                                            ] ?? 'secondary'
                                                        }
                                                        className="capitalize"
                                                    >
                                                        {order.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {order.placed_at
                                                        ? new Date(
                                                              order.placed_at,
                                                          ).toLocaleDateString()
                                                        : '-'}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Trophy className="size-4" /> Top Sellers
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {stats.top_sellers.length === 0 ? (
                                <div className="py-8 text-center">
                                    <Trophy className="mx-auto size-8 text-muted-foreground/40" />
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        No seller data yet.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {stats.top_sellers.map((seller, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between border-b pb-2 last:border-0"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
                                                    {i + 1}
                                                </span>
                                                <span className="text-sm font-medium">
                                                    {seller.seller_name}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold">
                                                    {formatCurrency(
                                                        seller.total_revenue,
                                                    )}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {seller.total_orders} orders
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: admin.dashboard() }],
};
