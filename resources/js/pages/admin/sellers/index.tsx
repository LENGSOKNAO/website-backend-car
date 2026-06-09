import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Search, Store } from 'lucide-react';
import { TableActions } from '@/components/table-actions';
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

interface PaginatedSellers {
    data: User[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

export default function SellerIndex({ sellers, search }: { sellers: PaginatedSellers; search?: string }) {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const params = new URLSearchParams(window.location.search);

        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }

        params.delete('page');
        router.get(admin.sellers.index().url + '?' + params.toString(), {}, { preserveState: true, replace: true });
    };

    const handleDelete = (seller: User) => {
        if (confirm(`Delete seller "${seller.name}"? This will remove all their listings and data.`)) {
            router.delete(admin.sellers.destroy(seller.id).url);
        }
    };

    return (
        <>
            <Head title="Seller Management" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Seller Management</h1>
                        <p className="text-sm text-muted-foreground">Manage dealership sellers and their accounts</p>
                    </div>
                    <Button asChild>
                        <Link href={admin.sellers.create()}>
                            <Plus className="size-4 mr-1" /> Add Seller
                        </Link>
                    </Button>
                </div>
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>All Sellers</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Search sellers..."
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
                                    <TableHead>Dealer Name</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sellers.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            {search ? 'No sellers match your search.' : 'No sellers yet. Add your first seller.'}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    sellers.data.map((seller) => (
                                        <TableRow key={seller.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
                                                        {seller.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    {seller.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{seller.email}</TableCell>
                                            <TableCell>{seller.dealer_name ?? '-'}</TableCell>
                                            <TableCell>{seller.location ?? '-'}</TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {new Date(seller.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <TableActions
                                                    actions={[
                                                        { label: 'View', href: admin.sellers.show(seller.id) },
                                                        { label: 'Edit', href: admin.sellers.edit(seller.id) },
                                                        { label: 'Delete', onClick: () => handleDelete(seller), destructive: true },
                                                    ]}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        {sellers.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {sellers.from} to {sellers.to} of {sellers.total}
                                </p>
                                <div className="flex gap-1">
                                    {sellers.links.map((link, i) => (
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

SellerIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Sellers', href: admin.sellers.index() },
    ],
};
