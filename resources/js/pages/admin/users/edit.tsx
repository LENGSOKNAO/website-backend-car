import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import admin from '@/routes/admin';
import type { User } from '@/types';

export default function UserEdit({ user }: { user: User }) {
    const { data, setData, put, processing, errors } = useForm({
        full_name: user.name,
        email: user.email,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.users.update(user.id).url);
    };

    return (
        <>
            <Head title="Edit Customer" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Edit Customer</h1>
                </div>
                <Card className="max-w-2xl shadow-sm">
                    <CardHeader>
                        <CardTitle>{user.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            <Badge variant="outline" className="capitalize">Customer</Badge>
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="full_name">Name</Label>
                                <Input id="full_name" value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} />
                                <InputError message={errors.full_name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                <InputError message={errors.email} />
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>Save Changes</Button>
                                <Button variant="outline" asChild>
                                    <Link href={admin.users.index()}>Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

UserEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Customers', href: admin.users.index() },
        { title: 'Edit', href: '' },
    ],
};
