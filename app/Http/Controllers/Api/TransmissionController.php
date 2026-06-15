<?php

namespace App\Http\Controllers\Api;

use App\Models\Transmission;

class TransmissionController extends ApiController
{
    public function index()
    {
        $transmissions = Transmission::orderBy('name')->get();

        return $this->success($transmissions);
    }

    public function show(string $id)
    {
        $transmission = Transmission::findOrFail($id);

        return $this->success($transmission);
    }
}
