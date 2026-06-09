<?php

namespace App\Http\Controllers\Api;

use App\Models\Hero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HeroController extends ApiController
{
    public function index(Request $request)
    {
        $query = Hero::ordered();

        if (!$request->user('api')) {
            $query->active();
        }

        if ($request->user('api')) {
            $query->where('seller_id', $request->user('api')->id);
        }

        $heroes = $query->get();

        return $this->success($heroes);
    }

    public function show(string $id)
    {
        $hero = Hero::findOrFail($id);

        return $this->success($hero);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|array',
            'subtitle.*.text' => 'required_with:subtitle|string|max:255',
            'subtitle.*.product_id' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $hero = Hero::create(array_merge(
            $validator->validated(),
            ['seller_id' => $request->user('api')->id]
        ));

        return $this->success($hero, 'Hero created', 201);
    }

    public function update(Request $request, string $id)
    {
        $hero = Hero::findOrFail($id);

        if ($hero->seller_id !== $request->user('api')->id) {
            return $this->error('Forbidden', 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'subtitle' => 'nullable|array',
            'subtitle.*.text' => 'required_with:subtitle|string|max:255',
            'subtitle.*.product_id' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $hero->update($validator->validated());

        return $this->success($hero->fresh(), 'Hero updated');
    }

    public function destroy(string $id)
    {
        $hero = Hero::findOrFail($id);

        if ($hero->seller_id !== request()->user('api')->id) {
            return $this->error('Forbidden', 403);
        }

        $hero->delete();

        return $this->success(null, 'Hero deleted');
    }
}
