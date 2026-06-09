import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Mail, Phone, Calendar, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import type { User } from '@/types';

export default function EmployeeShow({ employee }: { employee: User }) {
    return (
        <>
            <Head title={`Staff: ${employee.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={admin.employees.index()}>
                            <ArrowLeft className="size-4 mr-1" /> Back
                        </Link>
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>{employee.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="size-4 text-muted-foreground" />
                                <span>{employee.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="size-4 text-muted-foreground" />
                                <span>{employee.phone ?? '—'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="size-4 text-muted-foreground" />
                                <span>Joined {new Date(employee.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Shield className="size-4 text-muted-foreground" />
                                <Badge variant={employee.roles?.[0]?.name === 'super-admin' ? 'destructive' : 'default'}>
                                    {employee.roles?.[0]?.name ?? 'No role'}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

EmployeeShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Staff', href: admin.employees.index() },
        { title: 'View', href: '' },
    ],
};
