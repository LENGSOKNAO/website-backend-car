<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\CarListing;
use App\Models\Hero;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeroController extends Controller
{
    public function index()
    {
        $heroes = Hero::where('seller_id', auth()->id())->ordered()->get();

        $listings = CarListing::with(['make:id,name', 'model:id,name'])
            ->where('seller_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($l) => [
                'id' => $l->id,
                'label' => ($l->make->name ?? '?') . ' ' . ($l->model->name ?? '?') . ' (' . $l->year . ')',
            ]);

        return Inertia::render('seller/heroes/index', [
            'heroes' => $heroes,
            'listings' => $listings,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|array',
            'subtitle.*.text' => 'required|string|max:255',
            'subtitle.*.product_id' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        Hero::create(array_merge($validated, ['seller_id' => auth()->id()]));

        return redirect()->route('seller.heroes.index')
            ->with('success', 'Hero created successfully.');
    }

    public function update(Request $request, Hero $hero)
    {
        if ($hero->seller_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|array',
            'subtitle.*.text' => 'required|string|max:255',
            'subtitle.*.product_id' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $hero->update($validated);

        return redirect()->route('seller.heroes.index')
            ->with('success', 'Hero updated successfully.');
    }

    public function destroy(Hero $hero)
    {
        if ($hero->seller_id !== auth()->id()) {
            abort(403);
        }

        $hero->delete();

        return redirect()->route('seller.heroes.index')
            ->with('success', 'Hero deleted successfully.');
    }
}
