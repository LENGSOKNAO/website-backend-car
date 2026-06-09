import { Head, Link, router } from '@inertiajs/react';
import { Search, UserCheck, Car } from 'lucide-react';
import { TableActions } from '@/components/table-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { dashboard } from '@/routes';
import seller from '@/routes/seller';

interface PreOrder {
    id: string;
    listing: { id: string; make: { name: string }; model: { name: string }; year: number; primary_image: { image_url: string } | null } | null;
    make: { id: string; name: string } | null;
    model: { id: string; name: string } | null;
    customer_name: string;
    customer_email: string;
    customer_phone: string | null;
    quantity: number;
    status: string;
    source: string | null;
    notes: string | null;
    customer: { id: string; name: string; email: string } | null;
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

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    pending: { label: 'Pending', variant: 'secondary' },
    confirmed: { label: 'Confirmed', variant: 'default' },
    fulfilled: { label: 'Fulfilled', variant: 'outline' },
    cancelled: { label: 'Cancelled', variant: 'destructive' },
};

export default function SellerPreOrderIndex({ preOrders, filters }: { preOrders: Paginated; filters: { search?: string; status?: string } }) {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get(seller.preOrders.index().url, { ...filters, search: e.target.value }, { preserveState: true, replace: true });
    };
    const handleStatusFilter = (value: string) => {
        router.get(seller.preOrders.index().url, { ...filters, status: value }, { preserveState: true, replace: true });
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

    return (
        <>
            <Head title="Pre-Orders" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Pre-Orders</h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">Pre-orders for your listings</p>
                    </div>
                </div>
                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>All Pre-Orders</CardTitle>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="relative max-w-md flex-1">
                                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input placeholder="Search customer or vehicle..." defaultValue={filters.search ?? ''} onChange={handleSearch} className="h-9 pl-9" />
                                </div>
                                <Select value={filters.status ?? ''} onValueChange={handleStatusFilter}>
                                    <SelectTrigger className="h-9 w-[150px]">
                                        <SelectValue placeholder="All statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value=" ">All Statuses</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="confirmed">Confirmed</SelectItem>
                                        <SelectItem value="fulfilled">Fulfilled</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
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
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {preOrders.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No pre-orders yet.</TableCell>
                                    </TableRow>
                                ) : (
                                    preOrders.data.map((p) => {
                                        const cfg = statusConfig[p.status] ?? { label: p.status, variant: 'outline' as const };

                                        return (
                                            <TableRow key={p.id}>
                                                <TableCell>
                                                    <Link href={seller.preOrders.show(p.id)} className="text-primary hover:underline font-medium">
                                                        {p.customer_name}
                                                    </Link>
                                                    <div className="text-xs text-muted-foreground">{p.customer_email}</div>
                                                    {p.customer_phone && <div className="text-xs text-muted-foreground">{p.customer_phone}</div>}
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
                        {preOrders.last_page > 1 && (
                            <div className="mt-4 flex flex-col items-center justify-between gap-3 pt-4 border-t sm:flex-row">
                                <p className="order-2 text-sm text-muted-foreground sm:order-1">
                                    Showing <span className="font-medium">{preOrders.from}</span> to <span className="font-medium">{preOrders.to}</span> of <span className="font-medium">{preOrders.total}</span> pre-orders
                                </p>
                                <div className="order-1 flex items-center gap-1 sm:order-2">
                                    {preOrders.links.filter((l) => !l.label.toLowerCase().includes('previous') && !l.label.toLowerCase().includes('next')).map((link, i) => (
                                        <Button key={i} variant={link.active ? 'default' : 'outline'} size="sm" disabled={!link.url} asChild={!!link.url}>
                                            {link.url ? <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label.replace(/&laquo;|&raquo;/g, '') }} /> : <span dangerouslySetInnerHTML={{ __html: link.label.replace(/&laquo;|&raquo;/g, '') }} />}
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

SellerPreOrderIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Pre-Orders', href: seller.preOrders.index() },
    ],
};
