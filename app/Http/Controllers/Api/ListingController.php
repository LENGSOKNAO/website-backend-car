<?php

namespace App\Http\Controllers\Api;

use App\Models\CarListing;
use App\Models\ListingImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ListingController extends ApiController
{
    public function index(Request $request)
    {
        $query = CarListing::with(['make', 'model', 'category', 'primaryImage', 'features', 'seller'])
            ->where('status', 'in_stock');

        if ($request->make_id) {
            $query->where('make_id', $request->make_id);
        }

        if ($request->model_id) {
            $query->where('model_id', $request->model_id);
        }

        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->year) {
            $query->where('year', $request->year);
        }

        if ($request->fuel_type) {
            $query->where('fuel_type', $request->fuel_type);
        }

        if ($request->transmission) {
            $query->where('transmission', $request->transmission);
        }

        if ($request->condition) {
            $query->where('condition', $request->condition);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->whereHas('make', fn ($mq) => $mq->where('name', 'like', "%{$request->search}%"))
                    ->orWhereHas('model', fn ($mq) => $mq->where('name', 'like', "%{$request->search}%"))
                    ->orWhere('description', 'like', "%{$request->search}%");
            });
        }

        $listings = $query->latest()->get();

        return response()->json(['data' => $listings]);
    }

    public function show(string $id)
    {
        $listing = CarListing::with([
            'make', 'model', 'category', 'images', 'features', 'seller',
        ])->findOrFail($id);

        $listing->increment('views_count');

        return $this->success($listing);
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
            'fuel_type' => 'nullable|string',
            'transmission' => 'nullable|string',
            'engine_size' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
            'interior_color' => 'nullable|string|max:255',
            'condition' => 'nullable|string',
            'number_of_owners' => 'nullable|integer|min:0',
            'vin' => 'nullable|string|max:255|unique:car_listings',
            'license_plate' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'images' => 'nullable|array|max:10',
            'images.*.image_url' => 'required|string',
            'images.*.is_primary' => 'nullable|boolean',
            'total' => 'nullable|integer|min:0',
            'status' => 'nullable|in:in_stock,out_of_stock,coming_soon',
            'order_date' => 'nullable|date',
            'expected_arrival' => 'nullable|date',
        ]);

        $images = $validated['images'] ?? [];
        unset($validated['images']);

        $validated['seller_id'] = auth()->id();
        $validated['status'] ??= 'in_stock';
        $validated['total'] ??= 1;

        $listing = CarListing::create($validated);

        foreach ($images as $i => $img) {
            $listing->images()->create([
                'image_url' => $img['image_url'],
                'is_primary' => $img['is_primary'] ?? $i === 0,
                'sort_order' => $i,
                'uploaded_at' => now(),
            ]);
        }

        return $this->success($listing->load(['make', 'model', 'category', 'images', 'features', 'seller']), 'Listing created', 201);
    }

    public function update(Request $request, string $id)
    {
        $listing = CarListing::findOrFail($id);

        if ($listing->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        $validated = $request->validate([
            'make_id' => 'sometimes|exists:car_makes,id',
            'model_id' => 'sometimes|exists:car_models,id',
            'category_id' => 'nullable|exists:categories,id',
            'year' => 'sometimes|integer|min:1900|max:'.(date('Y') + 1),
            'price' => 'sometimes|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'mileage' => 'nullable|integer|min:0',
            'fuel_type' => 'nullable|string',
            'transmission' => 'nullable|string',
            'engine_size' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
            'interior_color' => 'nullable|string|max:255',
            'condition' => 'nullable|string',
            'number_of_owners' => 'nullable|integer|min:0',
            'vin' => 'nullable|string|max:255|unique:car_listings,vin,'.$id,
            'license_plate' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'images' => 'nullable|array|max:10',
            'images.*.image_url' => 'required|string',
            'images.*.is_primary' => 'nullable|boolean',
            'total' => 'nullable|integer|min:0',
            'status' => 'nullable|in:in_stock,out_of_stock,coming_soon',
            'order_date' => 'nullable|date',
            'expected_arrival' => 'nullable|date',
        ]);

        $images = $validated['images'] ?? [];
        unset($validated['images']);

        $listing->update($validated);

        $listing->images()->delete();

        foreach ($images as $i => $img) {
            $listing->images()->create([
                'image_url' => $img['image_url'],
                'is_primary' => $img['is_primary'] ?? $i === 0,
                'sort_order' => $i,
                'uploaded_at' => now(),
            ]);
        }

        return $this->success($listing->fresh()->load(['make', 'model', 'category', 'images', 'features', 'seller']), 'Listing updated');
    }

    public function destroy(string $id)
    {
        $listing = CarListing::findOrFail($id);

        if ($listing->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        $listing->delete();

        return $this->success(null, 'Listing deleted');
    }

    public function uploadImage(Request $request, string $id)
    {
        $listing = CarListing::findOrFail($id);

        if ($listing->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        $validated = $request->validate([
            'image_url' => 'required|string',
            'is_primary' => 'nullable|boolean',
        ]);

        $maxSort = $listing->images()->max('sort_order') ?? 0;

        $image = ListingImage::create([
            'listing_id' => $listing->id,
            'image_url' => $validated['image_url'],
            'is_primary' => $validated['is_primary'] ?? false,
            'sort_order' => $validated['is_primary'] ? 0 : $maxSort + 1,
            'uploaded_at' => now(),
        ]);

        if ($validated['is_primary'] ?? false) {
            $listing->images()
                ->where('id', '!=', $image->id)
                ->where('is_primary', true)
                ->update(['is_primary' => false]);
        }

        return $this->success($image, 'Image uploaded', 201);
    }
}
