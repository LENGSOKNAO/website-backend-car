import { useState, useRef } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Image, Plus, Pencil, Trash2, Layout, SlidersHorizontal, RectangleHorizontal, Grid3X3, Square, PanelLeft, PanelRight, Columns3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { BlurImage } from '@/components/blur-image';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import seller from '@/routes/seller';

interface Banner {
    id: string;
    title: string;
    subtitle: string | null;
    tagline: string | null;
    description: string | null;
    image_url: string;
    link_url: string | null;
    button_text: string | null;
    button_url: string | null;
    button_text_2: string | null;
    button_url_2: string | null;
    badge_text: string | null;
    brand_slug: string | null;
    type: string;
    page: string | null;
    sort_order: number;
    is_active: boolean;
    created_at: string;
}

const TYPE_CONFIG: Record<string, { label: string; icon: any; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
    slider: { label: 'Slider', icon: SlidersHorizontal, variant: 'default' },
    banner: { label: 'Banner', icon: RectangleHorizontal, variant: 'secondary' },
    boxTrips: { label: 'Box Trips', icon: Grid3X3, variant: 'outline' },
    boxone: { label: 'Box One', icon: Square, variant: 'outline' },
    boxLeft: { label: 'Box Left', icon: PanelLeft, variant: 'outline' },
    boxRight: { label: 'Box Right', icon: PanelRight, variant: 'outline' },
    boxTen: { label: 'Box Ten', icon: Columns3, variant: 'outline' },
};

const TYPE_OPTIONS = Object.entries(TYPE_CONFIG).map(([value, cfg]) => ({ value, label: cfg.label }));


interface ListingOption {
    id: string;
    label: string;
    price: number | null;
    image: string | null;
}

