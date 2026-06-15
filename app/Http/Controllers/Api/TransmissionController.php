<?php

namespace App\Http\Controllers\Api;

use App\Models\Transmission;
use Illuminate\Http\Request;

class TransmissionController extends ApiController
{
    public function index()
    {
        $transmissions = Transmission::orderBy('name')->get();

        return $this->success($transmissions);
    }

    public function show(string $id)
    {
        $transmission = Transmission::findOrFail($id);

        return $this->success($transmission);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:transmissions',
        ]);

        $transmission = Transmission::create($validated);

        return $this->success($transmission, 'Transmission created successfully.', 201);
    }

    public function update(Request $request, string $id)
    {
        $transmission = Transmission::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:transmissions,name,' . $transmission->id,
        ]);

        $transmission->update($validated);

        return $this->success($transmission, 'Transmission updated successfully.');
    }

    public function destroy(string $id)
    {
        $transmission = Transmission::findOrFail($id);

        $transmission->delete();

        return $this->success(null, 'Transmission deleted successfully.');
    }
}
