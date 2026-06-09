import { Head, Link, useForm, router } from '@inertiajs/react';
import {
    Car,
    Gauge,
    Fuel,
    MapPin,
    Hash,
    Image as ImageIcon,
    Upload,
    Star,
    Trash2,
} from 'lucide-react';
import { useState, useRef, useCallback, useEffect } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/routes/admin';

interface CarMake {
    id: number;
    name: string;
    models: { id: number; name: string }[];
}

interface Category {
    id: string;
    name: string;
}

interface Option {
    id: string;
    name: string;
}

interface ListingImage {
    id: string;
    image_url: string;
    is_primary: boolean;
    sort_order: number;
}

interface Car {
    id: string;
    seller_id: string;
    make_id: string;
    model_id: string;
    category_id: string | null;
    make: { id: string; name: string };
    model: { id: string; name: string };
    year: number;
    price: string;
    original_price: string | null;
    mileage: string | null;
    fuel_type: string | null;
    transmission: string | null;
    engine_size: string | null;
    color: string | null;
    interior_color: string | null;
    condition: string | null;
    number_of_owners: number | null;
    vin: string | null;
    license_plate: string | null;
    description: string | null;
    location: string | null;
    status: string;
    total: number;
    seller: { id: string; name: string };
    category: { id: string; name: string } | null;
    images: ListingImage[];
    acquisition_cost?: string | null;
    reconditioning_cost?: string | null;
    order_date?: string | null;
    expected_arrival?: string | null;
    actual_arrival?: string | null;
}

interface EditCarFormData {
    make_id: string;
    model_id: string;
    year: string;
    price: string;
    original_price: string;
    mileage: string;
    fuel_type: string;
    transmission: string;
    engine_size: string;
    color: string;
    interior_color: string;
    condition: string;
    number_of_owners: string;
    vin: string;
    license_plate: string;
    description: string;
    location: string;
    category_id: string;
    status: string;
    total: string;
    order_date: string;
    expected_arrival: string;
    actual_arrival: string;
    acquisition_cost: string;
    reconditioning_cost: string;
    _method: string;
    new_images: File[];
    primary_image_id: string;
    primary_new_index: number;
    delete_image_ids: string[];
}

interface NewImagePreview {
    file: File;
    preview: string;
}

