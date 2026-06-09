<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('car_listings', function (Blueprint $table) {
            $table->integer('total')->default(0)->after('status');
        });

        DB::statement("UPDATE car_listings SET total = 1 WHERE status = 'active'");
        DB::statement("UPDATE car_listings SET total = 0 WHERE status != 'active'");
    }

    public function down(): void
    {
        Schema::table('car_listings', function (Blueprint $table) {
            $table->dropColumn('total');
        });
    }
};
