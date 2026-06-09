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
import admin from '@/routes/admin';

interface WarrantyDetail {
    id: string;
    order: { id: string; order_number: string } | null;
    listing: { id: string; make: { id: string; name: string }; model: { id: string; name: string }; year: number } | null;
    type: string;
    name: string;
    coverage_details: string | null;
    duration_months: number | null;
    duration_miles: number | null;
    price: string;
    start_date: string | null;
    end_date: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}

const statusColors: Record<string, string> = {
    active: 'text-green-700 bg-green-50',
    expired: 'text-gray-700 bg-gray-50',
    pending: 'text-yellow-700 bg-yellow-50',
    cancelled: 'text-red-700 bg-red-50',
};

export default function WarrantyShow({ warranty }: { warranty: WarrantyDetail }) {
    const { data, setData, put, processing } = useForm({
        status: warranty.status,
        coverage_details: warranty.coverage_details ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.warranties.update(warranty.id).url);
    };

    return (
        <>
            <Head title={`Warranty - ${warranty.order?.order_number ?? '#' + warranty.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 max-w-2xl">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={admin.warranties.index()}>
                            <ArrowLeft className="size-5" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">{warranty.name || 'Warranty'}</h1>
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold ${statusColors[warranty.status] ?? 'text-gray-700 bg-gray-50'}`}>
                        {warranty.status}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Type</p>
                        <p className="mt-0.5 text-sm font-medium capitalize">{warranty.type}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Name</p>
                        <p className="mt-0.5 text-sm font-medium">{warranty.name}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Price</p>
                        <p className="mt-0.5 text-sm font-medium">${Number(warranty.price).toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Duration</p>
                        <p className="mt-0.5 text-sm">
                            {warranty.duration_months ? `${warranty.duration_months} months` : '-'}
                            {warranty.duration_miles ? ` / ${Number(warranty.duration_miles).toLocaleString()} mi` : ''}
                        </p>
                    </div>
                    {warranty.order && (
                        <div>
                            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Order</p>
                            <Link href={admin.orders.show(warranty.order.id)} className="mt-0.5 text-sm font-mono text-blue-600 hover:underline">
                                {warranty.order.order_number}
                            </Link>
                        </div>
                    )}
                    {warranty.listing && (
                        <div>
                            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Vehicle</p>
                            <p className="mt-0.5 text-sm">
                                {warranty.listing.make.name} {warranty.listing.model.name} ({warranty.listing.year})
                            </p>
                        </div>
                    )}
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Start Date</p>
                        <p className="mt-0.5 text-sm">
                            {warranty.start_date ? new Date(warranty.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">End Date</p>
                        <p className="mt-0.5 text-sm">
                            {warranty.end_date ? new Date(warranty.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Created</p>
                        <p className="mt-0.5 text-sm">
                            {new Date(warranty.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </div>

                {warranty.coverage_details && (
                    <div>
                        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Coverage Details</p>
                        <p className="mt-0.5 text-sm whitespace-pre-wrap text-muted-foreground">{warranty.coverage_details}</p>
                    </div>
                )}

                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">Update Warranty</h2>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="expired">Expired</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="coverage_details">Coverage Details</Label>
                                <Input id="coverage_details" value={data.coverage_details} onChange={(e) => setData('coverage_details', e.target.value)} />
                            </div>
                        </div>
                        <Button type="submit" disabled={processing}>Update Warranty</Button>
                    </form>
                </div>
            </div>
        </>
    );
}

WarrantyShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Warranties', href: admin.warranties.index() },
        { title: 'Detail', href: '' },
    ],
};
