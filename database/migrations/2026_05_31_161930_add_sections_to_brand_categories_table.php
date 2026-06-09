<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('brand_categories', function (Blueprint $table) {
            $table->json('sections')->nullable()->after('type');
            $table->dropColumn('items');
        });
    }

    public function down(): void
    {
        Schema::table('brand_categories', function (Blueprint $table) {
            $table->json('items')->nullable()->after('type');
            $table->dropColumn('sections');
        });
    }
};
