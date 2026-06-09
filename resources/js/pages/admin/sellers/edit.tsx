import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import admin from '@/routes/admin';
import type { User } from '@/types';

export default function SellerEdit({ seller }: { seller: User }) {
    const { data, setData, put, processing, errors } = useForm({
        full_name: seller.name,
        email: seller.email,
        phone: seller.phone ?? '',
        dealer_name: seller.dealer_name ?? '',
        location: seller.location ?? '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.sellers.update(seller.id).url);
    };

    return (
        <>
            <Head title="Edit Seller" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Edit Seller</h1>
                </div>
                <Card className="max-w-2xl shadow-sm">
                    <CardHeader>
                        <CardTitle>{seller.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">Update seller details</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="full_name">Full Name *</Label>
                                    <Input id="full_name" value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} />
                                    <InputError message={errors.full_name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                    <InputError message={errors.phone} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="dealer_name">Dealer Name</Label>
                                    <Input id="dealer_name" value={data.dealer_name} onChange={(e) => setData('dealer_name', e.target.value)} />
                                    <InputError message={errors.dealer_name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" value={data.location} onChange={(e) => setData('location', e.target.value)} />
                                    <InputError message={errors.location} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">New Password</Label>
                                    <Input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Leave blank to keep current" />
                                    <InputError message={errors.password} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirm Password</Label>
                                    <Input id="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>Save Changes</Button>
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

SellerEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Sellers', href: admin.sellers.index() },
        { title: 'Edit', href: '' },
    ],
};
