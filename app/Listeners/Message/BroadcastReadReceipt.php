<?php

namespace App\Listeners\Message;

use App\Events\MessageRead;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class BroadcastReadReceipt
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MessageRead $event): void
    {
        // The broadcast is handled automatically by Laravel's broadcasting system
        // This listener exists to satisfy the event mapping but doesn't need to do anything
        // The actual broadcasting is done by the MessageRead event implementing ShouldBroadcast
    }
}