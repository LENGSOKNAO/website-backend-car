<?php

namespace App\Database\Connectors;

use Illuminate\Database\Connectors\PostgresConnector as BasePostgresConnector;

class PostgresConnector extends BasePostgresConnector
{
    public function connect(array $config)
    {
        // Set endpoint identifier for Neon
        if (isset($config['host']) && preg_match('/^(ep-[^.]+)\./', $config['host'], $m)) {
            putenv('PGOPTIONS=endpoint=' . $m[1]);
        }

        // Set SSL mode for Neon (requires SSL)
        $sslmode = $config['sslmode'] ?? 'prefer';
        putenv('PGSSLMODE=' . $sslmode);

        return parent::connect($config);
    }

}
