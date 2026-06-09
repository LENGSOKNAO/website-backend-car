<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('car_listings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('seller_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('make_id')->constrained('car_makes')->cascadeOnDelete();
            $table->foreignUuid('model_id')->constrained('car_models')->cascadeOnDelete();
            $table->foreignUuid('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->integer('year');
            $table->decimal('price', 12, 2);
            $table->decimal('original_price', 12, 2)->nullable();
            $table->integer('mileage')->nullable();
            $table->string('fuel_type')->nullable();
            $table->string('transmission')->nullable();
            $table->string('engine_size')->nullable();
            $table->string('color')->nullable();
            $table->string('interior_color')->nullable();
            $table->string('condition')->default('used');
            $table->integer('number_of_owners')->nullable();
            $table->string('vin')->nullable()->unique();
            $table->string('license_plate')->nullable();
            $table->text('description')->nullable();
            $table->string('location')->nullable();
            $table->integer('views_count')->default(0);
            $table->string('status')->default('active');
            $table->timestamp('expires_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('car_listings');
    }
};
