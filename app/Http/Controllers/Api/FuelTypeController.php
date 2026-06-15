<?php

namespace App\Http\Controllers\Api;

use App\Models\FuelType;
use Illuminate\Http\Request;

class FuelTypeController extends ApiController
{
    public function index()
    {
        $fuelTypes = FuelType::orderBy('name')->get();

        return $this->success($fuelTypes);
    }

    public function show(string $id)
    {
        $fuelType = FuelType::findOrFail($id);

        return $this->success($fuelType);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:fuel_types',
        ]);

        $fuelType = FuelType::create($validated);

        return $this->success($fuelType, 'Fuel type created successfully.', 201);
    }

    public function update(Request $request, string $id)
    {
        $fuelType = FuelType::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:fuel_types,name,' . $fuelType->id,
        ]);

        $fuelType->update($validated);

        return $this->success($fuelType, 'Fuel type updated successfully.');
    }

    public function destroy(string $id)
    {
        $fuelType = FuelType::findOrFail($id);

        $fuelType->delete();

        return $this->success(null, 'Fuel type deleted successfully.');
    }
}
