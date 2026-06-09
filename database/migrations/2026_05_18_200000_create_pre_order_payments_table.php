<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pre_order_payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('pre_order_id')->constrained('pre_orders')->cascadeOnDelete();
            $table->decimal('amount', 12, 2);
            $table->string('payment_type')->default('deposit');
            $table->string('payment_method')->nullable();
            $table->string('reference')->nullable();
            $table->date('payment_date');
            $table->string('status')->default('completed');
            $table->text('notes')->nullable();
            $table->foreignUuid('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pre_order_payments');
    }
};
