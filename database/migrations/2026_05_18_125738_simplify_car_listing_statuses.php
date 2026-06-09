<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("UPDATE car_listings SET status = 'in_stock' WHERE total > 0");
        DB::statement("UPDATE car_listings SET status = 'coming_soon' WHERE total = 0 AND expected_arrival IS NOT NULL");
        DB::statement("UPDATE car_listings SET status = 'out_of_stock' WHERE total = 0 AND expected_arrival IS NULL");
    }

    public function down(): void
    {
        DB::statement("UPDATE car_listings SET status = 'active' WHERE status = 'in_stock'");
        DB::statement("UPDATE car_listings SET status = 'active' WHERE status = 'out_of_stock'");
    }
};
