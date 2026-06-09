<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CarMake;
use App\Models\CarModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MakesModelsController extends Controller
{
    public function index(Request $request)
    {
        $makes = CarMake::withCount('models')
            ->when($request->make_search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->orderBy('name')
            ->paginate(15);

        $models = CarModel::with('make')->withCount('listings')
            ->when($request->model_search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->when($request->make_id, fn ($q, $id) => $q->where('make_id', $id))
            ->latest()
            ->paginate(15);

        $allMakes = CarMake::orderBy('name')->get(['id', 'name']);

        return Inertia::render('admin/makes-models/index', [
            'makes' => $makes,
            'models' => $models,
            'allMakes' => $allMakes,
            'filters' => $request->only(['make_search', 'model_search', 'make_id', 'tab']),
        ]);
    }
}
