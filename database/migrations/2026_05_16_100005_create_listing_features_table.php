<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('listing_features', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('category')->nullable();
            $table->timestamps();
        });

        Schema::create('car_listing_feature', function (Blueprint $table) {
            $table->foreignUuid('listing_id')->constrained('car_listings')->cascadeOnDelete();
            $table->foreignUuid('feature_id')->constrained('listing_features')->cascadeOnDelete();
            $table->primary(['listing_id', 'feature_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('car_listing_feature');
        Schema::dropIfExists('listing_features');
    }
};
