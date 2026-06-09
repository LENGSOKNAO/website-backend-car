<?php

namespace App\Http\Controllers\Seller;

use App\Helpers\FileStore;
use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\CarListing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function index(Request $request)
    {
        $query = Banner::forUser(auth()->id())->orderBy('type')->orderBy('sort_order');

        $type = $request->type;
        if ($type && in_array($type, ['slider','banner','boxTrips','boxone','boxLeft','boxRight','boxTen'])) {
            $query->where('type', $type);
        }

        $banners = $query->get();

        $listings = CarListing::with(['make:id,name', 'model:id,name'])
            ->where('seller_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($l) => [
                'id' => $l->id,
                'label' => ($l->make->name ?? '?') . ' ' . ($l->model->name ?? '?') . ' (' . $l->year . ')',
                'price' => $l->price ?? $l->original_price,
                'image' => $l->primaryImage?->image_url ?? null,
            ]);

        return Inertia::render('seller/web/index', [
            'banners' => $banners,
            'currentType' => $type,
            'listings' => $listings,
        ]);
    }

    protected function handleImageUpload(Request $request, ?Banner $banner = null): ?string
    {
        if ($request->hasFile('image')) {
            return FileStore::store('seller-images', $request->file('image'));
        }

        if ($request->filled('image_url')) {
            return $request->input('image_url');
        }

        return $banner?->image_url;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'tagline' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|mimes:jpg,jpeg,png,webp,avif,heic,heif|max:4096',
            'image_url' => 'nullable|string',
            'link_url' => 'nullable|string',
            'button_text' => 'nullable|string|max:255',
            'button_url' => 'nullable|string',
            'button_text_2' => 'nullable|string|max:255',
            'button_url_2' => 'nullable|string',
            'badge_text' => 'nullable|string|max:255',
            'brand_slug' => 'nullable|string|max:100',
            'type' => 'required|string|in:slider,banner,boxTrips,boxone,boxLeft,boxRight,boxTen',
            'is_active' => 'boolean',
        ]);

        if (($validated['brand_slug'] ?? '') === 'none') {
            $validated['brand_slug'] = null;
        }

        $validated['image_url'] = $this->handleImageUpload($request);

        $user = auth()->user();
        if (!$user) {
            abort(401, 'Not authenticated');
        }
        $validated['user_id'] = $user->id;

        Banner::create($validated);

        return redirect()->route('seller.web.index')
            ->with('success', 'Banner created successfully.');
    }

    public function update(Request $request, Banner $banner)
    {
        if ($banner->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'tagline' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|mimes:jpg,jpeg,png,webp,avif,heic,heif|max:4096',
            'image_url' => 'nullable|string',
            'link_url' => 'nullable|string',
            'button_text' => 'nullable|string|max:255',
            'button_url' => 'nullable|string',
            'button_text_2' => 'nullable|string|max:255',
            'button_url_2' => 'nullable|string',
            'badge_text' => 'nullable|string|max:255',
            'brand_slug' => 'nullable|string|max:100',
            'type' => 'required|string|in:slider,banner,boxTrips,boxone,boxLeft,boxRight,boxTen',
            'is_active' => 'boolean',
        ]);

        if (($validated['brand_slug'] ?? '') === 'none') {
            $validated['brand_slug'] = null;
        }

        $validated['image_url'] = $this->handleImageUpload($request, $banner);

        $banner->update($validated);

        return redirect()->route('seller.web.index')
            ->with('success', 'Banner updated successfully.');
    }

    public function destroy(Banner $banner)
    {
        if ($banner->user_id !== auth()->id()) {
            abort(403);
        }

        $banner->delete();

        return redirect()->route('seller.web.index')
            ->with('success', 'Banner deleted successfully.');
    }
}
