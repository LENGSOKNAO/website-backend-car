import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import admin from '@/routes/admin';

interface VehicleHistoryDetail {
    id: string;
    report_type: string;
    title: string;
    file_url: string | null;
    summary: string | null;
    report_date: string;
    listing: { id: string; make: { id: string; name: string }; model: { id: string; name: string }; year: number } | null;
    created_by: { id: string; name: string } | null;
    created_at: string;
    updated_at: string;
}

const reportTypeColors: Record<string, string> = {
    inspection: 'text-blue-700 bg-blue-50',
    carfax: 'text-green-700 bg-green-50',
    autocheck: 'text-purple-700 bg-purple-50',
    service_record: 'text-amber-700 bg-amber-50',
};

export default function VehicleHistoryShow({ vehicle_history: vehicleHistory }: { vehicle_history: VehicleHistoryDetail }) {
    return (
        <>
            <Head title={vehicleHistory.title} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 max-w-2xl">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={admin.vehicleHistories.index()}>
                            <ArrowLeft className="size-5" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">{vehicleHistory.title}</h1>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Report Type</p>
                        <span className={`mt-0.5 inline-flex items-center px-2 py-0.5 text-xs font-medium ${reportTypeColors[vehicleHistory.report_type] ?? 'text-gray-700 bg-gray-50'}`}>
                            {vehicleHistory.report_type.replace(/_/g, ' ')}
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Title</p>
                        <p className="mt-0.5 text-sm font-medium">{vehicleHistory.title}</p>
                    </div>
                    {vehicleHistory.listing && (
                        <div>
                            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Listing</p>
                            <p className="mt-0.5 text-sm font-medium">
                                {vehicleHistory.listing.make.name} {vehicleHistory.listing.model.name} ({vehicleHistory.listing.year})
                            </p>
                        </div>
                    )}
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Report Date</p>
                        <p className="mt-0.5 text-sm">
                            {new Date(vehicleHistory.report_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Created By</p>
                        <p className="mt-0.5 text-sm">{vehicleHistory.created_by?.name ?? '-'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Created</p>
                        <p className="mt-0.5 text-sm">
                            {new Date(vehicleHistory.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Updated</p>
                        <p className="mt-0.5 text-sm">
                            {new Date(vehicleHistory.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </div>

                {vehicleHistory.file_url && (
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">File URL</p>
                        <p className="mt-0.5 text-sm">
                            <a href={vehicleHistory.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                {vehicleHistory.file_url}
                            </a>
                        </p>
                    </div>
                )}

                {vehicleHistory.summary && (
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Summary</p>
                        <p className="mt-0.5 text-sm whitespace-pre-wrap text-muted-foreground">{vehicleHistory.summary}</p>
                    </div>
                )}
            </div>
        </>
    );
}

VehicleHistoryShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Vehicle Histories', href: admin.vehicleHistories.index() },
        { title: 'Detail', href: '' },
    ],
};
