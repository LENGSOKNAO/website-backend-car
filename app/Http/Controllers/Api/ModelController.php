<?php

namespace App\Http\Controllers\Api;

use App\Models\CarMake;
use App\Models\CarModel;
use Illuminate\Http\Request;

class ModelController extends ApiController
{
    public function index()
    {
        $models = CarModel::with('make')->orderBy('name')->get();

        return $this->success($models);
    }

    public function show(string $id)
    {
        $model = CarModel::with('make')->findOrFail($id);

        return $this->success($model);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'make_id' => 'required|exists:car_makes,id',
            'name' => 'required|string|max:255',
            'start_year' => 'nullable|integer|min:1900|max:2099',
            'end_year' => 'nullable|integer|min:1900|max:2099',
        ]);

        $model = CarModel::create($validated);

        return $this->success($model->load('make'), 'Model created successfully.', 201);
    }

    public function update(Request $request, string $id)
    {
        $model = CarModel::findOrFail($id);

        $validated = $request->validate([
            'make_id' => 'required|exists:car_makes,id',
            'name' => 'required|string|max:255',
            'start_year' => 'nullable|integer|min:1900|max:2099',
            'end_year' => 'nullable|integer|min:1900|max:2099',
        ]);

        $model->update($validated);

        return $this->success($model->load('make'), 'Model updated successfully.');
    }

    public function destroy(string $id)
    {
        $model = CarModel::findOrFail($id);

        if ($model->listings()->count() > 0) {
            return $this->error('Cannot delete model with associated listings.', 409);
        }

        $model->delete();

        return $this->success(null, 'Model deleted successfully.');
    }

    public function byMake(string $makeId)
    {
        $make = CarMake::findOrFail($makeId);

        $models = $make->models()->orderBy('name')->get();

        return $this->success($models);
    }
}
