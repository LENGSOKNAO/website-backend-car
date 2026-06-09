<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('ALTER TABLE heroes ALTER COLUMN subtitle TYPE json USING subtitle::json');
        DB::statement('ALTER TABLE heroes ALTER COLUMN subtitle DROP NOT NULL');
        DB::statement('ALTER TABLE heroes ALTER COLUMN subtitle DROP DEFAULT');
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE heroes ALTER COLUMN subtitle TYPE varchar(255) USING subtitle::varchar');
        DB::statement('ALTER TABLE heroes ALTER COLUMN subtitle DROP NOT NULL');
    }
};
