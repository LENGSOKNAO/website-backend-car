<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VehicleHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleHistoryController extends Controller
{
    public function index()
    {
        $vehicleHistories = VehicleHistory::with(['listing' => function ($query) {
            $query->select('id', 'make_id', 'model_id')->with(['make:id,name', 'model:id,name']);
        }, 'createdBy'])->latest()->paginate(15);

        return Inertia::render('admin/vehicle-histories/index', [
            'vehicle_histories' => $vehicleHistories,
        ]);
    }

    public function show($id)
    {
        $vehicleHistory = VehicleHistory::with(['listing' => function ($query) {
            $query->select('id', 'make_id', 'model_id')->with(['make:id,name', 'model:id,name']);
        }, 'createdBy'])->findOrFail($id);

        return Inertia::render('admin/vehicle-histories/show', [
            'vehicle_history' => $vehicleHistory,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'listing_id' => 'required|exists:listings,id',
            'report_type' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'file_url' => 'nullable|string|max:2048',
            'summary' => 'nullable|string',
            'report_date' => 'required|date',
        ]);

        $validated['created_by'] = auth()->id();

        VehicleHistory::create($validated);

        return redirect()->route('admin.vehicle-histories.index')
            ->with('success', 'Vehicle history created successfully.');
    }

    public function update(Request $request, $id)
    {
        $vehicleHistory = VehicleHistory::findOrFail($id);

        $validated = $request->validate([
            'listing_id' => 'required|exists:listings,id',
            'report_type' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'file_url' => 'nullable|string|max:2048',
            'summary' => 'nullable|string',
            'report_date' => 'required|date',
        ]);

        $vehicleHistory->update($validated);

        return redirect()->route('admin.vehicle-histories.index')
            ->with('success', 'Vehicle history updated successfully.');
    }

    public function destroy($id)
    {
        $vehicleHistory = VehicleHistory::findOrFail($id);
        $vehicleHistory->delete();

        return redirect()->route('admin.vehicle-histories.index')
            ->with('success', 'Vehicle history deleted successfully.');
    }
}
