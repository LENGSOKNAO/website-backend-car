<?php

namespace App\Listeners\Message;

use App\Events\MessageCreated;
use App\Models\Message;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateReadStatus
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
    public function handle(MessageCreated $event): void
    {
        // This listener currently does nothing for MessageCreated
        // You can add logic here if needed, such as notifications
    }
}