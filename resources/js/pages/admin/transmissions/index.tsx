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

interface Transmission {
    id: string;
    name: string;
}

export default function TransmissionIndex({ transmissions }: { transmissions: any }) {
    const [editing, setEditing] = useState<Transmission | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({ name: '' });

    const openCreate = () => {
 reset(); setEditing(null); setDialogOpen(true); 
};
    const openEdit = (item: Transmission) => {
 setData({ name: item.name }); setEditing(item); setDialogOpen(true); 
};

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const opts = { onSuccess: () => {
 setDialogOpen(false); reset(); 
} };

        if (editing) {
            put(admin.transmissions.update(editing.id).url, opts);
        } else {
            post(admin.transmissions.store().url, opts);
        }
    };

    const handleDelete = (item: Transmission) => {
        if (confirm(`Delete transmission "${item.name}"?`)) {
            router.delete(admin.transmissions.destroy(item.id).url);
        }
    };

    return (
        <>
            <Head title="Transmissions" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Transmissions</h1>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreate}><Plus className="size-4" /> Add Transmission</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>{editing ? 'Edit Transmission' : 'Create Transmission'}</DialogTitle></DialogHeader>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="e.g. Automatic, Manual, CVT" />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                                    <Button type="submit" disabled={processing}>{editing ? 'Update' : 'Create'}</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <Card>
                    <CardHeader><CardTitle>All Transmissions</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transmissions.data.length === 0 ? (
                                    <TableRow><TableCell colSpan={2} className="text-center py-8 text-muted-foreground">No transmissions yet.</TableCell></TableRow>
                                ) : (
                                    transmissions.data.map((item: Transmission) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>
                                                <TableActions actions={[
                                                    { label: 'Edit', onClick: () => openEdit(item) },
                                                    { label: 'Delete', onClick: () => handleDelete(item), destructive: true },
                                                ]} />
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

TransmissionIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Transmissions', href: admin.transmissions.index() },
    ],
};
