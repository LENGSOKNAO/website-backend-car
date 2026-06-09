<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Condition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConditionController extends Controller
{
    public function index()
    {
        $conditions = Condition::latest()->paginate(10);

        return Inertia::render('admin/conditions/index', [
            'conditions' => $conditions,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:conditions',
        ]);

        Condition::create($validated);

        return redirect()->route('admin.conditions.index')
            ->with('success', 'Condition created successfully.');
    }

    public function update(Request $request, Condition $condition)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:conditions,name,'.$condition->id,
        ]);

        $condition->update($validated);

        return redirect()->route('admin.conditions.index')
            ->with('success', 'Condition updated successfully.');
    }

    public function destroy(Condition $condition)
    {
        $condition->delete();

        return redirect()->route('admin.conditions.index')
            ->with('success', 'Condition deleted successfully.');
    }
}
