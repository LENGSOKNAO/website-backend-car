import { Head, router, useForm } from '@inertiajs/react';
import { Search, Plus, Car, Layers } from 'lucide-react';
import { useState } from 'react';
import admin from '@/routes/admin';
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

interface Make {
    id: string;
    name: string;
    country: string | null;
    models_count?: number;
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

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

export default function MakesModelsIndex({ makes, models, allMakes, filters }: {
    makes: PaginatedData<Make>;
    models: PaginatedData<CarModel>;
    allMakes: Make[];
    filters: { make_search?: string; model_search?: string; make_id?: string; tab?: string };
}) {
    const currentTab = filters?.tab || 'makes';
    const [editingMake, setEditingMake] = useState<Make | null>(null);
    const [editingModel, setEditingModel] = useState<CarModel | null>(null);
    const [makeDialogOpen, setMakeDialogOpen] = useState(false);
    const [modelDialogOpen, setModelDialogOpen] = useState(false);
    const [modelMakeFilter, setModelMakeFilter] = useState(filters?.make_id || '');

    const makeForm = useForm({ name: '', country: '' });
    const modelForm = useForm({ make_id: '', name: '', start_year: '', end_year: '' });

    const switchTab = (tab: string) => {
        router.get('/admin/makes-models', { ...filters, tab }, { preserveState: true, replace: true });
    };

    const handleMakeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get('/admin/makes-models', { ...filters, make_search: e.target.value, tab: 'makes' }, { preserveState: true, replace: true });
    };

