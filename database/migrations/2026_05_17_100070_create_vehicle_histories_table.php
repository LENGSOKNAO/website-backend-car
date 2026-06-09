<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicle_histories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('listing_id')->constrained('car_listings')->cascadeOnDelete();
            $table->string('report_type'); // inspection, carfax, autocheck, service_record
            $table->string('title');
            $table->string('file_url')->nullable();
            $table->text('summary')->nullable();
            $table->date('report_date')->nullable();
            $table->foreignUuid('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicle_histories');
    }
};
