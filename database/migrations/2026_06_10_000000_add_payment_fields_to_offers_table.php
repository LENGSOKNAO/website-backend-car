<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('offers', function (Blueprint $table) {
            $table->string('payment_method')->nullable()->after('message');
            $table->decimal('down_payment', 12, 2)->nullable()->after('payment_method');
            $table->integer('loan_term')->nullable()->after('down_payment');
            $table->json('accessories')->nullable()->after('loan_term');
        });
    }

    public function down(): void
    {
        Schema::table('offers', function (Blueprint $table) {
            $table->dropColumn(['payment_method', 'down_payment', 'loan_term', 'accessories']);
        });
    }
};