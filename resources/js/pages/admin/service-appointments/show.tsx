import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/routes/admin';

interface ServiceAppointmentDetail {
    id: string;
    customer: { id: string; full_name: string; email: string | null; phone: string | null } | null;
    listing: { id: string; make: { id: string; name: string }; model: { id: string; name: string }; year: number } | null;
    assigned_to: { id: string; name: string } | null;
    service_type: string;
    description: string | null;
    scheduled_date: string;
    scheduled_time: string | null;
    mileage: number | null;
    status: string;
    technician_notes: string | null;
    cost: string | null;
    completed_at: string | null;
    created_at: string;
    updated_at: string;
}

const statusColors: Record<string, string> = {
    scheduled: 'text-blue-700 bg-blue-50',
    in_progress: 'text-amber-700 bg-amber-50',
    completed: 'text-green-700 bg-green-50',
    cancelled: 'text-red-700 bg-red-50',
    no_show: 'text-gray-700 bg-gray-50',
};

export default function ServiceAppointmentShow({ service_appointment: serviceAppointment }: { service_appointment: ServiceAppointmentDetail }) {
    const { data, setData, put, processing } = useForm({
        status: serviceAppointment.status,
        scheduled_date: serviceAppointment.scheduled_date?.split('T')[0] ?? '',
        technician_notes: serviceAppointment.technician_notes ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.serviceAppointments.update(serviceAppointment.id).url);
    };

    return (
        <>
            <Head title={`Service - ${serviceAppointment.customer?.full_name ?? 'Appointment'}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 max-w-2xl">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={admin.serviceAppointments.index()}>
                            <ArrowLeft className="size-5" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">{serviceAppointment.customer?.full_name ?? 'Appointment'}</h1>
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold ${statusColors[serviceAppointment.status] ?? 'text-gray-700 bg-gray-50'}`}>
                        {serviceAppointment.status.replace(/_/g, ' ')}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Customer</p>
                        <p className="mt-0.5 text-sm font-medium">{serviceAppointment.customer?.full_name ?? '-'}</p>
                        {serviceAppointment.customer?.email && <p className="text-xs text-muted-foreground">{serviceAppointment.customer.email}</p>}
                        {serviceAppointment.customer?.phone && <p className="text-xs text-muted-foreground">{serviceAppointment.customer.phone}</p>}
                    </div>
                    {serviceAppointment.listing && (
                        <div>
                            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Vehicle</p>
                            <p className="mt-0.5 text-sm font-medium">
                                {serviceAppointment.listing.make.name} {serviceAppointment.listing.model.name} ({serviceAppointment.listing.year})
                            </p>
                        </div>
                    )}
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Service Type</p>
                        <p className="mt-0.5 text-sm capitalize">{serviceAppointment.service_type}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Scheduled Date</p>
                        <p className="mt-0.5 text-sm">
                            {new Date(serviceAppointment.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                    {serviceAppointment.scheduled_time && (
                        <div>
                            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Scheduled Time</p>
                            <p className="mt-0.5 text-sm">{serviceAppointment.scheduled_time}</p>
                        </div>
                    )}
                    {serviceAppointment.mileage && (
                        <div>
                            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Mileage</p>
                            <p className="mt-0.5 text-sm">{Number(serviceAppointment.mileage).toLocaleString()} mi</p>
                        </div>
                    )}
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Assigned To</p>
                        <p className="mt-0.5 text-sm">{serviceAppointment.assigned_to?.name ?? '-'}</p>
                    </div>
                    {serviceAppointment.cost && (
                        <div>
                            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Cost</p>
                            <p className="mt-0.5 text-sm">${Number(serviceAppointment.cost).toLocaleString()}</p>
                        </div>
                    )}
                    {serviceAppointment.completed_at && (
                        <div>
                            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Completed At</p>
                            <p className="mt-0.5 text-sm">
                                {new Date(serviceAppointment.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    )}
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Created</p>
                        <p className="mt-0.5 text-sm">
                            {new Date(serviceAppointment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </div>

                {serviceAppointment.description && (
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Description</p>
                        <p className="mt-0.5 text-sm whitespace-pre-wrap text-muted-foreground">{serviceAppointment.description}</p>
                    </div>
                )}

                {serviceAppointment.technician_notes && (
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Technician Notes</p>
                        <p className="mt-0.5 text-sm whitespace-pre-wrap text-muted-foreground">{serviceAppointment.technician_notes}</p>
                    </div>
                )}

                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">Update Appointment</h2>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="scheduled">Scheduled</SelectItem>
                                        <SelectItem value="in_progress">In Progress</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                        <SelectItem value="no_show">No Show</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="scheduled_date">Scheduled Date</Label>
                                <Input
                                    id="scheduled_date"
                                    type="date"
                                    value={data.scheduled_date}
                                    onChange={(e) => setData('scheduled_date', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="technician_notes">Technician Notes</Label>
                            <Textarea id="technician_notes" value={data.technician_notes} onChange={(e) => setData('technician_notes', e.target.value)} rows={4} />
                        </div>
                        <Button type="submit" disabled={processing}>Update Appointment</Button>
                    </form>
                </div>
            </div>
        </>
    );
}

ServiceAppointmentShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Service Appointments', href: admin.serviceAppointments.index() },
        { title: 'Detail', href: '' },
    ],
};
