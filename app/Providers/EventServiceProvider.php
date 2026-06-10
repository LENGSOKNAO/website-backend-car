<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

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

        $this->booting(function () {
            foreach ($this->broadcast as $event => $listeners) {
                foreach (array_unique($listeners, SORT_REGULAR) as $listener) {
                    Event::listen($event, $listener);
                }
            }
        });
    }

            // Setup broadcasting if the event implements ShouldBroadcast
            if (class_exists($event) && is_subclass_of($event, 'Illuminate\Contracts\Broadcasting\ShouldBroadcast')) {
                // The event's broadcastOn() method will be automatically called by Laravel's
                // broadcasting system when the event is dispatched
                // This ensures events in $broadcast array are properly broadcast
            }
        }
    }
}