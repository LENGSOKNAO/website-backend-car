<?php

namespace App\Http\Controllers\Api;

use App\Models\CarMake;
use App\Models\CarModel;

class ModelController extends ApiController
{
    public function index()
    {
        $models = CarModel::with('make')->orderBy('name')->get();

        return $this->success($models);
    }

    public function show(string $id)
    {
        $model = CarModel::with('make')->findOrFail($id);

        return $this->success($model);
    }

    public function byMake(string $makeId)
    {
        $make = CarMake::findOrFail($makeId);

        $models = $make->models()->orderBy('name')->get();

        return $this->success($models);
    }
}
