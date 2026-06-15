<?php

namespace App\Http\Controllers\Api;

use App\Models\Condition;
use Illuminate\Http\Request;

class ConditionController extends ApiController
{
    public function index()
    {
        $conditions = Condition::orderBy('name')->get();

        return $this->success($conditions);
    }

    public function show(string $id)
    {
        $condition = Condition::findOrFail($id);

        return $this->success($condition);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:conditions',
        ]);

        $condition = Condition::create($validated);

        return $this->success($condition, 'Condition created successfully.', 201);
    }

    public function update(Request $request, string $id)
    {
        $condition = Condition::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:conditions,name,' . $condition->id,
        ]);

        $condition->update($validated);

        return $this->success($condition, 'Condition updated successfully.');
    }

    public function destroy(string $id)
    {
        $condition = Condition::findOrFail($id);

        $condition->delete();

        return $this->success(null, 'Condition deleted successfully.');
    }
}
