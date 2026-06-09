import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import admin from '@/routes/admin';

export default function SellerCreate() {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        dealer_name: '',
        location: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.sellers.store().url);
    };

    return (
        <>
            <Head title="Add Seller" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Add Seller</h1>
                </div>
                <Card className="max-w-2xl shadow-sm">
                    <CardHeader>
                        <CardTitle>New Seller</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="full_name">Full Name *</Label>
                                    <Input id="full_name" value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} placeholder="John Smith" />
                                    <InputError message={errors.full_name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="seller@dealership.com" />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="+1 (555) 123-4567" />
                                    <InputError message={errors.phone} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="dealer_name">Dealer Name</Label>
                                    <Input id="dealer_name" value={data.dealer_name} onChange={(e) => setData('dealer_name', e.target.value)} placeholder="Premium Auto Sales" />
                                    <InputError message={errors.dealer_name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" value={data.location} onChange={(e) => setData('location', e.target.value)} placeholder="New York, NY" />
                                    <InputError message={errors.location} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password *</Label>
                                    <Input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                                    <InputError message={errors.password} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirm Password *</Label>
                                    <Input id="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>Add Seller</Button>
                                <Button variant="outline" asChild>
                                    <Link href={admin.sellers.index()}>Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

SellerCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Sellers', href: admin.sellers.index() },
        { title: 'Add Seller', href: '' },
    ],
};
