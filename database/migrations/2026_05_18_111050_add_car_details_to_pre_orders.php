<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pre_orders', function (Blueprint $table) {
            $table->string('trim_level')->nullable()->after('interior_color');
            $table->string('engine_preference')->nullable()->after('trim_level');
            $table->string('transmission_preference')->nullable()->after('engine_preference');
            $table->string('drivetrain_preference')->nullable()->after('transmission_preference');
            $table->string('fuel_type')->nullable()->after('drivetrain_preference');
            $table->integer('year_min')->nullable()->after('fuel_type');
            $table->integer('year_max')->nullable()->after('year_min');
            $table->integer('mileage_max')->nullable()->after('year_max');
            $table->text('special_requests')->nullable()->after('internal_notes');
        });
    }

    public function down(): void
    {
        Schema::table('pre_orders', function (Blueprint $table) {
            $table->dropColumn([
                'trim_level', 'engine_preference', 'transmission_preference',
                'drivetrain_preference', 'fuel_type', 'year_min', 'year_max',
                'mileage_max', 'special_requests',
            ]);
        });
    }
};
