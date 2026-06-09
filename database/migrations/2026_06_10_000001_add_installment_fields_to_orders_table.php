<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('payment_method')->nullable()->after('notes');
            $table->decimal('down_payment', 12, 2)->nullable()->after('payment_method');
            $table->integer('loan_term')->nullable()->after('down_payment');
            $table->decimal('monthly_payment', 12, 2)->nullable()->after('loan_term');
            $table->json('accessories')->nullable()->after('monthly_payment');
            $table->timestamp('next_payment_due_at')->nullable()->after('accessories');
        });

        Schema::create('order_installments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('order_id')->constrained('orders')->cascadeOnDelete();
            $table->integer('month_number');
            $table->decimal('amount', 12, 2);
            $table->timestamp('due_at');
            $table->timestamp('paid_at')->nullable();
            $table->string('status')->default('pending');
            $table->string('transaction_id')->nullable();
            $table->timestamps();
            
            $table->unique(['order_id', 'month_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_installments');
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['payment_method', 'down_payment', 'loan_term', 'monthly_payment', 'accessories', 'next_payment_due_at']);
        });
    }
};