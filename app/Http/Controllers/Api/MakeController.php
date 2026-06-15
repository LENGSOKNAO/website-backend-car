<?php

namespace App\Http\Controllers\Api;

use App\Models\CarMake;
use Illuminate\Http\Request;

class MakeController extends ApiController
{
    public function index()
    {
        $makes = CarMake::with('models')->orderBy('name')->get();

        return $this->success($makes);
    }

    public function show(string $id)
    {
        $make = CarMake::with('models')->findOrFail($id);

        return $this->success($make);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:car_makes',
            'country' => 'nullable|string|max:255',
        ]);

        $make = CarMake::create($validated);

        return $this->success($make->load('models'), 'Make created successfully.', 201);
    }

    public function update(Request $request, string $id)
    {
        $make = CarMake::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:car_makes,name,' . $make->id,
            'country' => 'nullable|string|max:255',
        ]);

        $make->update($validated);

        return $this->success($make->load('models'), 'Make updated successfully.');
    }

    public function destroy(string $id)
    {
        $make = CarMake::findOrFail($id);

        if ($make->listings()->count() > 0) {
            return $this->error('Cannot delete make with associated listings.', 409);
        }

        $make->models()->delete();
        $make->delete();

        return $this->success(null, 'Make deleted successfully.');
    }
}