export default function SellerBanners({ banners, currentType, listings }: { banners: Banner[]; currentType?: string; listings: ListingOption[] }) {
    const { data, setData, post, put, processing, reset, errors } = useForm({
        title: '',
        subtitle: '',
        tagline: '',
        description: '',
        image_url: '',
        button_text: '',
        button_url: '',
        button_text_2: '',
        button_url_2: '',
        badge_text: '',
        type: 'slider',
        is_active: true,
        image: null as File | null,
    });

    const [editId, setEditId] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const openCreate = () => {
        setEditId(null);
        reset();
        setImagePreview(null);
        setDialogOpen(true);
    };

    const openEdit = (banner: Banner) => {
        setEditId(banner.id);
        setData({
            title: banner.title,
            subtitle: banner.subtitle ?? '',
            tagline: banner.tagline ?? '',
            description: banner.description ?? '',
            image_url: banner.image_url,
            link_url: banner.link_url ?? '',
            button_text: banner.button_text ?? '',
            button_url: banner.button_url ?? '',
            button_text_2: banner.button_text_2 ?? '',
            button_url_2: banner.button_url_2 ?? '',
            badge_text: banner.badge_text ?? '',
            type: banner.type,
            is_active: banner.is_active,
            image: null,
        });
        setImagePreview(null);
        setDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(seller.web.update(editId).url, {
                forceFormData: true,
                onSuccess: () => { reset(); setDialogOpen(false); setEditId(null); setImagePreview(null); },
            });
        } else {
            post(seller.web.store().url, {
                forceFormData: true,
                onSuccess: () => { reset(); setDialogOpen(false); setImagePreview(null); },
            });
        }
    };

    const handleDelete = (banner: Banner) => {
        if (confirm(`Delete banner "${banner.title}"?`)) {
            router.delete(seller.web.destroy(banner.id).url);
        }
    };

    const handleTypeFilter = (type: string) => {
        router.get(seller.web.index().url, type ? { type } : {}, { preserveState: true, replace: true });
    };

    const filteredBanners = currentType ? banners.filter(b => b.type === currentType) : banners;

    return (
        <>
            <Head title="Web" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Web</h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">Manage homepage sliders, web, and brand section content</p>
                    </div>
                    <Button onClick={openCreate}>
                        <Plus className="size-4" /> Add Banner
                    </Button>
                </div>

                {/* Type filter tabs/switch */}
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={!currentType ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleTypeFilter('')}
                    >
                        All
                    </Button>
                    {TYPE_OPTIONS.map(({ value, label }) => {
                        const Icon = TYPE_CONFIG[value]?.icon;
                        return (
                            <Button
                                key={value}
                                variant={currentType === value ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleTypeFilter(value)}
                                className="gap-1.5"
                            >
                                {Icon && <Icon className="size-3.5" />}
                                {label}
                            </Button>
                        );
                    })}
                </div>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>{currentType ? `${TYPE_CONFIG[currentType]?.label ?? currentType} Web` : 'All Web'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">Preview</TableHead>
                                    <TableHead>Title</TableHead>
                                    {!currentType && <TableHead>Type</TableHead>}
                                    <TableHead>Description</TableHead>
                                    <TableHead>Link / Button</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredBanners.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={currentType ? 6 : 7} className="py-8 text-center text-muted-foreground">
                                            <Image className="mx-auto mb-2 size-8 opacity-50" />
                                            No {currentType ? TYPE_CONFIG[currentType]?.label?.toLowerCase() : ''} web yet. Add your first web item.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredBanners.map((banner) => (
                                        <TableRow key={banner.id}>
                                            <TableCell>
                                                {banner.image_url ? (
                                                    <BlurImage src={banner.image_url} alt={banner.title} containerClassName="h-10 w-16 rounded" className="rounded" />
                                                ) : (
                                                    <div className="flex h-10 w-16 items-center justify-center rounded bg-muted">
                                                        <Image className="size-4 text-muted-foreground/40" />
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium max-w-[200px] truncate">
                                                {banner.title}
                                                {banner.subtitle && <span className="ml-1 text-xs text-muted-foreground">— {banner.subtitle}</span>}
                                            </TableCell>
                                            {!currentType && (
                                                <TableCell>
                                                    <Badge variant={TYPE_CONFIG[banner.type]?.variant ?? 'outline'} className="capitalize gap-1">
                                                        {banner.type}
                                                    </Badge>
                                                </TableCell>
                                            )}
                                            <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                                                {banner.description ?? '-'}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                <div className="flex flex-col gap-1">
                                                    {banner.button_text && banner.button_url && (
                                                        <a href={banner.button_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                                                            {banner.button_text}
                                                        </a>
                                                    )}
                                                    {banner.button_text_2 && banner.button_url_2 && (
                                                        <a href={banner.button_url_2} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                            {banner.button_text_2}
                                                        </a>
                                                    )}
                                                    {banner.link_url && (
                                                        <a href={banner.link_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:underline truncate max-w-[180px] inline-block text-xs">
                                                            {banner.link_url}
                                                        </a>
                                                    )}
                                                    {!banner.button_url && !banner.button_url_2 && !banner.link_url && (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {banner.is_active ? (
                                                    <Badge variant="default">Active</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Inactive</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Button variant="ghost" size="icon" onClick={() => openEdit(banner)}>
                                                        <Pencil className="size-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(banner)}>
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

            {/* Create/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editId ? 'Edit Banner' : 'New Banner'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                                <InputError message={errors.title} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subtitle">Subtitle</Label>
                                <Input id="subtitle" value={data.subtitle} onChange={(e) => setData('subtitle', e.target.value)} />
                                <InputError message={errors.subtitle} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="tagline">Tagline</Label>
                                <Input id="tagline" value={data.tagline} onChange={(e) => setData('tagline', e.target.value)} placeholder="Short tagline for brand sections" />
                                <InputError message={errors.tagline} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="badge_text">Badge Text</Label>
                                <Input id="badge_text" value={data.badge_text} onChange={(e) => setData('badge_text', e.target.value)} placeholder="Trusted by 10K+ customers" />
                                <InputError message={errors.badge_text} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} rows={2} />
                            <InputError message={errors.description} />
                        </div>

                        <div className="space-y-2">
                            <Label>Image *</Label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="relative flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 transition-colors hover:border-muted-foreground/50"
                            >
                                {(imagePreview || data.image_url) ? (
                                    <BlurImage src={imagePreview ?? data.image_url} alt="Preview" containerClassName="max-h-40 rounded" className="object-contain rounded" />
                                ) : (
                                    <>
                                        <Image className="size-8 text-muted-foreground/50" />
                                        <p className="text-sm text-muted-foreground">Click to upload image</p>
                                    </>
                                )}
                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                const file = e.target.files?.[0];
                                    if (file) {
                                        setData('image', file);
                                        setImagePreview(URL.createObjectURL(file));
                                    }
                                    }}
                                />
                            </div>
                            {data.image_url && !data.image && (
                                <p className="text-xs text-muted-foreground">Leave empty to keep current image</p>
                            )}
                            <InputError message={errors.image} />
                            <InputError message={errors.image_url} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">Type *</Label>
                            <Select value={data.type} onValueChange={(v) => setData('type', v)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {TYPE_OPTIONS.map(({ value, label }) => (
                                        <SelectItem key={value} value={value}>{label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.type} />
                        </div>


                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="button_text">Button 1 Text</Label>
                                <Input id="button_text" value={data.button_text} onChange={(e) => setData('button_text', e.target.value)} placeholder="Order Now, Learn More" />
                                <InputError message={errors.button_text} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="button_url">Button 1 URL</Label>
                                <Select onValueChange={(v) => setData('button_url', v === 'none' ? '' : `/listings/${v}`)}>
                                    <SelectTrigger><SelectValue placeholder="Select a product" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        {listings.map((l) => (
                                            <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.button_url} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="button_text_2">Button 2 Text</Label>
                                <Input id="button_text_2" value={data.button_text_2} onChange={(e) => setData('button_text_2', e.target.value)} placeholder="Browse Models, View Details" />
                                <InputError message={errors.button_text_2} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="button_url_2">Button 2 URL</Label>
                                <Select onValueChange={(v) => setData('button_url_2', v === 'none' ? '' : `/listings/${v}`)}>
                                    <SelectTrigger><SelectValue placeholder="Select a product" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        {listings.map((l) => (
                                            <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.button_url_2} />
                            </div>
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
                            <Button type="submit" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90" disabled={processing}>
                                {processing ? 'Saving...' : (editId ? 'Update Banner' : 'Create Banner')}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

SellerBanners.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Web', href: seller.web.index() },
    ],
};
