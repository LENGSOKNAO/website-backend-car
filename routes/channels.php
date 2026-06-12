<?php

use App\Models\Conversation;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.Conversation.{id}', function ($user, $id) {
    $conversation = Conversation::find($id);

    if (! $conversation) {
        return false;
    }

    return (string) $user->id === (string) $conversation->sender_id ||
           (string) $user->id === (string) $conversation->receiver_id;
});
