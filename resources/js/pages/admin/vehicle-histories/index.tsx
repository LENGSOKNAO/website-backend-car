import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
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

interface VehicleHistory {
    id: string;
    report_type: string;
    title: string;
    report_date: string;
    listing: { id: string; make: { id: string; name: string }; model: { id: string; name: string }; year: number } | null;
    created_by: { id: string; name: string } | null;
    created_at: string;
}

interface PaginatedVehicleHistories {
    data: VehicleHistory[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

const reportTypeColors: Record<string, string> = {
    inspection: 'text-blue-700 bg-blue-50',
    carfax: 'text-green-700 bg-green-50',
    autocheck: 'text-purple-700 bg-purple-50',
    service_record: 'text-amber-700 bg-amber-50',
};

export default function VehicleHistoryIndex({ vehicle_histories }: { vehicle_histories: PaginatedVehicleHistories }) {
    return (
        <>
            <Head title="Vehicle Histories" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Vehicle Histories</h1>
                        <p className="text-sm text-muted-foreground">Vehicle history reports and records</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/vehicle-histories/create">
                            <Plus className="size-4 mr-1" /> New Record
                        </Link>
                    </Button>
                </div>
                <Table className="w-full text-sm">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Listing</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Report Type</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Title</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Report Date</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Created By</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vehicle_histories.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                    No vehicle history records yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            vehicle_histories.data.map((vh) => (
                                <TableRow key={vh.id}>
                                    <TableCell className="font-medium">
                                        {vh.listing ? `${vh.listing.make.name} ${vh.listing.model.name} (${vh.listing.year})` : '-'}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${reportTypeColors[vh.report_type] ?? 'text-gray-700 bg-gray-50'}`}>
                                            {vh.report_type.replace(/_/g, ' ')}
                                        </span>
                                    </TableCell>
                                    <TableCell>{vh.title}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(vh.report_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{vh.created_by?.name ?? '-'}</TableCell>
                                    <TableCell>
                                        <TableActions
                                            actions={[
                                                { label: 'View', href: admin.vehicleHistories.show(vh.id) },
                                            ]}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {vehicle_histories.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing {vehicle_histories.from} to {vehicle_histories.to} of {vehicle_histories.total}
                        </p>
                        <div className="flex gap-1">
                            {vehicle_histories.links.map((link, i) => (
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

VehicleHistoryIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Vehicle Histories', href: admin.vehicleHistories.index() },
    ],
};
