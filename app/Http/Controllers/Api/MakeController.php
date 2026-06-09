<?php

namespace App\Http\Controllers\Api;

use App\Models\CarMake;

class MakeController extends ApiController
{
    public function index()
    {
        $makes = CarMake::with('models')->orderBy('name')->get();

        return $this->success($makes);
    }

    public function show(string $id)
    {
        $make = CarMake::with('models')->findOrFail($id);

        return $this->success($make);
    }
}
