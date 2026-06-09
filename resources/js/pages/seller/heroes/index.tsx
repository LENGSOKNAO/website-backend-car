import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import seller from '@/routes/seller';

interface SubtitleEntry {
    text: string;
    product_id?: string | null;
}

interface Hero {
    id: number;
    title: string;
    subtitle: SubtitleEntry[] | null;
    is_active: boolean;
    sort_order: number;
}

interface ListingOption {
    id: string;
    label: string;
}

export default function SellerHeroes({ heroes, listings }: { heroes: Hero[]; listings: ListingOption[] }) {
    const { data, setData, post, put, processing, reset, errors } = useForm({
        title: '',
        subtitle: [{ text: '', product_id: null }] as SubtitleEntry[],
        is_active: true,
        sort_order: 0,
    });

    const [editId, setEditId] = useState<number | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const openCreate = () => {
        setEditId(null);
        reset();
        setData('subtitle', [{ text: '', product_id: null }]);
        setDialogOpen(true);
    };

    const openEdit = (hero: Hero) => {
        setEditId(hero.id);
        setData({
            title: hero.title,
            subtitle: hero.subtitle?.length ? hero.subtitle : [{ text: '', product_id: null }],
            is_active: hero.is_active,
            sort_order: hero.sort_order,
        });
        setDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...data,
            subtitle: data.subtitle?.filter(s => s.text.trim()) ?? [],
        };
        if (editId) {
            put(seller.heroes.update(editId).url, {
                onSuccess: () => { reset(); setDialogOpen(false); setEditId(null); },
            });
        } else {
            post(seller.heroes.store().url, {
                onSuccess: () => { reset(); setDialogOpen(false); },
            });
        }
    };

    const handleDelete = (hero: Hero) => {
        if (confirm(`Delete hero "${hero.title}"?`)) {
            router.delete(seller.heroes.destroy(hero.id).url);
        }
    };

    const updateText = (idx: number, text: string) => {
        const next = [...data.subtitle];
        next[idx] = { ...next[idx], text };
        setData('subtitle', next);
    };

    const updateProduct = (idx: number, productId: string, label: string) => {
        const next = [...data.subtitle];
        next[idx] = { text: label, product_id: productId };
        setData('subtitle', next);
    };

    const removeLine = (idx: number) => {
        const next = data.subtitle.filter((_, i) => i !== idx);
        setData('subtitle', next.length ? next : [{ text: '', product_id: null }]);
    };

    return (
        <>
            <Head title="Hero Sections" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Hero Sections</h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">Manage homepage text hero content</p>
                    </div>
                    <Button onClick={openCreate}>
                        <Plus className="size-4" /> Add Hero
                    </Button>
                </div>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>All Heroes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-10">Order</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Subtitle Lines</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {heroes.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                                            No heroes yet. Add your first hero section.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    heroes.map((hero) => (
                                        <TableRow key={hero.id}>
                                            <TableCell className="text-muted-foreground">{hero.sort_order}</TableCell>
                                            <TableCell className="font-medium">{hero.title}</TableCell>
                                            <TableCell className="text-sm">
                                                <div className="flex flex-wrap gap-1">
                                                    {hero.subtitle?.map((s, i) => (
                                                        <span key={i} className="inline-flex items-center gap-1">
                                                            {s.product_id && <Link className="size-3 text-primary" />}
                                                            {s.text}
                                                            {i < (hero.subtitle?.length ?? 0) - 1 && <span className="text-muted-foreground">|</span>}
                                                        </span>
                                                    )) ?? '-'}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {hero.is_active ? (
                                                    <Badge variant="default">Active</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Inactive</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Button variant="ghost" size="icon" onClick={() => openEdit(hero)}>
                                                        <Pencil className="size-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(hero)}>
                                                        <Trash2 className="size-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{editId ? 'Edit Hero' : 'New Hero'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                            <InputError message={errors.title} />
                        </div>

                        <div className="space-y-2">
                            <Label>Subtitle Lines</Label>
                            <div className="space-y-2">
                                {data.subtitle?.map((entry, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <Input
                                            value={entry.text}
                                            onChange={(e) => updateText(idx, e.target.value)}
                                            placeholder="Type or pick a product"
                                            className="flex-1"
                                        />
                                        <Select onValueChange={(v) => {
                                            const product = listings.find(l => l.id === v);
                                            if (product) updateProduct(idx, v, product.label);
                                        }}>
                                            <SelectTrigger className="w-44"><SelectValue placeholder="Pick product" /></SelectTrigger>
                                            <SelectContent>
                                                {listings.map((l) => (
                                                    <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {entry.product_id && (
                                            <Badge variant="outline" className="gap-1 whitespace-nowrap">
                                                <Link className="size-3" /> Linked
                                            </Badge>
                                        )}
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeLine(idx)}>
                                            <Trash2 className="size-3" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={() => setData('subtitle', [...data.subtitle, { text: '', product_id: null }])}>
                                    + Add Line
                                </Button>
                            </div>
                            <InputError message={errors.subtitle} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox checked={data.is_active} onCheckedChange={(v) => setData('is_active', v === true)} />
                                Active
                            </Label>
                            <InputError message={errors.is_active} />
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : (editId ? 'Update Hero' : 'Create Hero')}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

SellerHeroes.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Heroes', href: seller.heroes.index() },
    ],
};
