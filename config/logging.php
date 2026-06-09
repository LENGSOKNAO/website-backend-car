<?php

return [

    'default' => env('LOG_CHANNEL', 'stderr'),

    'channels' => [

        'stderr' => [
            'driver' => 'monolog',
            'handler' => Monolog\Handler\StreamHandler::class,
            'with' => [
                'stream' => 'php://stderr',
                'mode' => 'a',
            ],
            'level' => env('LOG_LEVEL', 'debug'),
        ],

    ],

];