    const handleModelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get('/admin/makes-models', { ...filters, model_search: e.target.value, tab: 'models' }, { preserveState: true, replace: true });
    };

    const handleModelMakeFilter = (value: string) => {
        setModelMakeFilter(value);
        router.get('/admin/makes-models', { ...filters, make_id: value, tab: 'models' }, { preserveState: true, replace: true });
    };

    const openCreateMake = () => {
        makeForm.reset();
        setEditingMake(null);
        setMakeDialogOpen(true);
    };

    const openEditMake = (make: Make) => {
        makeForm.setData({ name: make.name, country: make.country ?? '' });
        setEditingMake(make);
        setMakeDialogOpen(true);
    };

    const submitMake = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingMake) {
            makeForm.put('/admin/makes/' + editingMake.id, {
                onSuccess: () => {
 setMakeDialogOpen(false); makeForm.reset(); 
},
            });
        } else {
            makeForm.post('/admin/makes', {
                onSuccess: () => {
 setMakeDialogOpen(false); makeForm.reset(); 
},
            });
        }
    };

    const deleteMake = (make: Make) => {
        if (confirm(`Delete make "${make.name}"? This will also delete all associated models.`)) {
            router.delete('/admin/makes/' + make.id);
        }
    };

    const openCreateModel = () => {
        modelForm.reset();
        setEditingModel(null);
        setModelDialogOpen(true);
    };

    const openEditModel = (model: CarModel) => {
        modelForm.setData({
            make_id: model.make_id,
            name: model.name,
            start_year: model.start_year?.toString() ?? '',
            end_year: model.end_year?.toString() ?? '',
        });
        setEditingModel(model);
        setModelDialogOpen(true);
    };

    const submitModel = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingModel) {
            modelForm.put('/admin/models/' + editingModel.id, {
                onSuccess: () => {
 setModelDialogOpen(false); modelForm.reset(); 
},
            });
        } else {
            modelForm.post('/admin/models', {
                onSuccess: () => {
 setModelDialogOpen(false); modelForm.reset(); 
},
            });
        }
    };

    const deleteModel = (model: CarModel) => {
        if (confirm(`Delete model "${model.name}"?`)) {
            router.delete('/admin/models/' + model.id);
        }
    };

    const paginate = (link: { url: string | null; label: string; active: boolean }, tab: string) => {
        if (link.url) {
            const url = new URL(link.url, window.location.origin);
            const page = url.searchParams.get('page') || '1';
            router.get('/admin/makes-models', { ...filters, page, tab }, { preserveState: true, replace: true });
        }
    };

    const activeData = currentTab === 'makes' ? makes : models;

    return (
        <>
            <Head title={currentTab === 'makes' ? 'Makes' : 'Models'} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {currentTab === 'makes' ? 'Makes & Models' : 'Makes & Models'}
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            {currentTab === 'makes' ? 'Manage vehicle makes' : 'Manage vehicle models'}
                        </p>
                    </div>
                    <Dialog open={currentTab === 'makes' ? makeDialogOpen : modelDialogOpen}
                        onOpenChange={(open) => currentTab === 'makes' ? setMakeDialogOpen(open) : setModelDialogOpen(open)}>
                        <DialogTrigger asChild>
                            <Button onClick={currentTab === 'makes' ? openCreateMake : openCreateModel}>
                                <Plus className="size-4" /> {currentTab === 'makes' ? 'Add Make' : 'Add Model'}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {currentTab === 'makes'
                                        ? (editingMake ? 'Edit Make' : 'Create Make')
                                        : (editingModel ? 'Edit Model' : 'Create Model')}
                                </DialogTitle>
                            </DialogHeader>
                            {currentTab === 'makes' ? (
                                <form onSubmit={submitMake} className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="make_name">Name *</Label>
                                        <Input id="make_name" value={makeForm.data.name} onChange={(e) => makeForm.setData('name', e.target.value)} placeholder="e.g. Toyota" />
                                        <InputError message={makeForm.errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="country">Country</Label>
                                        <Input id="country" value={makeForm.data.country} onChange={(e) => makeForm.setData('country', e.target.value)} placeholder="e.g. Japan" />
                                        <InputError message={makeForm.errors.country} />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button type="button" variant="outline" onClick={() => setMakeDialogOpen(false)}>Cancel</Button>
                                        <Button type="submit" disabled={makeForm.processing}>
                                            {editingMake ? 'Update' : 'Create'}
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={submitModel} className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="model_make_id">Make *</Label>
                                        <Select value={modelForm.data.make_id} onValueChange={(value) => modelForm.setData('make_id', value)}>
                                            <SelectTrigger id="model_make_id">
                                                <SelectValue placeholder="Select make" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {allMakes.map((make) => (
                                                    <SelectItem key={make.id} value={make.id}>{make.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={modelForm.errors.make_id} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="model_name">Name *</Label>
                                        <Input id="model_name" value={modelForm.data.name} onChange={(e) => modelForm.setData('name', e.target.value)} placeholder="e.g. Camry" />
                                        <InputError message={modelForm.errors.name} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="start_year">Start Year</Label>
                                            <Input id="start_year" type="number" value={modelForm.data.start_year} onChange={(e) => modelForm.setData('start_year', e.target.value)} placeholder="e.g. 2010" />
                                            <InputError message={modelForm.errors.start_year} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="end_year">End Year</Label>
                                            <Input id="end_year" type="number" value={modelForm.data.end_year} onChange={(e) => modelForm.setData('end_year', e.target.value)} placeholder="e.g. 2020" />
                                            <InputError message={modelForm.errors.end_year} />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button type="button" variant="outline" onClick={() => setModelDialogOpen(false)}>Cancel</Button>
                                        <Button type="submit" disabled={modelForm.processing}>
                                            {editingModel ? 'Update' : 'Create'}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
                    <button
                        onClick={() => switchTab('makes')}
                        className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                            currentTab === 'makes' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <Car className="size-4" />
                        Makes
                        {makes.total > 0 && <span className="text-xs text-muted-foreground">({makes.total})</span>}
                    </button>
                    <button
                        onClick={() => switchTab('models')}
                        className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                            currentTab === 'models' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <Layers className="size-4" />
                        Models
                        {models.total > 0 && <span className="text-xs text-muted-foreground">({models.total})</span>}
                    </button>
                </div>

                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>{currentTab === 'makes' ? 'All Makes' : 'All Models'}</CardTitle>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="relative max-w-md flex-1">
                                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder={currentTab === 'makes' ? 'Search makes...' : 'Search models...'}
                                        defaultValue={filters?.[currentTab === 'makes' ? 'make_search' : 'model_search'] ?? ''}
                                        onChange={currentTab === 'makes' ? handleMakeSearch : handleModelSearch}
                                        className="h-9 pl-9"
                                    />
                                </div>
                                {currentTab === 'models' && (
                                    <Select value={modelMakeFilter} onValueChange={handleModelMakeFilter}>
                                        <SelectTrigger className="h-9 w-[180px]">
                                            <SelectValue placeholder="All makes" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value=" ">All Makes</SelectItem>
                                            {allMakes.map((make) => (
                                                <SelectItem key={make.id} value={make.id}>{make.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {currentTab === 'makes' ? (
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
                                        makes.data.map((make) => (
                                            <TableRow key={make.id}>
                                                <TableCell className="font-medium">{make.name}</TableCell>
                                                <TableCell>{make.country ?? '-'}</TableCell>
                                                <TableCell>{make.models_count}</TableCell>
                                                <TableCell>
                                                    <TableActions
                                                        actions={[
                                                            { label: 'Edit', onClick: () => openEditMake(make) },
                                                            { label: 'Delete', onClick: () => deleteMake(make), destructive: true },
                                                        ]}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        ) : (
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
                                        models.data.map((model) => (
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
                                                            { label: 'Edit', onClick: () => openEditModel(model) },
                                                            { label: 'Delete', onClick: () => deleteModel(model), destructive: true },
                                                        ]}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        )}
                        {'last_page' in activeData && activeData.last_page > 1 && (
                            <div className="mt-4 flex flex-col items-center justify-between gap-3 pt-4 border-t sm:flex-row">
                                <p className="order-2 text-sm text-muted-foreground sm:order-1">
                                    Showing <span className="font-medium">{activeData.from}</span> to <span className="font-medium">{activeData.to}</span> of <span className="font-medium">{activeData.total}</span> {currentTab === 'makes' ? 'makes' : 'models'}
                                </p>
                                <div className="order-1 flex items-center gap-1 sm:order-2">
                                    {activeData.links.filter((l) => !l.label.toLowerCase().includes('previous') && !l.label.toLowerCase().includes('next')).map((link, i) => (
                                        <Button key={i} variant={link.active ? 'default' : 'outline'} size="sm" disabled={!link.url} onClick={() => paginate(link, currentTab)}>
                                            <span dangerouslySetInnerHTML={{ __html: link.label.replace(/&laquo;|&raquo;/g, '') }} />
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

MakesModelsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Makes & Models', href: admin.makesModels.index() },
    ],
};
