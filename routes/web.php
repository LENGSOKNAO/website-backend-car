<?php

use App\Http\Controllers\Admin\CarController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ConditionController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\FuelTypeController;
use App\Http\Controllers\Admin\MakeController;
use App\Http\Controllers\Admin\MakesModelsController;
use App\Http\Controllers\Admin\ModelController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\PreOrderController;
use App\Http\Controllers\Admin\SellerController;
use App\Http\Controllers\Admin\ServiceAppointmentController;
use App\Http\Controllers\Admin\TransmissionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VehicleHistoryController;
use App\Http\Controllers\Admin\WarrantyController;
use App\Http\Controllers\Buyer\SavedListingController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\Seller\ProfileController;
use App\Http\Controllers\Seller\ReviewController;
use App\Models\StoredFile;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

function serveStoredFile(App\Models\StoredFile $file)
{
    $data = $file->data;
    if (is_resource($data)) {
        $data = stream_get_contents($data);
    }

    if (filter_var($data, FILTER_VALIDATE_URL)) {
        $blobToken = env('BLOB_READ_WRITE_TOKEN');
        if ($blobToken) {
            $blobResponse = Http::withToken($blobToken)
                ->timeout(10)
                ->get($data);

            if ($blobResponse->successful()) {
                return response($blobResponse->body(), 200)
                    ->header('Content-Type', $file->mime_type)
                    ->header('Content-Length', $file->size)
                    ->header('Cache-Control', 'public, s-maxage=86400, max-age=31536000, immutable')
                    ->header('Vercel-CDN-Cache-Control', 'public, max-age=86400');
            }
        }
        abort(404);
    }

    return response($data, 200)
        ->header('Content-Type', $file->mime_type)
        ->header('Content-Length', $file->size)
        ->header('Cache-Control', 'public, s-maxage=86400, max-age=31536000, immutable')
        ->header('Vercel-CDN-Cache-Control', 'public, max-age=86400');
}

// Serve storage files (handles /storage/* routes from Vercel)
Route::get('/storage/{path}', function (string $path) {
    // Try to serve from database by matching UUID in path
    $pathParts = explode('/', $path);
    $lastPart = end($pathParts);
    
    if (preg_match('/^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.(png|jpg|jpeg|gif|webp|avif|svg)$/i', $lastPart, $matches)) {
        $file = StoredFile::find($matches[1]);
        if ($file) return serveStoredFile($file);
    }
    
    // Fall back to filesystem storage
    $disk = Storage::disk('public');
    if (!$disk->exists($path)) abort(404);
    return response()->file($disk->path($path));
})->where('path', '.*');

// Handle direct file requests like /{uuid}.png or /{uuid} (for frontend compatibility)
Route::get('/{id}.{extension}', function ($id, $extension) {
    $allowedExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'svg'];
    $extension = strtolower($extension);
    if (!in_array($extension, $allowedExtensions)) {
        abort(404);
    }
    $file = StoredFile::find($id);
    if (!$file) abort(404);

    return serveStoredFile($file);
})->where('id', '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')
->where('extension', '[pP][nN][gG]|[jJ][pP][gG]|[jJ][pP][eE][gG]|[gG][iI][fF]|[wW][eE][bB][pP]|[aA][vV][iI][fF]|[sS][vV][gG]');

Route::get('/{id}', function ($id) {
    $file = StoredFile::find($id);
    if (!$file) abort(404);
    return serveStoredFile($file);
})->where('id', '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}');

Route::inertia('/', 'welcome')->name('home');

// Debug: show server vars (to diagnose Vercel REQUEST_URI issue)
Route::get('debug-server', function () {
    return response()->json([
        'REQUEST_URI' => $_SERVER['REQUEST_URI'] ?? null,
        'PATH_INFO' => $_SERVER['PATH_INFO'] ?? null,
        'ORIG_PATH_INFO' => $_SERVER['ORIG_PATH_INFO'] ?? null,
        'SCRIPT_NAME' => $_SERVER['SCRIPT_NAME'] ?? null,
        'PHP_SELF' => $_SERVER['PHP_SELF'] ?? null,
        'QUERY_STRING' => $_SERVER['QUERY_STRING'] ?? null,
        'ORIG_SCRIPT_NAME' => $_SERVER['ORIG_SCRIPT_NAME'] ?? null,
        'path' => request()->path(),
        'url' => request()->url(),
        'fullUrl' => request()->fullUrl(),
    ]);
});

