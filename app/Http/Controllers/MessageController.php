<?php

namespace App\Http\Controllers;

use App\Events\MessageCreated;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function create(Request $request)
    {
        $authId = auth()->id();

        $users = User::where('id', '!=', $authId)
            ->select('id', 'full_name', 'email', 'type')
            ->get()
            ->map(function ($user) use ($authId) {
                $user->has_ordered_from_me = $user->type === 'customer'
                    && Order::where('buyer_id', $user->id)
                        ->where('seller_id', $authId)
                        ->exists();

                return $user;
            });

        return Inertia::render('messages/create', [
            'users' => $users,
            'receiver_id' => $request->query('receiver_id'),
        ]);
    }

    public function index()
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
                    'other_user' => [
                        'id' => $otherUser->id,
                        'full_name' => $otherUser->full_name,
                    ],
                    'subject' => $conv->subject,
                    'listing' => $conv->listing ? [
                        'id' => $conv->listing->id,
                        'title' => ($conv->listing->make->name ?? '').' '.($conv->listing->model->name ?? ''),
                    ] : null,
                    'last_message' => $lastMsg?->content,
                    'last_message_at' => $conv->last_message_at,
                    'unread' => $lastMsg && $lastMsg->sender_id !== $userId && ! $lastMsg->read_at,
                ];
            });

        return Inertia::render('messages/index', [
            'conversations' => $conversations,
        ]);
    }

    public function show(string $id)
    {
        $userId = auth()->id();

        $conversation = Conversation::with('sender', 'receiver', 'listing.make', 'listing.model')
            ->where(function ($q) use ($userId) {
                $q->where('sender_id', $userId)->orWhere('receiver_id', $userId);
            })
            ->findOrFail($id);

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
                'edited_at' => $m->edited_at,
                'deleted_at' => $m->deleted_at,
                'created_at' => $m->created_at,
                'is_mine' => $m->sender_id === $userId,
            ]);

        $otherUser = $conversation->sender_id === $userId ? $conversation->receiver : $conversation->sender;

        return Inertia::render('messages/show', [
            'conversation' => [
                'id' => $conversation->id,
                'subject' => $conversation->subject,
                'other_user' => [
                    'id' => $otherUser->id,
                    'full_name' => $otherUser->full_name,
                ],
                'listing' => $conversation->listing ? [
                    'id' => $conversation->listing->id,
                    'title' => ($conversation->listing->make->name ?? '').' '.($conversation->listing->model->name ?? ''),
                ] : null,
            ],
            'messages' => $messages,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'listing_id' => 'nullable|exists:car_listings,id',
            'subject' => 'nullable|string|max:255',
            'content' => 'required|string|max:5000',
        ]);

        $conversation = Conversation::where(function ($q) use ($validated) {
            $q->where([
                ['sender_id', auth()->id()],
                ['receiver_id', $validated['receiver_id']],
            ])->orWhere([
                ['sender_id', $validated['receiver_id']],
                ['receiver_id', auth()->id()],
            ]);
        });

        if (! empty($validated['listing_id'])) {
            $conversation->where('listing_id', $validated['listing_id']);
        }

        $conversation = $conversation->first();

        if (! $conversation) {
            $conversation = Conversation::create([
                'sender_id' => auth()->id(),
                'receiver_id' => $validated['receiver_id'],
                'listing_id' => $validated['listing_id'] ?? null,
                'subject' => $validated['subject'] ?? null,
                'last_message_at' => now(),
            ]);
        }

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => auth()->id(),
            'content' => $validated['content'],
        ]);

        try {
            event(new MessageCreated($message));
        } catch (\Throwable $e) {
            Log::warning('Failed to broadcast message: ' . $e->getMessage());
        }

        $conversation->update(['last_message_at' => now()]);

        return redirect()->route('messages.show', $conversation->id)
            ->with('success', 'Message sent.');
    }

    public function storeMessage(Request $request, string $id)
    {
        $conversation = Conversation::where(function ($q) {
            $q->where('sender_id', auth()->id())->orWhere('receiver_id', auth()->id());
        })->findOrFail($id);

        $validated = $request->validate([
            'content' => 'required|string|max:5000',
        ]);

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => auth()->id(),
            'content' => $validated['content'],
        ]);

        try {
            event(new MessageCreated($message));
        } catch (\Throwable $e) {
            Log::warning('Failed to broadcast message: ' . $e->getMessage());
        }

        $conversation->update(['last_message_at' => now()]);

        return redirect()->route('messages.show', $conversation->id);
    }

    public function updateMessage(Request $request, string $id)
    {
        $message = Message::where('sender_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'content' => 'required|string|max:5000',
        ]);

        $message->update([
            'content' => $validated['content'],
            'edited_at' => now(),
        ]);

        return redirect()->back();
    }

    public function destroyMessage(string $id)
    {
        $message = Message::where('sender_id', auth()->id())->findOrFail($id);

        $message->delete();

        return redirect()->back();
    }

    public function fetchMessages(string $id)
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
                'edited_at' => $m->edited_at,
                'deleted_at' => $m->deleted_at,
                'created_at' => $m->created_at,
                'is_mine' => $m->sender_id === $userId,
            ]);

        return response()->json($messages);
    }
}
