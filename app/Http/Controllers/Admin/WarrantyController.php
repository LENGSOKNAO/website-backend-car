<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Warranty;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WarrantyController extends Controller
{
    public function index()
    {
        $warranties = Warranty::with(['order', 'listing' => function ($query) {
            $query->select('id', 'make_id', 'model_id')->with(['make:id,name', 'model:id,name']);
        }])->latest()->paginate(15);

        return Inertia::render('admin/warranties/index', [
            'warranties' => $warranties,
        ]);
    }

    public function show($id)
    {
        $warranty = Warranty::with(['order', 'listing' => function ($query) {
            $query->select('id', 'make_id', 'model_id')->with(['make:id,name', 'model:id,name']);
        }])->findOrFail($id);

        return Inertia::render('admin/warranties/show', [
            'warranty' => $warranty,
        ]);
    }

    public function update(Request $request, $id)
    {
        $warranty = Warranty::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string|max:255',
            'coverage_details' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $warranty->update($validated);

        return redirect()->back()->with('success', 'Warranty updated successfully.');
    }

    public function destroy($id)
    {
        $warranty = Warranty::findOrFail($id);
        $warranty->delete();

        return redirect()->route('admin.warranties.index')
            ->with('success', 'Warranty deleted successfully.');
    }
}
