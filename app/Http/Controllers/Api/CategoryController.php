<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;

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
}
