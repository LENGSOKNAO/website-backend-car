<?php

namespace App\Database\Connectors;

use Illuminate\Database\Connectors\PostgresConnector as BasePostgresConnector;

class PostgresConnector extends BasePostgresConnector
{
    public function connect(array $config)
    {
        if (isset($config['host']) && preg_match('/^(ep-[^.]+)\./', $config['host'], $m)) {
            putenv('PGOPTIONS=endpoint=' . $m[1]);
        }

        return parent::connect($config);
    }
}
