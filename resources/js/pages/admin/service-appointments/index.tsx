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

interface ServiceAppointment {
    id: string;
    customer: { id: string; full_name: string } | null;
    listing: { id: string; make: { id: string; name: string }; model: { id: string; name: string }; year: number } | null;
    service_type: string;
    scheduled_date: string;
    status: string;
    assigned_to: { id: string; name: string } | null;
    created_at: string;
}

interface PaginatedAppointments {
    data: ServiceAppointment[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

const statusColors: Record<string, string> = {
    scheduled: 'text-blue-700 bg-blue-50',
    in_progress: 'text-amber-700 bg-amber-50',
    completed: 'text-green-700 bg-green-50',
    cancelled: 'text-red-700 bg-red-50',
    no_show: 'text-gray-700 bg-gray-50',
};

export default function ServiceAppointmentIndex({ service_appointments }: { service_appointments: PaginatedAppointments }) {
    const getVehicle = (sa: ServiceAppointment) => {
        if (!sa.listing) {
return '-';
}

        return `${sa.listing.make.name} ${sa.listing.model.name} (${sa.listing.year})`;
    };

    return (
        <>
            <Head title="Service Appointments" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Service Appointments</h1>
                        <p className="text-sm text-muted-foreground">Manage service department appointments</p>
                    </div>
                </div>
                <Table className="w-full text-sm">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Customer</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Vehicle</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Service Type</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Scheduled Date</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Status</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Assigned To</TableHead>
                            <TableHead className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {service_appointments.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                    No service appointments yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            service_appointments.data.map((sa) => (
                                <TableRow key={sa.id}>
                                    <TableCell className="font-medium">{sa.customer?.full_name ?? '-'}</TableCell>
                                    <TableCell>{getVehicle(sa)}</TableCell>
                                    <TableCell className="capitalize">{sa.service_type}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(sa.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold ${statusColors[sa.status] ?? 'text-gray-700 bg-gray-50'}`}>
                                            {sa.status.replace(/_/g, ' ')}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{sa.assigned_to?.name ?? '-'}</TableCell>
                                    <TableCell>
                                        <TableActions
                                            actions={[
                                                { label: 'View', href: admin.serviceAppointments.show(sa.id) },
                                            ]}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {service_appointments.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing {service_appointments.from} to {service_appointments.to} of {service_appointments.total}
                        </p>
                        <div className="flex gap-1">
                            {service_appointments.links.map((link, i) => (
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

ServiceAppointmentIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Service Appointments', href: admin.serviceAppointments.index() },
    ],
};
