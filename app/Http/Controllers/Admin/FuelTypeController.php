<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FuelType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FuelTypeController extends Controller
{
    public function index()
    {
        $fuelTypes = FuelType::latest()->paginate(10);

        return Inertia::render('admin/fuel-types/index', [
            'fuelTypes' => $fuelTypes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:fuel_types',
        ]);

        FuelType::create($validated);

        return redirect()->route('admin.fuel-types.index')
            ->with('success', 'Fuel type created successfully.');
    }

    public function update(Request $request, FuelType $fuelType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:fuel_types,name,'.$fuelType->id,
        ]);

        $fuelType->update($validated);

        return redirect()->route('admin.fuel-types.index')
            ->with('success', 'Fuel type updated successfully.');
    }

    public function destroy(FuelType $fuelType)
    {
        $fuelType->delete();

        return redirect()->route('admin.fuel-types.index')
            ->with('success', 'Fuel type deleted successfully.');
    }
}
