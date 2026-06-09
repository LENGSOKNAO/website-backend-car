<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        //
    ];

    /**
     * The event mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $broadcast = [
        \App\Events\MessageCreated::class => [
            \App\Listeners\Message\UpdateReadStatus::class,
        ],
        \App\Events\MessageRead::class => [
            \App\Listeners\Message\BroadcastReadReceipt::class,
        ],
        \App\Events\TypingStarted::class => [],
        \App\Events\TypingStopped::class => [],
        \App\Events\UserOnline::class => [],
        \App\Events\UserOffline::class => [],
        \App\Events\SellerDashboardUpdated::class => [],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        parent::boot();

        //
    }
}