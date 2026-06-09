import { Head, Link, useForm } from '@inertiajs/react';
import {
    Car,
    Gauge,
    Fuel,
    Cog,
    MapPin,
    Hash,
    Image as ImageIcon,
    Upload,
    X,
    Star,
    Trash2,
} from 'lucide-react';
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { dashboard } from '@/routes';
import seller from '@/routes/seller';

interface CarMake {
    id: number;
    name: string;
    models: { id: number; name: string }[];
}

interface Category {
    id: number;
    name: string;
}

interface Option {
    id: string;
    name: string;
}

interface ImagePreview {
    file: File;
    preview: string;
}

export default function SellerCarCreate({
    makes,
    categories,
    conditions,
    fuelTypes,
    transmissions,
}: {
    makes: CarMake[];
    categories: Category[];
    conditions: Option[];
    fuelTypes: Option[];
    transmissions: Option[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        make_id: '',
        model_id: '',
        year: new Date().getFullYear().toString(),
        price: '',
        original_price: '',
        mileage: '',
        fuel_type: '',
        transmission: '',
        engine_size: '',
        color: '',
        interior_color: '',
        condition: '',
        number_of_owners: '',
        vin: '',
        license_plate: '',
        description: '',
        location: '',
        category_id: '',
        total: '',
        status: 'in_stock',
        order_date: '',
        expected_arrival: '',
        images: [] as File[],
        primary_index: 0,
    });

    const [previews, setPreviews] = useState<ImagePreview[]>([]);
    const [primaryIndex, setPrimaryIndex] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [makeSearch, setMakeSearch] = useState('');
    const [modelSearch, setModelSearch] = useState('');
    const [conditionSearch, setConditionSearch] = useState('');
    const [fuelTypeSearch, setFuelTypeSearch] = useState('');
    const [transmissionSearch, setTransmissionSearch] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    const [previousTotal, setPreviousTotal] = useState('');
    const [showComingSoonControl, setShowComingSoonControl] = useState(false);
    const [showInventory, setShowInventory] = useState(false);

    const selectedMake = makes.find((m) => m.id.toString() === data.make_id);
    const models = selectedMake?.models ?? [];

    // Reset model search when make changes
    useEffect(() => {
        setModelSearch('');
        setData('model_id', '');
    }, [data.make_id]);

    // Reset condition search when condition changes
    useEffect(() => {
        setConditionSearch('');
    }, [data.condition]);

    // Reset fuel type search when fuel type changes
    useEffect(() => {
        setFuelTypeSearch('');
    }, [data.fuel_type]);

    // Reset transmission search when transmission changes
    useEffect(() => {
        setTransmissionSearch('');
    }, [data.transmission]);

    // Reset category search when category changes
    useEffect(() => {
        setCategorySearch('');
    }, [data.category_id]);

    // Track previous total when it changes from a positive value
    useEffect(() => {
        if (data.total && parseInt(data.total) > 0) {
            setPreviousTotal(data.total);
        }
    }, [data.total]);

    const handleFiles = useCallback(
        (files: FileList | null) => {
            if (!files) {
return;
}

            const newFiles = Array.from(files);
            const newPreviews = newFiles.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }));
            setPreviews((prev) => [...prev, ...newPreviews]);
            setData('images', [...data.images, ...newFiles]);
        },
        [data.images, setData],
    );

    const removeImage = (index: number) => {
        URL.revokeObjectURL(previews[index].preview);
        const updated = previews.filter((_, i) => i !== index);
        setPreviews(updated);
        setData(
            'images',
            data.images.filter((_, i) => i !== index),
        );

        if (primaryIndex >= updated.length) {
            setPrimaryIndex(Math.max(0, updated.length - 1));
        }
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
        post(seller.cars.store().url);
    };

    return (
        <>
            <Head title="Add Car" />
            <div className="flex h-screen flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <Car className="size-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Add New Car</h1>
                        <p className="text-sm text-muted-foreground">
                            List a new vehicle for sale
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={submit}
                    className="flex-1 space-y-4 overflow-y-auto px-4"
                >
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
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="make_id">Make *</Label>
                                    <Select
                                        value={data.make_id}
                                        onValueChange={(value) => {
                                            setData('make_id', value);
                                            setData('model_id', '');
                                            // Update search input to show selected value
                                            const selectedMake = makes?.find(
                                                (m) =>
                                                    m.id.toString() === value,
                                            );

                                            if (selectedMake) {
                                                setMakeSearch(
                                                    selectedMake.name,
                                                );
                                            } else {
                                                setMakeSearch('');
                                            }
                                        }}
                                    >
                                        <SelectTrigger
                                            id="make_id"
                                            className="w-full"
                                        >
                                            <SelectValue placeholder="Search or select make..." />
                                        </SelectTrigger>
                                        <SelectContent className="mt-0 w-full">
                                            <Input
                                                type="text"
                                                placeholder="Search makes..."
                                                value={makeSearch}
                                                onChange={(e) =>
                                                    setMakeSearch(
                                                        e.target.value,
                                                    )
                                                }
                                                className="mb-2 block w-full"
                                            />
                                            {(makes || [])
                                                .filter(
                                                    (make) =>
                                                        makeSearch === '' ||
                                                        make.name
                                                            .toLowerCase()
                                                            .includes(
                                                                makeSearch.toLowerCase(),
                                                            ),
                                                )
                                                .map((make) => (
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
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="model_id">Model *</Label>
                                    <Select
                                        value={data.model_id}
                                        onValueChange={(value) =>
                                            setData('model_id', value)
                                        }
                                        disabled={!data.make_id}
                                        className="w-full"
                                    >
                                        <SelectTrigger
                                            id="model_id"
                                            className="w-full"
                                        >
                                            <SelectValue
                                                placeholder={
                                                    data.make_id
                                                        ? 'Search or select model...'
                                                        : 'Choose make first'
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent className="mt-0 w-full">
                                            <Input
                                                type="text"
                                                placeholder="Search models..."
                                                value={modelSearch}
                                                onChange={(e) =>
                                                    setModelSearch(
                                                        e.target.value,
                                                    )
                                                }
                                                className="mb-2 block w-full"
                                            />
                                            {(models || [])
                                                .filter(
                                                    (model) =>
                                                        modelSearch === '' ||
                                                        model.name
                                                            .toLowerCase()
                                                            .includes(
                                                                modelSearch.toLowerCase(),
                                                            ),
                                                )
                                                .map((model) => (
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

                                <div className="grid w-full gap-2">
                                    <Label htmlFor="price">Price *</Label>
                                    <div className="relative w-full">
                                        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                                            $
                                        </span>
                                        <Input
                                            id="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="w-full pl-7"
                                            placeholder="0.00"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData('price', e.target.value)
                                            }
                                        />
                                    </div>
                                    <InputError message={errors.price} />
                                </div>
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="original_price">
                                        Original Price (MSRP)
                                    </Label>
                                    <div className="relative w-full">
                                        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                                            $
                                        </span>
                                        <Input
                                            id="original_price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="w-full pl-7"
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

                                {data.status === 'in_stock' && (
                                    <div className="grid w-full gap-2">
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
                                            className="w-full"
                                        />
                                        <InputError message={errors.total} />
                                    </div>
                                )}
                                {data.status === 'coming_soon' && (
                                    <>
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="order_date">
                                                Order Date
                                            </Label>
                                            <Input
                                                id="order_date"
                                                type="date"
                                                value={data.order_date || ''}
                                                onChange={(e) =>
                                                    setData(
                                                        'order_date',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="expected_arrival">
                                                Expected Arrival
                                            </Label>
                                            <Input
                                                id="expected_arrival"
                                                type="date"
                                                value={
                                                    data.expected_arrival || ''
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'expected_arrival',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="grid w-full gap-2">
                                    <Label>Stock Status</Label>
                                    <div className="flex flex-wrap items-center gap-2 text-xs">
                                        <RadioGroup
                                            value={data.status}
                                            onValueChange={(value) => {
                                                setData('status', value);

                                                if (value === 'coming_soon') {
                                                    setData('total', '0');

                                                    if (
                                                        !data.expected_arrival
                                                    ) {
                                                        const d = new Date();
                                                        d.setDate(
                                                            d.getDate() + 14,
                                                        );
                                                        setData(
                                                            'expected_arrival',
                                                            d
                                                                .toISOString()
                                                                .split('T')[0],
                                                        );
                                                    }
                                                } else if (
                                                    value === 'in_stock'
                                                ) {
                                                    setData(
                                                        'expected_arrival',
                                                        '',
                                                    );
                                                    setData(
                                                        'total',
                                                        previousTotal || '0',
                                                    );
                                                } else {
                                                    setData(
                                                        'expected_arrival',
                                                        '',
                                                    );
                                                    setData('total', '0');
                                                }
                                            }}
                                            variant="outline"
                                            className="w-full"
                                        >
                                            <RadioGroupItem value="in_stock">
                                                In Stock
                                            </RadioGroupItem>
                                            <RadioGroupItem value="coming_soon">
                                                Coming Soon
                                            </RadioGroupItem>
                                            <RadioGroupItem value="out_of_stock">
                                                Out of Stock
                                            </RadioGroupItem>
                                        </RadioGroup>
                                    </div>
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
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="mileage">Mileage</Label>
                                    <div className="relative w-full">
                                        <Input
                                            id="mileage"
                                            type="number"
                                            min="0"
                                            className="w-full pr-12"
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
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="condition">Condition</Label>
                                    <Select
                                        value={data.condition}
                                        onValueChange={(value) => {
                                            setData('condition', value);
                                            const match = conditions.find((c) => c.name === value);
                                            setConditionSearch(match ? match.name : '');
                                        }}
                                        className="w-full"
                                    >
                                        <SelectTrigger
                                            id="condition"
                                            className="w-full"
                                        >
                                            <SelectValue placeholder="Search or select condition..." />
                                        </SelectTrigger>
                                        <SelectContent className="mt-0 w-full">
                                            <Input
                                                type="text"
                                                placeholder="Search conditions..."
                                                value={conditionSearch}
                                                onChange={(e) =>
                                                    setConditionSearch(
                                                        e.target.value,
                                                    )
                                                }
                                                className="mb-2 block w-full"
                                            />
                                            {conditions
                                                .filter(
                                                    (c) =>
                                                        conditionSearch === '' ||
                                                        c.name
                                                            .toLowerCase()
                                                            .includes(
                                                                conditionSearch.toLowerCase(),
                                                            ),
                                                )
                                                .map((c) => (
                                                    <SelectItem key={c.id} value={c.name}>
                                                        {c.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.condition} />
                                </div>
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="fuel_type">Fuel Type</Label>
                                    <Select
                                        value={data.fuel_type}
                                        onValueChange={(value) => {
                                            setData('fuel_type', value);
                                            const match = fuelTypes.find((f) => f.name === value);
                                            setFuelTypeSearch(match ? match.name : '');
                                        }}
                                        className="w-full"
                                    >
                                        <SelectTrigger
                                            id="fuel_type"
                                            className="w-full"
                                        >
                                            <SelectValue placeholder="Search or select fuel type..." />
                                        </SelectTrigger>
                                        <SelectContent className="mt-0 w-full">
                                            <Input
                                                type="text"
                                                placeholder="Search fuel types..."
                                                value={fuelTypeSearch}
                                                onChange={(e) =>
                                                    setFuelTypeSearch(
                                                        e.target.value,
                                                    )
                                                }
                                                className="mb-2 block w-full"
                                            />
                                            {fuelTypes
                                                .filter(
                                                    (f) =>
                                                        fuelTypeSearch === '' ||
                                                        f.name
                                                            .toLowerCase()
                                                            .includes(
                                                                fuelTypeSearch.toLowerCase(),
                                                            ),
                                                )
                                                .map((f) => (
                                                    <SelectItem key={f.id} value={f.name}>
                                                        {f.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.fuel_type} />
                                </div>
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="transmission">
                                        Transmission
                                    </Label>
                                    <Select
                                        value={data.transmission}
                                        onValueChange={(value) => {
                                            setData('transmission', value);
                                            const match = transmissions.find((t) => t.name === value);
                                            setTransmissionSearch(match ? match.name : '');
                                        }}
                                        className="w-full"
                                    >
                                        <SelectTrigger
                                            id="transmission"
                                            className="w-full"
                                        >
                                            <SelectValue placeholder="Search or select transmission..." />
                                        </SelectTrigger>
                                        <SelectContent className="mt-0 w-full">
                                            <Input
                                                type="text"
                                                placeholder="Search transmissions..."
                                                value={transmissionSearch}
                                                onChange={(e) =>
                                                    setTransmissionSearch(
                                                        e.target.value,
                                                    )
                                                }
                                                className="mb-2 block w-full"
                                            />
                                            {transmissions
                                                .filter(
                                                    (t) =>
                                                        transmissionSearch === '' ||
                                                        t.name
                                                            .toLowerCase()
                                                            .includes(
                                                                transmissionSearch.toLowerCase(),
                                                            ),
                                                )
                                                .map((t) => (
                                                    <SelectItem key={t.id} value={t.name}>
                                                        {t.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.transmission} />
                                </div>
                                <div className="grid w-full gap-2">
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
                                        className="w-full"
                                    />
                                    <InputError message={errors.engine_size} />
                                </div>
                                <div className="grid w-full gap-2">
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
                                        className="w-full"
                                    />
                                    <InputError message={errors.color} />
                                </div>
                                <div className="grid w-full gap-2">
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
                                        className="w-full"
                                    />
                                    <InputError
                                        message={errors.interior_color}
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
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="vin">VIN</Label>
                                    <Input
                                        id="vin"
                                        placeholder="17-character VIN"
                                        maxLength={17}
                                        value={data.vin}
                                        onChange={(e) =>
                                            setData('vin', e.target.value)
                                        }
                                        className="w-full"
                                    />
                                    <InputError message={errors.vin} />
                                </div>
                                <div className="grid w-full gap-2">
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
                                        className="w-full"
                                    />
                                    <InputError
                                        message={errors.license_plate}
                                    />
                                </div>
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={data.category_id}
                                        onValueChange={(value) => {
                                            setData('category_id', value);
                                            // Update search input to show selected value
                                            const selectedCategory =
                                                categories?.find(
                                                    (c) =>
                                                        c.id.toString() ===
                                                        value,
                                                );

                                            if (selectedCategory) {
                                                setCategorySearch(
                                                    selectedCategory.name,
                                                );
                                            } else {
                                                setCategorySearch('');
                                            }
                                        }}
                                        className="w-full"
                                    >
                                        <SelectTrigger
                                            id="category"
                                            className="w-full"
                                        >
                                            <SelectValue placeholder="Search or select category..." />
                                        </SelectTrigger>
                                        <SelectContent className="mt-0 w-full">
                                            <Input
                                                type="text"
                                                placeholder="Search categories..."
                                                value={categorySearch}
                                                onChange={(e) =>
                                                    setCategorySearch(
                                                        e.target.value,
                                                    )
                                                }
                                                className="mb-2 block w-full"
                                            />
                                            {(categories || [])
                                                .filter(
                                                    (category) =>
                                                        categorySearch === '' ||
                                                        category.name
                                                            .toLowerCase()
                                                            .includes(
                                                                categorySearch.toLowerCase(),
                                                            ),
                                                )
                                                .map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id.toString()}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.category_id} />
                                </div>
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="location">Location</Label>
                                    <div className="relative w-full">
                                        <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="location"
                                            className="w-full pl-9"
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
                                    Additional Details
                                </h2>
                            </div>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe the vehicle's condition, features, history, and any included accessories..."
                                        className="min-h-28"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError message={errors.description} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

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

                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onClick={() => fileInputRef.current?.click()}
                                className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition-colors hover:border-muted-foreground/50"
                            >
                                <Upload className="size-8 text-muted-foreground" />
                                <p className="text-sm font-medium">
                                    Drag & drop photos here
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    or click to browse (max 10 images)
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
                            <InputError message={errors.images} />

                            {previews.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                    {previews.map((img, i) => (
                                        <div
                                            key={i}
                                            className="group relative aspect-[4/3] overflow-hidden rounded-lg border"
                                        >
                                            <img
                                                src={img.preview}
                                                alt={`Car photo ${i + 1}`}
                                                className="size-full object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-start justify-between bg-black/0 p-1 transition-colors group-hover:bg-black/30">
                                                <Button
                                                    type="button"
                                                    variant={
                                                        primaryIndex === i
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                    size="icon"
                                                    className="size-6"
                                                    onClick={() => {
                                                        setPrimaryIndex(i);
                                                        setData(
                                                            'primary_index',
                                                            i,
                                                        );
                                                    }}
                                                >
                                                    <Star
                                                        className={`size-3 ${primaryIndex === i ? 'fill-current' : ''}`}
                                                    />
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="size-6 opacity-0 transition-opacity group-hover:opacity-100"
                                                    onClick={() =>
                                                        removeImage(i)
                                                    }
                                                >
                                                    <Trash2 className="size-3" />
                                                </Button>
                                            </div>
                                            {primaryIndex === i && (
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

                    <div className="flex items-center justify-between gap-4 rounded-lg border bg-card p-4 shadow-xs">
                        <div className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">
                                * Required fields
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" asChild>
                                <Link href={seller.cars.index()}>Cancel</Link>
                            </Button>
                            <Button
                                type="submit"
                                size="lg"
                                disabled={processing}
                                className="min-w-36"
                            >
                                {processing ? 'Creating...' : 'Create Listing'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

SellerCarCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'My Cars', href: seller.cars.index() },
        { title: 'Add Car', href: '' },
    ],
};
