import { Head, router, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { TableActions } from '@/components/table-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import admin from '@/routes/admin';

interface Make {
    id: string;
    name: string;
    country: string | null;
    models_count?: number;
}

export default function MakeIndex({ makes }: { makes: any }) {
    const [editingMake, setEditingMake] = useState<Make | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        country: '',
    });

    const openCreate = () => {
        reset();
        setEditingMake(null);
        setDialogOpen(true);
    };

    const openEdit = (make: Make) => {
        setData({ name: make.name, country: make.country ?? '' });
        setEditingMake(make);
        setDialogOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingMake) {
            put(admin.makes.update(editingMake.id).url, {
                onSuccess: () => {
 setDialogOpen(false); reset(); 
},
            });
        } else {
            post(admin.makes.store().url, {
                onSuccess: () => {
 setDialogOpen(false); reset(); 
},
            });
        }
    };

    const handleDelete = (make: Make) => {
        if (confirm(`Delete make "${make.name}"? This will also delete all associated models.`)) {
            router.delete(admin.makes.destroy(make.id).url);
        }
    };

    return (
        <>
            <Head title="Makes" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Makes</h1>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreate}>
                                <Plus className="size-4" /> Add Make
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingMake ? 'Edit Make' : 'Create Make'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="e.g. Toyota" />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" value={data.country} onChange={(e) => setData('country', e.target.value)} placeholder="e.g. Japan" />
                                    <InputError message={errors.country} />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                                    <Button type="submit" disabled={processing}>
                                        {editingMake ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>All Makes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Country</TableHead>
                                    <TableHead>Models</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {makes.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                            No makes yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    makes.data.map((make: Make) => (
                                        <TableRow key={make.id}>
                                            <TableCell className="font-medium">{make.name}</TableCell>
                                            <TableCell>{make.country ?? '-'}</TableCell>
                                            <TableCell>{make.models_count}</TableCell>
                                            <TableCell>
                                                <TableActions
                                                    actions={[
                                                        { label: 'Edit', onClick: () => openEdit(make) },
                                                        { label: 'Delete', onClick: () => handleDelete(make), destructive: true },
                                                    ]}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

MakeIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Makes', href: admin.makes.index() },
    ],
};
