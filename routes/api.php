<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\HeroController;
use App\Http\Controllers\Api\InquiryController;
use App\Http\Controllers\Api\ListingController;
use App\Http\Controllers\Api\MakeController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\SavedListingController;
use App\Http\Controllers\Api\UserController as ApiUserController;
use App\Http\Controllers\Seller\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // Public web (no auth required)
    Route::get('web/hero', [BannerController::class, 'hero']);
    Route::get('web/sliders', [BannerController::class, 'sliders']);
    Route::get('web/boxTrips', [BannerController::class, 'boxTrips']);
    Route::get('web/boxOne', [BannerController::class, 'boxOne']);
    Route::get('web/boxRight', [BannerController::class, 'boxRight']);
    Route::get('web/boxLeft', [BannerController::class, 'boxLeft']);
    Route::get('web/boxTen', [BannerController::class, 'boxTen']);
    Route::get('web/brand/{slug}', [BannerController::class, 'brand']);
    Route::get('web', [BannerController::class, 'index']);
    Route::get('web/{id}', [BannerController::class, 'show']);

    // Public heroes (no auth required)
    Route::get('heroes', [HeroController::class, 'index']);
    Route::get('heroes/{id}', [HeroController::class, 'show']);

    // Auth routes
    Route::get('auth/login', function () {
        return response()->json(['message' => 'Use POST to /api/v1/auth/login with email and password.'], 200);
    });
    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('auth/register', [AuthController::class, 'register']);
    Route::post('auth/refresh', [AuthController::class, 'refresh']);

    // Public users (no auth required - read only)
    Route::get('users', [ApiUserController::class, 'index']);
    Route::get('users/roles', [ApiUserController::class, 'roles']);
    Route::get('users/{user}', [ApiUserController::class, 'show']);

    // Public listings (no auth required - read only)
    Route::get('listings', [ListingController::class, 'index']);
    Route::get('listings/{id}', [ListingController::class, 'show']);

    // Public products (no auth required - read only)
    Route::get('products', [ProductController::class, 'index']);
    Route::get('products/{id}', [ProductController::class, 'show']);

    Route::middleware('auth:api')->group(function () {

        // Banners management
        Route::post('web', [BannerController::class, 'store']);
        Route::put('web/{id}', [BannerController::class, 'update']);
        Route::delete('web/{id}', [BannerController::class, 'destroy']);

        // Heroes management
        Route::post('heroes', [HeroController::class, 'store']);
        Route::put('heroes/{id}', [HeroController::class, 'update']);
        Route::delete('heroes/{id}', [HeroController::class, 'destroy']);

        // Auth
        Route::get('auth/me', [AuthController::class, 'me']);
        Route::put('auth/profile', [AuthController::class, 'update']);
        Route::put('auth/password', [AuthController::class, 'updatePassword']);
        Route::post('auth/logout', [AuthController::class, 'logout']);

        // Makes & Models (public)
        Route::get('makes', [MakeController::class, 'index']);
        Route::get('makes/{id}', [MakeController::class, 'show']);

        // Listings — write (auth required)
        Route::post('listings', [ListingController::class, 'store']);
        Route::put('listings/{id}', [ListingController::class, 'update']);
        Route::delete('listings/{id}', [ListingController::class, 'destroy']);
        Route::post('listings/{id}/images', [ListingController::class, 'uploadImage']);

        // Products — write (auth required)
        Route::post('products', [ProductController::class, 'store']);
        Route::put('products/{id}', [ProductController::class, 'update']);
        Route::delete('products/{id}', [ProductController::class, 'destroy']);
        Route::post('products/{id}/images', [ProductController::class, 'uploadImage']);

        // Saved Listings
        Route::get('saved-listings', [SavedListingController::class, 'index']);
        Route::post('saved-listings', [SavedListingController::class, 'store']);
        Route::delete('saved-listings/{id}', [SavedListingController::class, 'destroy']);

        // Inquiries
        Route::get('inquiries', [InquiryController::class, 'index']);
        Route::post('inquiries', [InquiryController::class, 'store']);
        Route::get('inquiries/{id}', [InquiryController::class, 'show']);
        Route::put('inquiries/{id}', [InquiryController::class, 'update']);

        // Orders
        Route::get('orders', [OrderController::class, 'index']);
        Route::post('orders', [OrderController::class, 'store']);
        Route::get('orders/{id}', [OrderController::class, 'show']);
        Route::post('orders/{id}/pay-installment', [OrderController::class, 'payInstallment']);

        // Messages
        Route::get('conversations', [MessageController::class, 'conversations']);
        Route::get('conversations/{id}/messages', [MessageController::class, 'messages']);
        Route::post('messages/send', [MessageController::class, 'send']);
        Route::post('conversations/{id}/reply', [MessageController::class, 'reply']);
        Route::post('conversations/{id}/read', [MessageController::class, 'markRead']);
        Route::put('messages/{id}', [MessageController::class, 'edit']);
        Route::delete('messages/{id}', [MessageController::class, 'delete']);

        // Admin User Management (super-admin & admin only)
        Route::middleware('role:super-admin,admin')->group(function () {
            Route::post('users', [ApiUserController::class, 'store']);
            Route::put('users/{user}', [ApiUserController::class, 'update']);
            Route::delete('users/{user}', [ApiUserController::class, 'destroy']);
        });

        // Seller Dashboard API
        Route::post('seller/settings/{type}', [App\Http\Controllers\Seller\Admin\ImageController::class, 'store']);
        Route::get('seller/settings', [App\Http\Controllers\Seller\Admin\ImageController::class, 'getSettings']);
        Route::get('seller/dashboard', [DashboardController::class, 'apiIndex']);
        Route::post('upload', [App\Http\Controllers\FileController::class, 'upload']);
    });
});

Route::get('files/{id}', [App\Http\Controllers\FileController::class, 'show'])->whereUuid('id');
