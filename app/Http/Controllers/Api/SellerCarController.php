<?php

namespace App\Http\Controllers\Api;

use App\Helpers\FileStore;
use App\Models\CarListing;
use App\Models\CarMake;
use App\Models\Category;
use App\Models\Condition;
use App\Models\FuelType;
use App\Models\ListingImage;
use App\Models\Transmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SellerCarController extends ApiController
{
    public function index(Request $request)
    {
        $query = CarListing::with(['make', 'model', 'category', 'primaryImage'])
            ->where('seller_id', auth()->id())
            ->withCount(['orders', 'preOrders']);

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->whereHas('make', function ($mq) use ($request) {
                    $mq->where('name', 'like', "%{$request->search}%");
                })->orWhereHas('model', function ($mq) use ($request) {
                    $mq->where('name', 'like', "%{$request->search}%");
                });
            });
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $cars = $query->latest()->paginate($request->per_page ?? 10);

        $cars->getCollection()->transform(function ($car) {
            $primary = $car->primaryImage;
            $raw = $primary?->image_url;
            $car->image_url = $raw
                ? (match (true) {
                    str_starts_with($raw, 'http'),
                    str_starts_with($raw, '/api/') => $raw,
                    default => '/storage/'.$raw,
                })
                : null;
            unset($car->primaryImage);

            return $car;
        });

        return $this->success($cars);
    }

    public function show(string $id)
    {
        $car = CarListing::with([
            'make',
            'model',
            'category',
            'images' => fn ($q) => $q->orderBy('sort_order')->orderBy('created_at'),
            'seller.sellerVerification',
            'orders' => fn ($q) => $q->with(['buyer', 'items'])->latest(),
            'preOrders' => fn ($q) => $q->with(['customer:id,full_name,email,phone', 'payments'])->latest(),
        ])->findOrFail($id);

        if ($car->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        $car->images->each(function ($img) {
            $img->image_url = match (true) {
                str_starts_with($img->image_url, 'http'),
                str_starts_with($img->image_url, '/api/') => $img->image_url,
                default => '/storage/'.$img->image_url,
            };
        });

        return $this->success($car);
    }

    public function create()
    {
        $makes = CarMake::with('models')->get();
        $categories = Category::all();
        $conditions = Condition::orderBy('name')->get();
        $fuelTypes = FuelType::orderBy('name')->get();
        $transmissions = Transmission::orderBy('name')->get();

        return $this->success([
            'makes' => $makes,
            'categories' => $categories,
            'conditions' => $conditions,
            'fuelTypes' => $fuelTypes,
            'transmissions' => $transmissions,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'make_id' => 'required|exists:car_makes,id',
            'model_id' => 'required|exists:car_models,id',
            'category_id' => 'nullable|exists:categories,id',
            'year' => 'required|integer|min:1900|max:'.(date('Y') + 1),
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'mileage' => 'nullable|integer|min:0',
            'fuel_type' => 'nullable|string|exists:fuel_types,name',
            'transmission' => 'nullable|string|exists:transmissions,name',
            'engine_size' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
            'interior_color' => 'nullable|string|max:255',
            'condition' => 'required|string|exists:conditions,name',
            'number_of_owners' => 'nullable|integer|min:0',
            'vin' => 'nullable|string|max:255|unique:car_listings',
            'license_plate' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'primary_index' => 'nullable|integer|min:0',
            'total' => 'nullable|integer|min:0',
            'status' => 'nullable|in:in_stock,out_of_stock,coming_soon',
            'order_date' => 'nullable|date',
            'expected_arrival' => 'nullable|date',
        ]);

        $primaryIndex = (int) $request->input('primary_index', 0);
        unset($validated['primary_index']);

        $validated['seller_id'] = auth()->id();
        $validated['status'] ??= 'in_stock';
        $validated['total'] ??= 1;

        $listing = CarListing::create($validated);

        $uploadedFiles = [];
        foreach ($request->allFiles() as $key => $file) {
            if (str_starts_with($key, 'images')) {
                if (is_array($file)) {
                    $uploadedFiles = $file;
                } else {
                    $uploadedFiles[] = $file;
                }
            }
        }

        foreach ($uploadedFiles as $i => $image) {
            $path = FileStore::storeReturningPath('listings/'.$listing->id, $image);

            $listing->images()->create([
                'image_url' => $path,
                'is_primary' => $i === $primaryIndex,
                'sort_order' => $i,
                'uploaded_at' => now(),
            ]);
        }

        return $this->success($listing->load(['make', 'model', 'category', 'images', 'seller']), 'Car listed successfully.', 201);
    }

    public function edit(string $id)
    {
        $car = CarListing::findOrFail($id);

        if ($car->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        $makes = CarMake::with('models')->get();
        $categories = Category::all();
        $conditions = Condition::orderBy('name')->get();
        $fuelTypes = FuelType::orderBy('name')->get();
        $transmissions = Transmission::orderBy('name')->get();

        $car->load(['make', 'model', 'category', 'images']);

        $car->images->transform(function ($image) {
            $image->image_url = match (true) {
                str_starts_with($image->image_url, 'http'),
                str_starts_with($image->image_url, '/api/') => $image->image_url,
                default => '/storage/'.$image->image_url,
            };

            return $image;
        });

        return $this->success([
            'car' => $car,
            'makes' => $makes,
            'categories' => $categories,
            'conditions' => $conditions,
            'fuelTypes' => $fuelTypes,
            'transmissions' => $transmissions,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $car = CarListing::findOrFail($id);

        if ($car->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        $validated = $request->validate([
            'make_id' => 'required|exists:car_makes,id',
            'model_id' => 'required|exists:car_models,id',
            'category_id' => 'nullable|exists:categories,id',
            'year' => 'required|integer|min:1900|max:'.(date('Y') + 1),
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'mileage' => 'nullable|integer|min:0',
            'fuel_type' => 'nullable|string|exists:fuel_types,name',
            'transmission' => 'nullable|string|exists:transmissions,name',
            'engine_size' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
            'interior_color' => 'nullable|string|max:255',
            'condition' => 'required|string|exists:conditions,name',
            'number_of_owners' => 'nullable|integer|min:0',
            'vin' => 'nullable|string|max:255|unique:car_listings,vin,'.$car->id,
            'license_plate' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'total' => 'nullable|integer|min:0',
            'status' => 'nullable|in:in_stock,out_of_stock,coming_soon',
            'order_date' => 'nullable|date',
            'expected_arrival' => 'nullable|date',
            'primary_image_id' => 'nullable|string|exists:listing_images,id',
            'primary_new_index' => 'nullable|integer|min:-1',
            'delete_image_ids' => 'nullable|array',
            'delete_image_ids.*' => 'nullable|string|exists:listing_images,id',
        ]);

        if ($request->filled('status')) {
            $validated['status'] = $request->input('status');
        } else {
            $total = (int) ($validated['total'] ?? $car->total ?? 0);
            if ($total > 0) {
                $validated['status'] = 'in_stock';
            } elseif ($request->filled('expected_arrival') || $car->expected_arrival) {
                $validated['status'] = 'coming_soon';
            } else {
                $validated['status'] = 'out_of_stock';
            }
        }

        unset($validated['primary_image_id'], $validated['primary_new_index'], $validated['delete_image_ids']);

        $car->update($validated);

        $nextSortOrder = $car->images()->max('sort_order') ?? -1;
        $createdImageIds = [];

        $newUploadedFiles = [];
        foreach ($request->allFiles() as $key => $file) {
            if (str_starts_with($key, 'new_images')) {
                if (is_array($file)) {
                    $newUploadedFiles = $file;
                } else {
                    $newUploadedFiles[] = $file;
                }
            }
        }

        foreach ($newUploadedFiles as $image) {
            $nextSortOrder++;
            $path = FileStore::storeReturningPath('listings/'.$car->id, $image);

            $listingImage = $car->images()->create([
                'image_url' => $path,
                'is_primary' => false,
                'sort_order' => $nextSortOrder,
                'uploaded_at' => now(),
            ]);

            $createdImageIds[] = $listingImage->id;
        }

        if ($request->filled('delete_image_ids')) {
            $imageIds = $request->input('delete_image_ids');
            $images = ListingImage::whereIn('id', $imageIds)
                ->where('listing_id', $car->id)
                ->get();

            foreach ($images as $img) {
                if (! str_starts_with($img->image_url, 'http') && ! str_starts_with($img->image_url, '/api/')) {
                    Storage::disk('public')->delete($img->image_url);
                }
                $img->delete();
            }
        }

        $primaryNewIdx = $request->integer('primary_new_index');
        if ($primaryNewIdx >= 0 && isset($createdImageIds[$primaryNewIdx])) {
            ListingImage::where('listing_id', $car->id)
                ->where('is_primary', true)
                ->update(['is_primary' => false]);

            ListingImage::where('id', $createdImageIds[$primaryNewIdx])
                ->update(['is_primary' => true]);
        } elseif ($request->filled('primary_image_id')) {
            ListingImage::where('listing_id', $car->id)
                ->where('is_primary', true)
                ->update(['is_primary' => false]);

            ListingImage::where('id', $request->input('primary_image_id'))
                ->where('listing_id', $car->id)
                ->update(['is_primary' => true]);
        }

        return $this->success($car->fresh()->load(['make', 'model', 'category', 'images', 'seller']), 'Car updated successfully.');
    }

    public function destroy(string $id)
    {
        $car = CarListing::findOrFail($id);

        if ($car->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        $car->delete();

        return $this->success(null, 'Car deleted successfully.');
    }
}
