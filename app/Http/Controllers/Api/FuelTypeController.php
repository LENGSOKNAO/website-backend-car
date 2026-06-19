<?php

namespace App\Http\Controllers\Api;

use App\Models\FuelType;

class FuelTypeController extends ApiController
{
    public function index()
    {
        $fuelTypes = FuelType::orderBy('name')->get();

        return $this->success($fuelTypes);
    }

    public function show(string $id)
    {
        $fuelType = FuelType::findOrFail($id);

        return $this->success($fuelType);
    }
}
