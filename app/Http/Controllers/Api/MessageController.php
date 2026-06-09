<?php

namespace App\Http\Controllers\Api;

use App\Models\Conversation;
use App\Models\Message;
use App\Events\MessageCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends ApiController
{
    public function conversations()
    {
        $userId = auth()->id();

        $conversations = Conversation::with('sender', 'receiver', 'listing.make', 'listing.model')
            ->where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->latest('last_message_at')
            ->get()
            ->map(function ($conv) use ($userId) {
                $otherUser = $conv->sender_id === $userId ? $conv->receiver : $conv->sender;
                $lastMsg = Message::where('conversation_id', $conv->id)->latest()->first();

                return [
                    'id' => $conv->id,
                    'other_user' => ['id' => $otherUser->id, 'full_name' => $otherUser->full_name],
                    'subject' => $conv->subject,
                    'listing' => $conv->listing ? [
                        'title' => ($conv->listing->make->name ?? '').' '.($conv->listing->model->name ?? ''),
                    ] : null,
                    'last_message' => $lastMsg?->content,
                    'last_message_at' => $conv->last_message_at,
                    'unread' => $lastMsg && $lastMsg->sender_id !== $userId && ! $lastMsg->read_at,
                ];
            });

        return $this->success($conversations);
    }

    public function messages(string $id)
    {
        $userId = auth()->id();

        $conversation = Conversation::where(function ($q) use ($userId) {
            $q->where('sender_id', $userId)->orWhere('receiver_id', $userId);
        })->findOrFail($id);

        $messages = Message::with('sender')
            ->where('conversation_id', $id)
            ->oldest()
            ->get()
            ->map(fn ($m) => [
                'id' => $m->id,
                'sender_id' => $m->sender_id,
                'sender_name' => $m->sender->full_name,
                'content' => $m->content,
                'read_at' => $m->read_at,
                'created_at' => $m->created_at,
                'is_mine' => $m->sender_id === $userId,
            ]);

        return $this->success($messages);
    }

    public function send(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'receiver_id' => 'required|exists:users,id',
            'listing_id' => 'nullable|exists:car_listings,id',
            'content' => 'required|string|max:5000',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $conversation = Conversation::where(function ($q) use ($request) {
            $q->where([
                ['sender_id', auth()->id()],
                ['receiver_id', $request->receiver_id],
            ])->orWhere([
                ['sender_id', $request->receiver_id],
                ['receiver_id', auth()->id()],
            ]);
        });

        if ($request->listing_id) {
            $conversation->where('listing_id', $request->listing_id);
        }

        $conversation = $conversation->first();

        if (! $conversation) {
            $conversation = Conversation::create([
                'sender_id' => auth()->id(),
                'receiver_id' => $request->receiver_id,
                'listing_id' => $request->listing_id ?? null,
                'last_message_at' => now(),
            ]);
        }

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => auth()->id(),
            'content' => $request->content,
        ]);

        $conversation->update(['last_message_at' => now()]);

        // Broadcast the message creation event
        event(new MessageCreated($message));

        return $this->success($message, 'Message sent', 201);
    }

    public function reply(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:5000',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $conversation = Conversation::where(function ($q) {
            $q->where('sender_id', auth()->id())->orWhere('receiver_id', auth()->id());
        })->findOrFail($id);

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => auth()->id(),
            'content' => $request->content,
        ]);

        $conversation->update(['last_message_at' => now()]);

        // Broadcast the message creation event
        event(new MessageCreated($message));

        return $this->success($message, 'Reply sent', 201);
    }

    public function markRead(string $id)
    {
        $conversation = Conversation::where(function ($q) {
            $q->where('sender_id', auth()->id())->orWhere('receiver_id', auth()->id());
        })->findOrFail($id);

        $unreadMessages = Message::where('conversation_id', $conversation->id)
            ->where('sender_id', '!=', auth()->id())
            ->whereNull('read_at')
            ->get();

        // Mark messages as read
        $unreadMessages->each->update(['read_at' => now()]);

        // Broadcast read status for each message
        foreach ($unreadMessages as $message) {
            event(new \App\Events\MessageRead($message));
        }

        return $this->success(null, 'Marked as read');
    }
}
