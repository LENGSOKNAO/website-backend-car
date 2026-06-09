<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transmission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransmissionController extends Controller
{
    public function index()
    {
        $transmissions = Transmission::latest()->paginate(10);

        return Inertia::render('admin/transmissions/index', [
            'transmissions' => $transmissions,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:transmissions',
        ]);

        Transmission::create($validated);

        return redirect()->route('admin.transmissions.index')
            ->with('success', 'Transmission created successfully.');
    }

    public function update(Request $request, Transmission $transmission)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:transmissions,name,'.$transmission->id,
        ]);

        $transmission->update($validated);

        return redirect()->route('admin.transmissions.index')
            ->with('success', 'Transmission updated successfully.');
    }

    public function destroy(Transmission $transmission)
    {
        $transmission->delete();

        return redirect()->route('admin.transmissions.index')
            ->with('success', 'Transmission deleted successfully.');
    }
}
