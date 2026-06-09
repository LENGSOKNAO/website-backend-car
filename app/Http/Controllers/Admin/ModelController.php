<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CarMake;
use App\Models\CarModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModelController extends Controller
{
    public function index()
    {
        $models = CarModel::with('make')->withCount('listings')->latest()->paginate(10);
        $makes = CarMake::orderBy('name')->get(['id', 'name']);

        return Inertia::render('admin/models/index', [
            'models' => $models,
            'makes' => $makes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'make_id' => 'required|exists:car_makes,id',
            'name' => 'required|string|max:255',
            'start_year' => 'nullable|integer|min:1900|max:2099',
            'end_year' => 'nullable|integer|min:1900|max:2099',
        ]);

        CarModel::create($validated);

        return redirect()->route('admin.models.index')
            ->with('success', 'Model created successfully.');
    }

    public function update(Request $request, CarModel $model)
    {
        $validated = $request->validate([
            'make_id' => 'required|exists:car_makes,id',
            'name' => 'required|string|max:255',
            'start_year' => 'nullable|integer|min:1900|max:2099',
            'end_year' => 'nullable|integer|min:1900|max:2099',
        ]);

        $model->update($validated);

        return redirect()->route('admin.models.index')
            ->with('success', 'Model updated successfully.');
    }

    public function destroy(CarModel $model)
    {
        if ($model->listings()->count() > 0) {
            return redirect()->route('admin.models.index')
                ->with('error', 'Cannot delete model with associated listings.');
        }

        $model->delete();

        return redirect()->route('admin.models.index')
            ->with('success', 'Model deleted successfully.');
    }
}
