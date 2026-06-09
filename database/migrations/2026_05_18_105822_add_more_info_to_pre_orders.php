<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pre_orders', function (Blueprint $table) {
            $table->string('color')->nullable()->after('quantity');
            $table->string('interior_color')->nullable()->after('color');
            $table->decimal('budget_min', 12, 2)->nullable()->after('interior_color');
            $table->decimal('budget_max', 12, 2)->nullable()->after('budget_min');
            $table->string('source')->nullable()->after('budget_max');
            $table->string('preferred_contact')->default('email')->after('source');
            $table->text('internal_notes')->nullable()->after('notes');
        });
    }

    public function down(): void
    {
        Schema::table('pre_orders', function (Blueprint $table) {
            $table->dropColumn(['color', 'interior_color', 'budget_min', 'budget_max', 'source', 'preferred_contact', 'internal_notes']);
        });
    }
};
