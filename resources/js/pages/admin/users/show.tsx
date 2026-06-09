import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Mail, Phone, Calendar, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import type { User } from '@/types';

export default function UserShow({ user }: { user: User }) {
    return (
        <>
            <Head title={`Customer: ${user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={admin.users.index()}>
                            <ArrowLeft className="size-4 mr-1" /> Back
                        </Link>
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>{user.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="size-4 text-muted-foreground" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="size-4 text-muted-foreground" />
                                <span>{user.phone ?? '—'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="size-4 text-muted-foreground" />
                                <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                            </div>
                            {user.location && (
                                <div className="flex items-center gap-3">
                                    <UserIcon className="size-4 text-muted-foreground" />
                                    <span>{user.location}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

UserShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Customers', href: admin.users.index() },
        { title: 'View', href: '' },
    ],
};
