<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('heroes', function (Blueprint $table) {
            $table->dropColumn(['tagline', 'description', 'badge_text']);
        });
    }

    public function down(): void
    {
        Schema::table('heroes', function (Blueprint $table) {
            $table->string('tagline')->nullable()->after('subtitle');
            $table->text('description')->nullable()->after('tagline');
            $table->string('badge_text')->nullable()->after('description');
        });
    }
};
