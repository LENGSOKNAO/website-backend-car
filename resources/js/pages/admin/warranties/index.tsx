import { Head, Link } from '@inertiajs/react';
import { TableActions } from '@/components/table-actions';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import admin from '@/routes/admin';

interface Warranty {
    id: string;
    order: { id: string; order_number: string } | null;
    listing: { id: string; make: { id: string; name: string }; model: { id: string; name: string }; year: number } | null;
    type: string;
    name: string;
    duration_months: number | null;
    duration_miles: number | null;
    price: string;
    start_date: string | null;
    end_date: string | null;
    status: string;
    created_at: string;
}

interface PaginatedWarranties {
    data: Warranty[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

const statusColors: Record<string, string> = {
    active: 'text-green-700 bg-green-50',
    expired: 'text-gray-700 bg-gray-50',
    pending: 'text-yellow-700 bg-yellow-50',
    cancelled: 'text-red-700 bg-red-50',
};

export default function WarrantyIndex({ warranties }: { warranties: PaginatedWarranties }) {
    return (
        <>
            <Head title="Warranties" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Warranties</h1>
                        <p className="text-sm text-muted-foreground">Manage vehicle warranties</p>
                    </div>
                </div>
                <Table className="w-full text-sm">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Order</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Vehicle</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Type</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Duration</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Price</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Status</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Dates</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {warranties.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                    No warranties found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            warranties.data.map((w) => (
                                <TableRow key={w.id}>
                                    <TableCell className="font-mono text-xs">{w.order?.order_number ?? '-'}</TableCell>
                                    <TableCell>
                                        {w.listing ? `${w.listing.make.name} ${w.listing.model.name} (${w.listing.year})` : '-'}
                                    </TableCell>
                                    <TableCell className="capitalize">{w.type}</TableCell>
                                    <TableCell>
                                        {w.duration_months ? `${w.duration_months} mo` : ''}
                                        {w.duration_months && w.duration_miles ? ' / ' : ''}
                                        {w.duration_miles ? `${Number(w.duration_miles).toLocaleString()} mi` : '-'}
                                    </TableCell>
                                    <TableCell>${Number(w.price).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold ${statusColors[w.status] ?? 'text-gray-700 bg-gray-50'}`}>
                                            {w.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-xs">
                                        {w.start_date ? new Date(w.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                                        {' - '}
                                        {w.end_date ? new Date(w.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                                    </TableCell>
                                    <TableCell>
                                        <TableActions
                                            actions={[
                                                { label: 'View', href: admin.warranties.show(w.id) },
                                            ]}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {warranties.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing {warranties.from} to {warranties.to} of {warranties.total}
                        </p>
                        <div className="flex gap-1">
                            {warranties.links.map((link, i) => (
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
            </div>
        </>
    );
}

WarrantyIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Warranties', href: admin.warranties.index() },
    ],
};
