<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_appointments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('customer_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('listing_id')->nullable()->constrained('car_listings')->nullOnDelete();
            $table->string('service_type'); // maintenance, repair, inspection, recall
            $table->text('description')->nullable();
            $table->date('scheduled_date');
            $table->time('scheduled_time')->nullable();
            $table->integer('mileage')->nullable();
            $table->string('status')->default('pending'); // pending, confirmed, in_progress, completed, cancelled
            $table->text('technician_notes')->nullable();
            $table->decimal('cost', 12, 2)->nullable();
            $table->foreignUuid('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_appointments');
    }
};
