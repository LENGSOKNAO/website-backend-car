<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->string('tagline')->nullable()->after('subtitle');
            $table->text('description')->nullable()->after('tagline');
            $table->string('button_text')->nullable()->after('link_url');
            $table->string('button_url')->nullable()->after('button_text');
            $table->string('badge_text')->nullable()->after('button_url');
            $table->string('brand_slug')->nullable()->after('badge_text');
        });
    }

    public function down(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn(['tagline', 'description', 'button_text', 'button_url', 'badge_text', 'brand_slug']);
        });
    }
};
