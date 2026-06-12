<?php

use App\Models\Conversation;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.Conversation.{id}', function ($user, $id) {
    $conversation = Conversation::find($id);

    if (! $conversation) {
        return false;
    }

    return (int) $user->id === (int) $conversation->sender_id ||
           (int) $user->id === (int) $conversation->receiver_id;
});
