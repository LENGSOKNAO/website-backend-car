<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends ApiController
{
    public function index()
    {
        $categories = Category::withCount('cars')->orderBy('name')->get();

        return $this->success($categories);
    }

    public function show(string $id)
    {
        $category = Category::withCount('cars')->findOrFail($id);

        return $this->success($category);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $category = Category::create($validated);

        return $this->success($category, 'Category created successfully.', 201);
    }

    public function update(Request $request, string $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            'description' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $category->update($validated);

        return $this->success($category, 'Category updated successfully.');
    }

    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);

        if ($category->cars()->count() > 0) {
            return $this->error('Cannot delete category with associated cars.', 409);
        }

        $category->delete();

        return $this->success(null, 'Category deleted successfully.');
    }
}
