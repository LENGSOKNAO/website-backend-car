<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('brand_categories');
    }

    public function down(): void
    {
        Schema::create('brand_categories', function ($table) {
            $table->id();
            $table->string('brand_slug');
            $table->string('label');
            $table->string('type');
            $table->json('sections')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }
};
