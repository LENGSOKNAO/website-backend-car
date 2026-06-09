import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
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

interface ListingOption {
    id: string;
    make: { name: string };
    model: { name: string };
    year: number;
}

export default function VehicleHistoryCreate({ listings }: { listings: ListingOption[] }) {
    const { data, setData, post, processing, errors } = useForm({
        listing_id: '',
        report_type: '',
        title: '',
        file_url: '',
        summary: '',
        report_date: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.vehicleHistories.store().url);
    };

    return (
        <>
            <Head title="New Vehicle History" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">New Vehicle History Record</h1>
                </div>
                <form onSubmit={submit} className="max-w-2xl space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="listing_id">Listing *</Label>
                            <Select value={data.listing_id} onValueChange={(v) => setData('listing_id', v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select listing" />
                                </SelectTrigger>
                                <SelectContent>
                                    {listings.map((listing) => (
                                        <SelectItem key={listing.id} value={listing.id}>
                                            {listing.make.name} {listing.model.name} ({listing.year})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.listing_id} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="report_type">Report Type *</Label>
                            <Select value={data.report_type} onValueChange={(v) => setData('report_type', v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="inspection">Inspection</SelectItem>
                                    <SelectItem value="carfax">Carfax</SelectItem>
                                    <SelectItem value="autocheck">Autocheck</SelectItem>
                                    <SelectItem value="service_record">Service Record</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.report_type} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Report title" />
                            <InputError message={errors.title} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="report_date">Report Date *</Label>
                            <Input id="report_date" type="date" value={data.report_date} onChange={(e) => setData('report_date', e.target.value)} />
                            <InputError message={errors.report_date} />
                        </div>
                        <div className="grid gap-2 col-span-2">
                            <Label htmlFor="file_url">File URL</Label>
                            <Input id="file_url" value={data.file_url} onChange={(e) => setData('file_url', e.target.value)} placeholder="https://" />
                            <InputError message={errors.file_url} />
                        </div>
                        <div className="grid gap-2 col-span-2">
                            <Label htmlFor="summary">Summary</Label>
                            <Textarea id="summary" value={data.summary} onChange={(e) => setData('summary', e.target.value)} rows={4} />
                            <InputError message={errors.summary} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>Create Record</Button>
                        <Button variant="outline" asChild>
                            <Link href={admin.vehicleHistories.index()}>Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

VehicleHistoryCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Vehicle Histories', href: admin.vehicleHistories.index() },
        { title: 'New Record', href: '' },
    ],
};
