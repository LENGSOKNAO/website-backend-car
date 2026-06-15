<?php

namespace App\Http\Controllers\Api;

use App\Models\Condition;

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
}
