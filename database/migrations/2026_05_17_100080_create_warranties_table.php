<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('warranties', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('order_id')->constrained('orders')->cascadeOnDelete();
            $table->foreignUuid('listing_id')->nullable()->constrained('car_listings')->nullOnDelete();
            $table->string('type'); // powertrain, bumper_to_bumper, extended, certified
            $table->string('name');
            $table->text('coverage_details')->nullable();
            $table->integer('duration_months');
            $table->integer('duration_miles')->nullable();
            $table->decimal('price', 12, 2)->default(0);
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('status')->default('active'); // active, expired, cancelled, claimed
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('warranties');
    }
};
