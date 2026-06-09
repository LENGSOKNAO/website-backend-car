<?php

namespace Database\Seeders;

use App\Models\CarListing;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@example.com')->first();
        $sellers = User::whereIn('email', [
            'seller1@autodeals.com',
            'seller2@autodeals.com',
            'seller@example.com',
        ])->get();
        $buyers = User::whereIn('email', [
            'buyer1@example.com',
            'buyer2@example.com',
        ])->get();
        $staff = User::where('email', 'staff@example.com')->first();

        if ($sellers->isEmpty() || $buyers->isEmpty()) {
            $this->command->warn('Missing users for message seeding.');

            return;
        }

        $listings = CarListing::where('status', 'in_stock')->take(3)->get();

        $conversations = [
            [
                'users' => [$buyers->first(), $sellers->first()],
                'listing' => $listings[0] ?? null,
                'subject' => 'Question about your listing',
                'messages' => [
                    ['from' => 0, 'content' => "Hi, I'm interested in this vehicle. Is it still available?"],
                    ['from' => 1, 'content' => 'Yes, it is! Would you like to schedule a viewing?'],
                    ['from' => 0, 'content' => "That would be great. I'm free this weekend."],
                ],
            ],
            [
                'users' => [$buyers[1] ?? $buyers->first(), $sellers[1] ?? $sellers->first()],
                'listing' => ($listings[1] ?? $listings->first()),
                'subject' => 'Price negotiation',
                'messages' => [
                    ['from' => 0, 'content' => 'Hello, would you consider $2000 off the asking price?'],
                    ['from' => 1, 'content' => 'I can do $1000 off. Let me know if that works.'],
                ],
            ],
        ];

        if ($admin && $staff) {
            $conversations[] = [
                'users' => [$admin, $staff],
                'listing' => null,
                'subject' => 'Inventory update',
                'messages' => [
                    ['from' => 0, 'content' => 'Please review the new listings that came in today.'],
                    ['from' => 1, 'content' => "Sure, I'll take a look and get back to you."],
                    ['from' => 0, 'content' => 'Also, we need to update the prices on the 2023 models.'],
                ],
            ];
        }

        if ($admin && $sellers->isNotEmpty()) {
            $conversations[] = [
                'users' => [$admin, $sellers->first()],
                'listing' => null,
                'subject' => 'Dealer account verification',
                'messages' => [
                    ['from' => 1, 'content' => 'Hi, I submitted my dealer documents last week. Any update?'],
                    ['from' => 0, 'content' => "Yes, I've reviewed them. Everything looks good!"],
                    ['from' => 1, 'content' => 'Great, thank you for the quick response.'],
                ],
            ];
        }

        foreach ($conversations as $data) {
            $sender = $data['users'][0];
            $receiver = $data['users'][1];

            $conv = Conversation::firstOrCreate(
                [
                    'sender_id' => $sender->id,
                    'receiver_id' => $receiver->id,
                ],
                [
                    'listing_id' => $data['listing']?->id,
                    'subject' => $data['subject'],
                    'last_message_at' => now()->subHours(count($data['messages'])),
                ]
            );

            foreach ($data['messages'] as $i => $msgData) {
                $user = $data['users'][$msgData['from']];
                $createdAt = (clone $conv->created_at)->addMinutes($i * 15);

                Message::firstOrCreate(
                    [
                        'conversation_id' => $conv->id,
                        'sender_id' => $user->id,
                        'content' => $msgData['content'],
                    ],
                    [
                        'created_at' => $createdAt,
                        'updated_at' => $createdAt,
                        'read_at' => $i < count($data['messages']) - 1 ? $createdAt : null,
                    ]
                );

                $conv->update(['last_message_at' => $createdAt]);
            }
        }

        $this->command->info('Seeded '.Conversation::count().' conversations with messages.');
    }
}