// Public health check (no auth)
Route::get('health', function () {
    try {
        DB::connection()->getPdo();
        $roleCount = App\Models\UserRole::count();
        $spatieRoleCount = Spatie\Permission\Models\Role::count();

        // Test StoredFile model
        $file = new App\Models\StoredFile();
        $file->original_name = 'health-check.jpg';
        $file->mime_type = 'image/jpeg';
        $file->size = 100;
        $file->data = 'dummy';
        $file->save();
        $testId = $file->id;
        $file->delete();

        return response("DB: OK | user_roles: $roleCount | spatie roles: $spatieRoleCount | StoredFile: OK");
    } catch (\Throwable $e) {
        return response('ERROR: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine(), 500);
    }
});

// Debug
Route::middleware('auth')->get('debug/employee-test', function () {
    try {
        $adminRole = App\Models\UserRole::firstOrCreate(['name' => 'admin'], ['description' => 'Platform administrator']);
        $user = App\Models\User::create([
            'role_id' => $adminRole->id, 'full_name' => 'Debug', 'email' => 'd_' . time() . '@t.com',
            'password' => bcrypt('p'), 'type' => 'employee', 'is_verified' => true,
            'join_date' => now(), 'last_active' => now(),
        ]);
        $user->assignRole('staff');
        $user->delete();
        return response('OK: Employee creation works');
    } catch (\Throwable $e) {
        return response('ERROR: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine(), 500);
    }
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = request()->user();
        $roles = $user->roles->pluck('name')->toArray();

        if (empty($roles) && $user->userRole) {
            $roleName = $user->userRole->name;
            if (in_array($roleName, ['buyer', 'seller'])) {
                $user->assignRole($roleName);
                $roles = [$roleName];
            }
        }

        if (array_intersect(['super-admin', 'admin', 'staff'], $roles)) {
            return Redirect::to('/admin/dashboard');
        }
        if (in_array('seller', $roles)) {
            return Redirect::to('/seller/dashboard');
        }
        if (in_array('buyer', $roles)) {
            return Redirect::to('/buyer/dashboard');
        }

        return Redirect::to('/admin/dashboard');
    })->name('dashboard');

    // ── Admin & Staff routes ──
    Route::middleware(['role:super-admin,admin,staff'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Employee management (admin only)
        Route::middleware(['role:super-admin,admin'])->group(function () {
            Route::resource('employees', EmployeeController::class)
                ->except(['show']);
            Route::get('employees/{employee}', [EmployeeController::class, 'show'])->name('employees.show');
        });

        // Sellers, Users, Cars, Categories, Orders (admin only)
        Route::middleware(['role:super-admin,admin'])->group(function () {
            Route::resource('sellers', SellerController::class)
                ->except(['show']);
            Route::get('sellers/{seller}', [SellerController::class, 'show'])->name('sellers.show');

            Route::resource('users', UserController::class)
                ->only(['index', 'edit', 'update', 'destroy']);
            Route::get('users/{user}', [UserController::class, 'show'])->name('users.show');

            Route::resource('cars', CarController::class)
                ->only(['index', 'show', 'edit', 'update', 'destroy']);

            Route::resource('categories', CategoryController::class)
                ->except(['show', 'create']);

            Route::get('makes-models', [MakesModelsController::class, 'index'])->name('makes-models.index');

            Route::resource('makes', MakeController::class)
                ->except(['show', 'create']);

            Route::resource('models', ModelController::class)
                ->except(['show', 'create']);

            Route::resource('conditions', ConditionController::class)
                ->except(['show', 'create']);

            Route::resource('fuel-types', FuelTypeController::class)
                ->except(['show', 'create']);

            Route::resource('transmissions', TransmissionController::class)
                ->except(['show', 'create']);

            Route::resource('orders', OrderController::class)
                ->only(['index', 'show']);

            Route::put('orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.status');
            Route::post('orders/{order}/transactions', [OrderController::class, 'addTransaction'])->name('orders.transactions.store');
            Route::put('orders/{order}/transactions/{transaction}/status', [OrderController::class, 'updateTransactionStatus'])->name('orders.transactions.status');

            // Dealership modules
            Route::resource('vehicle-histories', VehicleHistoryController::class)->except(['create']);
            Route::resource('warranties', WarrantyController::class)->except(['create', 'store']);
            Route::resource('service-appointments', ServiceAppointmentController::class)->except(['create', 'store']);

            // Pre-Orders (customer pre-orders for upcoming vehicles)
            Route::resource('pre-orders', PreOrderController::class);
            Route::post('pre-orders/{pre_order}/payments', [PreOrderController::class, 'addPayment'])->name('pre-orders.payments.store');
            Route::delete('pre-orders/{pre_order}/payments/{payment}', [PreOrderController::class, 'deletePayment'])->name('pre-orders.payments.destroy');

        });
    });

    // ── Seller routes ──
    Route::middleware(['role:super-admin,admin,seller'])->prefix('seller')->name('seller.')->group(function () {
        Route::get('/dashboard', [App\Http\Controllers\Seller\DashboardController::class, 'index'])->name('dashboard');

        Route::resource('cars', App\Http\Controllers\Seller\CarController::class);

        Route::resource('orders', App\Http\Controllers\Seller\OrderController::class)
            ->only(['index', 'show', 'update']);

        // Seller inquiries
        Route::get('inquiries', [InquiryController::class, 'index'])->name('inquiries.index');
        Route::get('inquiries/{inquiry}', [InquiryController::class, 'show'])->name('inquiries.show');
        Route::put('inquiries/{inquiry}', [InquiryController::class, 'update'])->name('inquiries.update');

        // Seller pre-orders
        Route::get('pre-orders', [App\Http\Controllers\Seller\PreOrderController::class, 'index'])->name('pre-orders.index');
        Route::get('pre-orders/{pre_order}', [App\Http\Controllers\Seller\PreOrderController::class, 'show'])->name('pre-orders.show');

        // Seller reviews
        Route::get('reviews', [ReviewController::class, 'index'])->name('reviews.index');

        // Seller profile
        Route::get('profile', [ProfileController::class, 'index'])->name('profile.index');
        Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::post('profile/verification', [ProfileController::class, 'submitVerification'])->name('profile.verification');

        // Seller banners
        Route::get('web', [App\Http\Controllers\Seller\BannerController::class, 'index'])->name('web.index');
        Route::post('web', [App\Http\Controllers\Seller\BannerController::class, 'store'])->name('web.store');
        Route::put('web/{banner}', [App\Http\Controllers\Seller\BannerController::class, 'update'])->name('web.update');
        Route::delete('web/{banner}', [App\Http\Controllers\Seller\BannerController::class, 'destroy'])->name('web.destroy');

        // Seller heroes (text-only hero sections)
        Route::get('heroes', [App\Http\Controllers\Seller\HeroController::class, 'index'])->name('heroes.index');
        Route::post('heroes', [App\Http\Controllers\Seller\HeroController::class, 'store'])->name('heroes.store');
        Route::put('heroes/{hero}', [App\Http\Controllers\Seller\HeroController::class, 'update'])->name('heroes.update');
        Route::delete('heroes/{hero}', [App\Http\Controllers\Seller\HeroController::class, 'destroy'])->name('heroes.destroy');
    });

    // ── Buyer routes ──
    Route::middleware(['role:super-admin,admin,buyer'])->prefix('buyer')->name('buyer.')->group(function () {
        Route::get('/dashboard', [App\Http\Controllers\Buyer\DashboardController::class, 'index'])->name('dashboard');

        Route::resource('orders', App\Http\Controllers\Buyer\OrderController::class)
            ->only(['index', 'show']);

        Route::resource('inquiries', App\Http\Controllers\Buyer\InquiryController::class)
            ->only(['index', 'show']);

        Route::get('saved-listings', [SavedListingController::class, 'index'])->name('saved-listings.index');
        Route::delete('saved-listings/{id}', [SavedListingController::class, 'destroy'])->name('saved-listings.destroy');

        // Buyer pre-orders
        Route::resource('pre-orders', App\Http\Controllers\Buyer\PreOrderController::class)
            ->only(['index', 'create', 'store', 'show']);
    });

    // ── Messages (all authenticated users) ──
    Route::get('messages', [MessageController::class, 'index'])->name('messages.index');
    Route::get('messages/create', [MessageController::class, 'create'])->name('messages.create');
    Route::get('messages/{message}', [MessageController::class, 'show'])->name('messages.show');
    Route::post('messages', [MessageController::class, 'store'])->name('messages.store');
    Route::post('messages/{message}/reply', [MessageController::class, 'storeMessage'])
        ->name('messages.reply');
    Route::put('messages/{message}', [MessageController::class, 'updateMessage'])
        ->name('messages.update');
    Route::delete('messages/{message}', [MessageController::class, 'destroyMessage'])
        ->name('messages.destroy');
    
    // Fetch messages as JSON (session-based, for client-side refresh)
    Route::get('messages/{conversation}/fetch', [MessageController::class, 'fetchMessages'])
        ->name('messages.fetch');

    // Conversation routes
    Route::get('conversations/{conversation}', function ($conversationId) {
        // Load conversation with messages and related data
        $conversation = \App\Models\Conversation::with([
            'sender', 
            'receiver', 
            'listing.make', 
            'listing.model',
            'messages.sender'
        ])->findOrFail($conversationId);
        
        // Verify the authenticated user is part of this conversation
        if ($conversation->sender_id !== auth()->id() && 
            $conversation->receiver_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }
        
        $otherUser = $conversation->sender_id === auth()->id() 
            ? $conversation->receiver 
            : $conversation->sender;
            
        $lastMessage = $conversation->messages()->latest()->first();
        
        return inertia('Conversation/Show', [
            'conversation' => [
                'id' => $conversation->id,
                'subject' => $conversation->subject,
                'listing' => $conversation->listing ? [
                    'id' => $conversation->listing->id,
                    'title' => ($conversation->listing->make->name ?? '') . ' ' . ($conversation->listing->model->name ?? ''),
                ] : null,
                'other_user' => [
                    'id' => $otherUser->id,
                    'full_name' => $otherUser->full_name,
                ],
                'last_message_at' => $conversation->last_message_at,
                'messages' => $conversation->messages->map(function ($message) {
                    return [
                        'id' => $message->id,
                        'content' => $message->content,
                        'sender_id' => $message->sender_id,
                        'sender_name' => $message->sender->full_name,
                        'read_at' => $message->read_at,
                        'created_at' => $message->created_at,
                        'is_mine' => $message->sender_id === auth()->id(),
                    ];
                }),
            ]
        ]);
    })->name('conversations.show');
});

require __DIR__.'/settings.php';
