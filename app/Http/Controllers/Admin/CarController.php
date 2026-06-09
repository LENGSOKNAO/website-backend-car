<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\FileStore;
use App\Http\Controllers\Controller;
use App\Models\CarListing;
use App\Models\CarMake;
use App\Models\Category;
use App\Models\Condition;
use App\Models\FuelType;
use App\Models\ListingImage;
use App\Models\Transmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CarController extends Controller
{
    public function index(Request $request)
    {
        $query = CarListing::with([
            'make', 'model', 'category', 'seller',
            'primaryImage',
        ])->withCount(['orders', 'preOrders']);

        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('make', fn ($mq) => $mq->where('name', 'like', "%{$search}%"))
                    ->orWhereHas('model', fn ($mq) => $mq->where('name', 'like', "%{$search}%"))
                    ->orWhere('year', 'like', "%{$search}%");
            });
        }

        if ($request->status) {
            $query->where('status', $request->status === 'in_stock' ? 'in_stock' : $request->status);
        }

        $cars = $query->orderBy('created_at', 'desc')
            ->paginate(12);

        $modelTotals = CarListing::selectRaw("make_id, model_id, COUNT(*) as total, SUM(CASE WHEN status = 'in_stock' THEN 1 ELSE 0 END) as in_stock, SUM(CASE WHEN status = 'coming_soon' THEN 1 ELSE 0 END) as coming_soon")
            ->groupBy('make_id', 'model_id')
            ->get()
            ->keyBy(fn ($row) => $row->make_id.'-'.$row->model_id);

        $cars->getCollection()->transform(function ($car) use ($modelTotals) {
            $primary = $car->primaryImage;
            $raw = $primary?->image_url;
            $car->image_url = $raw
                ? (str_starts_with($raw, 'http') ? $raw : '/storage/'.$raw)
                : null;
            unset($car->primaryImage);
            $key = $car->make_id.'-'.$car->model_id;
            $mt = $modelTotals[$key] ?? null;
            $car->model_total = $mt ? (int) $mt->total : 0;
            $car->model_in_stock = $mt ? (int) $mt->in_stock : 0;
            $car->model_coming_soon = $mt ? (int) $mt->coming_soon : 0;

            return $car;
        });

        $modelStats = CarListing::select(
            'car_makes.name as make_name',
            'car_models.name as model_name',
            DB::raw('COUNT(*) as total'),
            DB::raw('SUM(CASE WHEN status = \'coming_soon\' THEN 1 ELSE 0 END) as coming_soon'),
            DB::raw('SUM(CASE WHEN status = \'in_stock\' THEN 1 ELSE 0 END) as in_stock'),
            DB::raw('SUM(CASE WHEN status = \'out_of_stock\' THEN 1 ELSE 0 END) as out_of_stock'),
        )
            ->join('car_makes', 'car_listings.make_id', '=', 'car_makes.id')
            ->join('car_models', 'car_listings.model_id', '=', 'car_models.id')
            ->groupBy('car_makes.name', 'car_models.name')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        return Inertia::render('admin/cars/index', [
            'cars' => $cars,
            'filters' => $request->only(['search', 'status']),
            'modelStats' => $modelStats,
        ]);
    }

    public function show(CarListing $car)
    {
        $car->load([
            'make',
            'model',
            'category',
            'images' => fn ($q) => $q->orderBy('sort_order')->orderBy('created_at'),
            'seller.sellerVerification',
            'orders' => fn ($q) => $q->with(['buyer', 'items'])->latest(),
            'preOrders' => fn ($q) => $q->with(['customer:id,full_name,email,phone', 'payments'])->latest(),
        ]);

        $car->images->each(function ($img) {
            $img->image_url = str_starts_with($img->image_url, 'http')
                ? $img->image_url
                : '/storage/'.$img->image_url;
        });

        return Inertia::render('admin/cars/show', [
            'car' => $car,
        ]);
    }

    public function edit(CarListing $car)
    {
        $makes = CarMake::with('models')->get();
        $categories = Category::all();
        $conditions = Condition::orderBy('name')->get();
        $fuelTypes = FuelType::orderBy('name')->get();
        $transmissions = Transmission::orderBy('name')->get();

        $car->load(['seller', 'make', 'model', 'category', 'images']);

        $car->images->transform(function ($image) {
            $image->image_url = str_starts_with($image->image_url, 'http')
                ? $image->image_url
                : '/storage/'.$image->image_url;

            return $image;
        });

        return Inertia::render('admin/cars/edit', [
            'car' => $car,
            'makes' => $makes,
            'categories' => $categories,
            'conditions' => $conditions,
            'fuelTypes' => $fuelTypes,
            'transmissions' => $transmissions,
        ]);
    }

    public function update(Request $request, CarListing $car)
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
            'condition' => 'nullable|string|exists:conditions,name',
            'number_of_owners' => 'nullable|integer|min:0',
            'vin' => 'nullable|string|max:255|unique:car_listings,vin,'.$car->id,
            'license_plate' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'total' => 'nullable|integer|min:0',
            'order_date' => 'nullable|date',
            'expected_arrival' => 'nullable|date',
            'actual_arrival' => 'nullable|date',
            'acquisition_cost' => 'nullable|numeric|min:0',
            'reconditioning_cost' => 'nullable|numeric|min:0',
            'new_images' => 'nullable|array|max:10',
            'new_images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
            'primary_image_id' => 'nullable|string|exists:listing_images,id',
            'primary_new_index' => 'nullable|integer|min:-1',
            'delete_image_ids' => 'nullable|array',
            'delete_image_ids.*' => 'nullable|string|exists:listing_images,id',
        ]);

        $total = (int) ($validated['total'] ?? 0);
        if ($total > 0) {
            $validated['status'] = 'in_stock';
        } elseif ($request->filled('expected_arrival')) {
            $validated['status'] = 'coming_soon';
        } else {
            $validated['status'] = 'out_of_stock';
        }

        $car->update($validated);

        $nextSortOrder = $car->images()->max('sort_order') ?? -1;
        $createdImageIds = [];

        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $i => $image) {
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
        }

        if ($request->filled('delete_image_ids')) {
            $imageIds = $request->input('delete_image_ids');
            $images = ListingImage::whereIn('id', $imageIds)
                ->where('listing_id', $car->id)
                ->get();

            foreach ($images as $img) {
                if (! str_starts_with($img->image_url, 'http')) {
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

        return redirect()->route('admin.cars.index')
            ->with('success', 'Car updated successfully.');
    }

    public function destroy(CarListing $car)
    {
        $car->delete();

        return redirect()->route('admin.cars.index')
            ->with('success', 'Car deleted successfully.');
    }
}
