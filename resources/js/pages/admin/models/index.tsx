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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
}

interface CarModel {
    id: string;
    make_id: string;
    name: string;
    start_year: number | null;
    end_year: number | null;
    listings_count?: number;
    make?: Make;
}

export default function ModelIndex({ models, makes }: { models: any; makes: Make[] }) {
    const [editingModel, setEditingModel] = useState<CarModel | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        make_id: '',
        name: '',
        start_year: '',
        end_year: '',
    });

    const openCreate = () => {
        reset();
        setEditingModel(null);
        setDialogOpen(true);
    };

    const openEdit = (model: CarModel) => {
        setData({
            make_id: model.make_id,
            name: model.name,
            start_year: model.start_year?.toString() ?? '',
            end_year: model.end_year?.toString() ?? '',
        });
        setEditingModel(model);
        setDialogOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingModel) {
            put(admin.models.update(editingModel.id).url, {
                onSuccess: () => {
 setDialogOpen(false); reset(); 
},
            });
        } else {
            post(admin.models.store().url, {
                onSuccess: () => {
 setDialogOpen(false); reset(); 
},
            });
        }
    };

    const handleDelete = (model: CarModel) => {
        if (confirm(`Delete model "${model.name}"?`)) {
            router.delete(admin.models.destroy(model.id).url);
        }
    };

    return (
        <>
            <Head title="Models" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Models</h1>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreate}>
                                <Plus className="size-4" /> Add Model
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingModel ? 'Edit Model' : 'Create Model'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="make_id">Make *</Label>
                                    <Select value={data.make_id} onValueChange={(value) => setData('make_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select make" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {makes.map((make) => (
                                                <SelectItem key={make.id} value={make.id}>{make.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.make_id} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name *</Label>
                                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="e.g. Camry" />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="start_year">Start Year</Label>
                                        <Input id="start_year" type="number" value={data.start_year} onChange={(e) => setData('start_year', e.target.value)} placeholder="e.g. 2010" />
                                        <InputError message={errors.start_year} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="end_year">End Year</Label>
                                        <Input id="end_year" type="number" value={data.end_year} onChange={(e) => setData('end_year', e.target.value)} placeholder="e.g. 2020" />
                                        <InputError message={errors.end_year} />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                                    <Button type="submit" disabled={processing}>
                                        {editingModel ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>All Models</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Make</TableHead>
                                    <TableHead>Years</TableHead>
                                    <TableHead>Listings</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {models.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            No models yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    models.data.map((model: CarModel) => (
                                        <TableRow key={model.id}>
                                            <TableCell className="font-medium">{model.name}</TableCell>
                                            <TableCell>{model.make?.name ?? '-'}</TableCell>
                                            <TableCell>
                                                {model.start_year || model.end_year
                                                    ? `${model.start_year ?? '?'} - ${model.end_year ?? '?'}`
                                                    : '-'}
                                            </TableCell>
                                            <TableCell>{model.listings_count}</TableCell>
                                            <TableCell>
                                                <TableActions
                                                    actions={[
                                                        { label: 'Edit', onClick: () => openEdit(model) },
                                                        { label: 'Delete', onClick: () => handleDelete(model), destructive: true },
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

ModelIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Models', href: admin.models.index() },
    ],
};
