<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends ApiController
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'primaryImage'])
            ->where('status', 'active');

        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->brand) {
            $query->where('brand', $request->brand);
        }

        if ($request->condition) {
            $query->where('condition', $request->condition);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%")
                    ->orWhere('brand', 'like', "%{$request->search}%");
            });
        }

        $products = $query->latest()->paginate($request->per_page ?? 15);

        return $this->success($products);
    }

    public function show(string $id)
    {
        $product = Product::with([
            'category', 'images', 'seller',
        ])->findOrFail($id);

        $product->increment('views_count');

        return $this->success($product);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'stock_quantity' => 'nullable|integer|min:0',
            'sku' => 'nullable|string|unique:products',
            'condition' => 'nullable|string',
            'brand' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $product = Product::create([
            ...$validator->validated(),
            'seller_id' => auth()->id(),
            'status' => 'active',
        ]);

        return $this->success($product->load(['category', 'primaryImage']), 'Product created', 201);
    }

    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        if ($product->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'stock_quantity' => 'nullable|integer|min:0',
            'sku' => 'nullable|string|unique:products,sku,' . $id,
            'condition' => 'nullable|string',
            'brand' => 'nullable|string|max:255',
            'status' => 'sometimes|in:active,inactive,out_of_stock',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $product->update($validator->validated());

        return $this->success($product->fresh()->load(['category', 'primaryImage']), 'Product updated');
    }

    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);

        if ($product->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        $product->delete();

        return $this->success(null, 'Product deleted');
    }

    public function uploadImage(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        if ($product->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        $validator = Validator::make($request->all(), [
            'image_url' => 'required|string',
            'is_primary' => 'boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $maxSort = $product->images()->max('sort_order') ?? 0;

        $image = ProductImage::create([
            'product_id' => $product->id,
            'image_url' => $request->image_url,
            'is_primary' => $request->is_primary ?? false,
            'sort_order' => $request->is_primary ? 0 : $maxSort + 1,
            'uploaded_at' => now(),
        ]);

        if ($request->is_primary) {
            $product->images()
                ->where('id', '!=', $image->id)
                ->where('is_primary', true)
                ->update(['is_primary' => false]);
        }

        return $this->success($image, 'Image uploaded', 201);
    }
}