export default function AdminCarEdit({
    car,
    makes,
    categories,
    conditions,
    fuelTypes,
    transmissions,
}: {
    car: Car;
    makes: CarMake[];
    categories: Category[];
    conditions: Option[];
    fuelTypes: Option[];
    transmissions: Option[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        make_id: car.make_id,
        model_id: car.model_id,
        year: car.year.toString(),
        price: car.price,
        original_price: car.original_price ?? '',
        mileage: car.mileage ?? '',
        fuel_type: car.fuel_type ?? '',
        transmission: car.transmission ?? '',
        engine_size: car.engine_size ?? '',
        color: car.color ?? '',
        interior_color: car.interior_color ?? '',
        condition: car.condition ?? '',
        number_of_owners: car.number_of_owners?.toString() ?? '',
        vin: car.vin ?? '',
        license_plate: car.license_plate ?? '',
        description: car.description ?? '',
        location: car.location ?? '',
        category_id: car.category_id?.toString() ?? '',
        status: car.status,
        total: car.total?.toString() ?? '0',
        order_date: car.order_date != null ? car.order_date.split('T')[0] : '',
        expected_arrival: car.expected_arrival != null ? car.expected_arrival.split('T')[0] : '',
        actual_arrival: car.actual_arrival ?? '',
        acquisition_cost: car.acquisition_cost ?? '',
        reconditioning_cost: car.reconditioning_cost ?? '',
        _method: 'PUT',
        new_images: [] as File[],
        primary_image_id: car.images.find((img) => img.is_primary)?.id ?? '',
        primary_new_index: -1,
        delete_image_ids: [] as string[],
    });

    const [newPreviews, setNewPreviews] = useState<NewImagePreview[]>([]);
    const [previousTotal, setPreviousTotal] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const lastClickTimestamp = useRef(0);

    // Track previous total when it changes from a positive value
    useEffect(() => {
        if (data.total && parseInt(data.total) > 0) {
            setPreviousTotal(data.total);
        }
    }, [data.total]);

    const existingImages = car.images
        .filter((img) => !data.delete_image_ids.includes(img.id))
        .sort((a, b) => {
            if (a.is_primary) {
return -1;
}

            if (b.is_primary) {
return 1;
}

            return 0;
        });

    const selectedMake = makes.find((m) => m.id.toString() === data.make_id);
    const models = selectedMake?.models ?? [];

    const handleFiles = useCallback(
        (files: FileList | null) => {
            if (!files) {
return;
}

            const newFiles = Array.from(files);
            const previews = newFiles.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }));
            setNewPreviews((prev) => [...prev, ...previews]);
            setData('new_images', [...data.new_images, ...newFiles]);
        },
        [data.new_images, setData],
    );

    const removeNewImage = (index: number) => {
        URL.revokeObjectURL(newPreviews[index].preview);
        setNewPreviews((prev) => prev.filter((_, i) => i !== index));
        setData(
            'new_images',
            data.new_images.filter((_, i) => i !== index),
        );
    };

    const markForDelete = (imageId: string) => {
        if (data.primary_image_id === imageId) {
            const remaining = existingImages.filter(
                (img) => img.id !== imageId,
            );

            if (remaining.length > 0) {
                setData('primary_image_id', remaining[0].id);
            } else {
                setData('primary_image_id', '');
            }
        }

        setData('delete_image_ids', [...data.delete_image_ids, imageId]);
    };

    const undoDelete = (imageId: string) => {
        setData(
            'delete_image_ids',
            data.delete_image_ids.filter((id) => id !== imageId),
        );
    };

    const setPrimary = (imageId: string) => {
        setData('primary_image_id', imageId);
        setData('primary_new_index', -1);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.cars.update(car.id).url, { forceFormData: true });
    };

    return (
        <>
            <Head title={`Edit ${car.make.name} ${car.model.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <Car className="size-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Edit Car</h1>
                        <p className="text-sm text-muted-foreground">
                            {car.make.name} {car.model.name} ({car.year})
                            &mdash; Listed by {car.seller.name}
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="mb-6 flex items-center gap-2">
                                <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
                                    <ImageIcon className="size-4 text-primary" />
                                </div>
                                <h2 className="text-lg font-semibold">
                                    Photos
                                </h2>
                            </div>

                            {existingImages.length > 0 && (
                                <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                    {existingImages.map((img) => (
                                        <div
                                            key={img.id}
                                            className="group relative aspect-[4/3] overflow-hidden rounded-lg border"
                                        >
                                            <img
                                                src={img.image_url}
                                                alt="Car photo"
                                                className="size-full object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-start justify-between bg-black/0 p-1 transition-colors group-hover:bg-black/30">
                                                <Button
                                                    type="button"
                                                    variant={
                                                        data.primary_image_id ===
                                                        img.id
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                    size="icon"
                                                    className="size-6"
                                                    onClick={() =>
                                                        setPrimary(img.id)
                                                    }
                                                >
                                                    <Star
                                                        className={`size-3 ${data.primary_image_id === img.id ? 'fill-current' : ''}`}
                                                    />
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="size-6 opacity-0 transition-opacity group-hover:opacity-100"
                                                    onClick={() =>
                                                        markForDelete(img.id)
                                                    }
                                                >
                                                    <Trash2 className="size-3" />
                                                </Button>
                                            </div>
                                            {data.primary_image_id ===
                                                img.id && (
                                                <span className="absolute bottom-1 left-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                                                    Primary
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {data.delete_image_ids.length > 0 && (
                                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
                                    <p className="text-sm font-medium text-red-700">
                                        Images marked for deletion:
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {data.delete_image_ids.map((id) => {
                                            const img = car.images.find(
                                                (i) => i.id === id,
                                            );

                                            return (
                                                <div
                                                    key={id}
                                                    className="flex items-center gap-2 rounded-md border border-red-200 bg-white px-2 py-1 text-sm"
                                                >
                                                    <span className="text-red-600 line-through">
                                                        {img?.image_url
                                                            .split('/')
                                                            .pop() ?? id}
                                                    </span>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-auto p-0.5 text-xs"
                                                        onClick={() =>
                                                            undoDelete(id)
                                                        }
                                                    >
                                                        Undo
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onClick={() => fileInputRef.current?.click()}
                                className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition-colors hover:border-muted-foreground/50"
                            >
                                <Upload className="size-8 text-muted-foreground" />
                                <p className="text-sm font-medium">
                                    Add more photos
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    drag & drop or click to browse
                                </p>
                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={(e) =>
                                        handleFiles(e.target.files)
                                    }
                                />
                            </div>
                            <InputError message={errors.new_images} />

                            {newPreviews.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                    {newPreviews.map((img, i) => (
                                        <div
                                            key={i}
                                            className="group relative aspect-[4/3] overflow-hidden rounded-lg border"
                                        >
                                            <img
                                                src={img.preview}
                                                alt="New photo"
                                                className="size-full object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-start justify-between bg-black/0 p-1 transition-colors group-hover:bg-black/30">
                                                <Button
                                                    type="button"
                                                    variant={
                                                        data.primary_new_index ===
                                                        i
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                    size="icon"
                                                    className="size-6"
                                                    onClick={() => {
                                                        setData(
                                                            'primary_image_id',
                                                            '',
                                                        );
                                                        setData(
                                                            'primary_new_index',
                                                            data.primary_new_index ===
                                                                i
                                                                ? -1
                                                                : i,
                                                        );
                                                    }}
                                                >
                                                    <Star
                                                        className={`size-3 ${data.primary_new_index === i ? 'fill-current' : ''}`}
                                                    />
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="size-6"
                                                    onClick={() =>
                                                        removeNewImage(i)
                                                    }
                                                >
                                                    <Trash2 className="size-3" />
                                                </Button>
                                            </div>
                                            {data.primary_new_index === i && (
                                                <span className="absolute bottom-1 left-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                                                    Primary
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="mb-6 flex items-center gap-2">
                                <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
                                    <Car className="size-4 text-primary" />
                                </div>
                                <h2 className="text-lg font-semibold">
                                    Basic Information
                                </h2>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="make_id">Make *</Label>
                                    <Select
                                        value={data.make_id}
                                        onValueChange={(value) => {
                                            setData('make_id', value);
                                            setData('model_id', '');
                                        }}
                                    >
                                        <SelectTrigger id="make_id">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {makes.map((make) => (
                                                <SelectItem
                                                    key={make.id}
                                                    value={make.id.toString()}
                                                >
                                                    {make.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.make_id} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="model_id">Model *</Label>
                                    <Select
                                        value={data.model_id}
                                        onValueChange={(value) =>
                                            setData('model_id', value)
                                        }
                                        disabled={!data.make_id}
                                    >
                                        <SelectTrigger id="model_id">
                                            <SelectValue
                                                placeholder={
                                                    data.make_id
                                                        ? 'Select model'
                                                        : 'Choose make first'
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {models.map((model) => (
                                                <SelectItem
                                                    key={model.id}
                                                    value={model.id.toString()}
                                                >
                                                    {model.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.model_id} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="year">Year *</Label>
                                    <Input
                                        id="year"
                                        type="number"
                                        min="1900"
                                        max={new Date().getFullYear() + 1}
                                        value={data.year}
                                        onChange={(e) =>
                                            setData('year', e.target.value)
                                        }
                                    />
                                    <InputError message={errors.year} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="condition">Condition</Label>
                                    <Select value={data.condition} onValueChange={(value) => setData('condition', value)}>
                                        <SelectTrigger id="condition">
                                            <SelectValue placeholder="Select condition" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {conditions.map((c) => (
                                                <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.condition} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price *</Label>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                                            $
                                        </span>
                                        <Input
                                            id="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="pl-7"
                                            placeholder="0.00"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData('price', e.target.value)
                                            }
                                        />
                                    </div>
                                    <InputError message={errors.price} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="original_price">
                                        Original Price (MSRP)
                                    </Label>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                                            $
                                        </span>
                                        <Input
                                            id="original_price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="pl-7"
                                            placeholder="0.00"
                                            value={data.original_price}
                                            onChange={(e) =>
                                                setData(
                                                    'original_price',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <InputError
                                        message={errors.original_price}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="total">
                                        Inventory (Total) *
                                    </Label>
                                    <Input
                                        id="total"
                                        type="number"
                                        min="0"
                                        value={data.total}
                                        onChange={(e) =>
                                            setData('total', e.target.value)
                                        }
                                    />
                                    <div className="flex flex-wrap items-center gap-2 text-xs">
                                        <span className="text-muted-foreground">
                                            {parseInt(data.total || '0') > 0 ? (
                                                <>
                                                    Status:{' '}
                                                    <span className="font-medium text-emerald-600">
                                                        In Stock
                                                    </span>
                                                </>
                                            ) : data.expected_arrival ? (
                                                <>
                                                    Status:{' '}
                                                    <span className="font-medium text-amber-600">
                                                        Coming Soon
                                                    </span>{' '}
                                                    (expected arrival set)
                                                </>
                                            ) : (
                                                <>
                                                    Status:{' '}
                                                    <span className="font-medium text-muted-foreground">
                                                        Out of Stock
                                                    </span>
                                                </>
                                            )}
                                        </span>
                                        <button
                                            type="button"
                                            className="ml-auto font-medium text-amber-600 underline underline-offset-2 hover:text-amber-700"
                                            onClick={() => {
                                                if (data.expected_arrival) {
                                                    // Remove Coming Soon status, restore previous total
                                                    setData('expected_arrival', '');
                                                    setData('total', previousTotal || '0');
                                                } else {
                                                    // Mark as Coming Soon
                                                    setData('total', '0');

                                                    if (!data.expected_arrival) {
                                                        const d = new Date();
                                                        d.setDate(d.getDate() + 14);
                                                        setData(
                                                            'expected_arrival',
                                                            d
                                                                .toISOString()
                                                                .split('T')[0],
                                                        );
                                                    }
                                                }
                                            }}
                                        >
                                            {data.expected_arrival ? 'Remove Coming Soon' : 'Mark as Coming Soon'}
                                        </button>
                                    </div>
                                    <InputError message={errors.total} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="order_date">
                                        Order Date
                                    </Label>
                                    <Input
                                        id="order_date"
                                        type="date"
                                        value={data.order_date}
                                        onChange={(e) =>
                                            setData(
                                                'order_date',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError message={errors.order_date} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="expected_arrival">
                                        Expected Arrival
                                    </Label>
                                    <Input
                                        id="expected_arrival"
                                        type="date"
                                        value={data.expected_arrival}
                                        onChange={(e) =>
                                            setData(
                                                'expected_arrival',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.expected_arrival}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="mb-6 flex items-center gap-2">
                                <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
                                    <Gauge className="size-4 text-primary" />
                                </div>
                                <h2 className="text-lg font-semibold">
                                    Vehicle Specifications
                                </h2>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="grid gap-2">
                                    <Label htmlFor="mileage">Mileage</Label>
                                    <div className="relative">
                                        <Input
                                            id="mileage"
                                            type="number"
                                            min="0"
                                            className="pr-12"
                                            placeholder="0"
                                            value={data.mileage}
                                            onChange={(e) =>
                                                setData(
                                                    'mileage',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground">
                                            miles
                                        </span>
                                    </div>
                                    <InputError message={errors.mileage} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="fuel_type">Fuel Type</Label>
                                    <Select value={data.fuel_type} onValueChange={(value) => setData('fuel_type', value)}>
                                        <SelectTrigger id="fuel_type">
                                            <SelectValue placeholder="Select fuel type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {fuelTypes.map((f) => (
                                                <SelectItem key={f.id} value={f.name}>{f.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.fuel_type} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="transmission">Transmission</Label>
                                    <Select value={data.transmission} onValueChange={(value) => setData('transmission', value)}>
                                        <SelectTrigger id="transmission">
                                            <SelectValue placeholder="Select transmission" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {transmissions.map((t) => (
                                                <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.transmission} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="engine_size">
                                        Engine Size
                                    </Label>
                                    <Input
                                        id="engine_size"
                                        placeholder="e.g. 2.0L I4"
                                        value={data.engine_size}
                                        onChange={(e) =>
                                            setData(
                                                'engine_size',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError message={errors.engine_size} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="color">
                                        Exterior Color
                                    </Label>
                                    <Input
                                        id="color"
                                        placeholder="e.g. White"
                                        value={data.color}
                                        onChange={(e) =>
                                            setData('color', e.target.value)
                                        }
                                    />
                                    <InputError message={errors.color} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="interior_color">
                                        Interior Color
                                    </Label>
                                    <Input
                                        id="interior_color"
                                        placeholder="e.g. Black"
                                        value={data.interior_color}
                                        onChange={(e) =>
                                            setData(
                                                'interior_color',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.interior_color}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="number_of_owners">
                                        Number of Owners
                                    </Label>
                                    <Input
                                        id="number_of_owners"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={data.number_of_owners}
                                        onChange={(e) =>
                                            setData(
                                                'number_of_owners',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.number_of_owners}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="mb-6 flex items-center gap-2">
                                <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
                                    <Hash className="size-4 text-primary" />
                                </div>
                                <h2 className="text-lg font-semibold">
                                    Identification & Registration
                                </h2>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="vin">VIN</Label>
                                    <Input
                                        id="vin"
                                        placeholder="17-character VIN"
                                        maxLength={17}
                                        value={data.vin}
                                        onChange={(e) =>
                                            setData('vin', e.target.value)
                                        }
                                    />
                                    <InputError message={errors.vin} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="license_plate">
                                        License Plate
                                    </Label>
                                    <Input
                                        id="license_plate"
                                        placeholder="e.g. ABC-1234"
                                        value={data.license_plate}
                                        onChange={(e) =>
                                            setData(
                                                'license_plate',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.license_plate}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={data.category_id}
                                        onValueChange={(value) =>
                                            setData('category_id', value)
                                        }
                                    >
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem
                                                    key={cat.id}
                                                    value={cat.id.toString()}
                                                >
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.category_id} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="location">Location</Label>
                                    <div className="relative">
                                        <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="location"
                                            className="pl-9"
                                            placeholder="City, State"
                                            value={data.location}
                                            onChange={(e) =>
                                                setData(
                                                    'location',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <InputError message={errors.location} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="mb-6 flex items-center gap-2">
                                <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
                                    <Fuel className="size-4 text-primary" />
                                </div>
                                <h2 className="text-lg font-semibold">
                                    Pricing & Description
                                </h2>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="acquisition_cost">
                                        Acquisition Cost
                                    </Label>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                                            $
                                        </span>
                                        <Input
                                            id="acquisition_cost"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="pl-7"
                                            placeholder="0.00"
                                            value={data.acquisition_cost}
                                            onChange={(e) =>
                                                setData(
                                                    'acquisition_cost',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <InputError
                                        message={errors.acquisition_cost}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="reconditioning_cost">
                                        Reconditioning Cost
                                    </Label>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                                            $
                                        </span>
                                        <Input
                                            id="reconditioning_cost"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="pl-7"
                                            placeholder="0.00"
                                            value={data.reconditioning_cost}
                                            onChange={(e) =>
                                                setData(
                                                    'reconditioning_cost',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <InputError
                                        message={errors.reconditioning_cost}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe the vehicle's condition, features, history..."
                                    className="min-h-28"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                />
                                <InputError message={errors.description} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-between gap-4 rounded-lg border bg-card p-4 shadow-xs">
                        <div className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">
                                * Required fields
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" asChild>
                                <Link href={admin.cars.index()}>Cancel</Link>
                            </Button>

                            <Button
                                type="submit"
                                size="lg"
                                disabled={processing}
                                className="min-w-36"
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

AdminCarEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Cars', href: admin.cars.index() },
        { title: 'Edit', href: '' },
    ],
};
