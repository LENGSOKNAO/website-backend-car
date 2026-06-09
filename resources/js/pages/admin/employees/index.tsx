import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Search, Users } from 'lucide-react';
import { TableActions } from '@/components/table-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import admin from '@/routes/admin';
import type { User } from '@/types';

interface PaginatedEmployees {
    data: User[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

const roleBadgeVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'super-admin': 'destructive',
    admin: 'default',
    staff: 'secondary',
};

export default function EmployeeIndex({ employees, search }: { employees: PaginatedEmployees; search?: string }) {
    const { url } = usePage();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const params = new URLSearchParams(window.location.search);

        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }

        params.delete('page');
        router.get(admin.employees.index().url + '?' + params.toString(), {}, { preserveState: true, replace: true });
    };

    const handleDelete = (employee: User) => {
        if (confirm(`Remove employee "${employee.name}" from staff?`)) {
            router.delete(admin.employees.destroy(employee.id).url);
        }
    };

    return (
        <>
            <Head title="Staff Management" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Staff Management</h1>
                        <p className="text-sm text-muted-foreground">Manage your dealership team members</p>
                    </div>
                    <Button asChild>
                        <Link href={admin.employees.create()}>
                            <Plus className="size-4 mr-1" /> Add Staff
                        </Link>
                    </Button>
                </div>
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>All Employees</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Search employees..."
                                defaultValue={search ?? ''}
                                onChange={handleSearch}
                                className="pl-8"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            {search ? 'No employees match your search.' : 'No staff members yet. Add your first employee.'}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    employees.data.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
                                                        {employee.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    {employee.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{employee.email}</TableCell>
                                            <TableCell>
                                                <Badge variant={roleBadgeVariant[employee.roles?.[0]?.name ?? ''] ?? 'secondary'}>
                                                    {employee.roles?.[0]?.name ?? 'No role'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {new Date(employee.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <TableActions
                                                    actions={[
                                                        { label: 'View', href: admin.employees.show(employee.id) },
                                                        { label: 'Edit', href: admin.employees.edit(employee.id) },
                                                        {
                                                            label: 'Remove',
                                                            onClick: () => handleDelete(employee),
                                                            destructive: true,
                                                        },
                                                    ]}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        {employees.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {employees.from} to {employees.to} of {employees.total}
                                </p>
                                <div className="flex gap-1">
                                    {employees.links.map((link, i) => (
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
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

EmployeeIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Staff', href: admin.employees.index() },
    ],
};
