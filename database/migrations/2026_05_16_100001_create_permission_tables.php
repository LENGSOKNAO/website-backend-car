<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $tableNames = config('permission.table_names');
        $columnNames = config('permission.column_names');
        $teams = config('permission.teams');

        $schema = Schema::getConnection()->getSchemaBuilder();

        $schema->create($tableNames['permissions'], function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('guard_name');
            $table->timestamps();
        });

        $schema->create($tableNames['roles'], function (Blueprint $table) use ($teams, $columnNames) {
            $table->uuid('id')->primary();
            if ($teams || config('permission.testing')) {
                $table->foreignUuid($columnNames['team_foreign_key'])->nullable()->constrained('teams')->cascadeOnDelete();
            }
            $table->string('name');
            $table->string('guard_name');
            $table->timestamps();
        });

        $schema->create($tableNames['model_has_permissions'], function (Blueprint $table) use ($tableNames, $columnNames, $teams) {
            $table->uuid('permission_id');
            $table->string('model_type');
            $table->uuid('model_id');
            $table->index([$columnNames['model_morph_key'], 'model_type'], 'model_has_permissions_model_id_model_type_index');
            $table->foreign('permission_id')->references('id')->on($tableNames['permissions'])->cascadeOnDelete();
            if ($teams) {
                $table->foreignUuid($columnNames['team_foreign_key'])->nullable();
            }
            $primaryKey = [$columnNames['model_morph_key'], 'model_type', 'permission_id'];
            if ($teams) {
                array_unshift($primaryKey, $columnNames['team_foreign_key']);
            }
            $table->primary($primaryKey, 'model_has_permissions_permission_model_type_primary');
        });

        $schema->create($tableNames['model_has_roles'], function (Blueprint $table) use ($tableNames, $columnNames, $teams) {
            $table->uuid('role_id');
            $table->string('model_type');
            $table->uuid('model_id');
            $table->index([$columnNames['model_morph_key'], 'model_type'], 'model_has_roles_model_id_model_type_index');
            $table->foreign('role_id')->references('id')->on($tableNames['roles'])->cascadeOnDelete();
            if ($teams) {
                $table->foreignUuid($columnNames['team_foreign_key'])->nullable();
            }
            $primaryKey = [$columnNames['model_morph_key'], 'model_type', 'role_id'];
            if ($teams) {
                array_unshift($primaryKey, $columnNames['team_foreign_key']);
            }
            $table->primary($primaryKey, 'model_has_roles_role_model_type_primary');
        });

        $schema->create($tableNames['role_has_permissions'], function (Blueprint $table) use ($tableNames) {
            $table->uuid('permission_id');
            $table->uuid('role_id');
            $table->foreign('permission_id')->references('id')->on($tableNames['permissions'])->cascadeOnDelete();
            $table->foreign('role_id')->references('id')->on($tableNames['roles'])->cascadeOnDelete();
            $table->primary(['permission_id', 'role_id'], 'role_has_permissions');
        });

        app('cache')->store(config('permission.cache.store') !== 'default' ? config('permission.cache.store') : null)->forget(config('permission.cache.key'));
    }

    public function down(): void
    {
        $tableNames = config('permission.table_names');
        $schema = Schema::getConnection()->getSchemaBuilder();
        $schema->dropIfExists($tableNames['role_has_permissions']);
        $schema->dropIfExists($tableNames['model_has_roles']);
        $schema->dropIfExists($tableNames['model_has_permissions']);
        $schema->dropIfExists($tableNames['roles']);
        $schema->dropIfExists($tableNames['permissions']);
    }
};
