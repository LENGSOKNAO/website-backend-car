<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('car_listings', function (Blueprint $table) {
            $table->date('order_date')->nullable()->after('expires_at');
            $table->date('expected_arrival')->nullable()->after('order_date');
            $table->date('actual_arrival')->nullable()->after('expected_arrival');
        });
    }

    public function down(): void
    {
        Schema::table('car_listings', function (Blueprint $table) {
            $table->dropColumn(['order_date', 'expected_arrival', 'actual_arrival']);
        });
    }
};
