<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CarMake;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MakeController extends Controller
{
    public function index()
    {
        $makes = CarMake::withCount('models')->latest()->paginate(10);

        return Inertia::render('admin/makes/index', [
            'makes' => $makes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:car_makes',
            'country' => 'nullable|string|max:255',
        ]);

        CarMake::create($validated);

        return redirect()->route('admin.makes.index')
            ->with('success', 'Make created successfully.');
    }

    public function update(Request $request, CarMake $make)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:car_makes,name,'.$make->id,
            'country' => 'nullable|string|max:255',
        ]);

        $make->update($validated);

        return redirect()->route('admin.makes.index')
            ->with('success', 'Make updated successfully.');
    }

    public function destroy(CarMake $make)
    {
        if ($make->listings()->count() > 0) {
            return redirect()->route('admin.makes.index')
                ->with('error', 'Cannot delete make with associated listings.');
        }

        $make->models()->delete();
        $make->delete();

        return redirect()->route('admin.makes.index')
            ->with('success', 'Make deleted successfully.');
    }
}
