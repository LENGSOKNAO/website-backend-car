<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject, PasskeyUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, HasRoles, HasUuids, Notifiable, PasskeyAuthenticatable, TwoFactorAuthenticatable;

    protected $fillable = [
        'role_id',
        'type',
        'email',
        'phone',
        'password',
        'full_name',
        'avatar_url',
        'is_verified',
        'is_dealer',
        'dealer_name',
        'location',
        'join_date',
        'last_active',
        'slider_image',
        'banner1_image',
        'banner2_image',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_secret',
        'two_factor_recovery_codes',
    ];

    protected $appends = ['name', 'avatar'];

    protected $with = ['roles'];

    public function getNameAttribute(): string
    {
        return $this->full_name;
    }

    public function getAvatarAttribute(): ?string
    {
        return $this->avatar_url;
    }

    protected function casts(): array
    {
        return [
            'is_verified' => 'boolean',
            'is_dealer' => 'boolean',
            'join_date' => 'datetime',
            'last_active' => 'datetime',
            'slider_image' => 'string',
            'banner1_image' => 'string',
            'banner2_image' => 'string',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function scopeEmployees($query)
    {
        return $query->where('type', 'employee');
    }

    public function scopeCustomers($query)
    {
        return $query->where('type', 'customer');
    }

    public function isEmployee(): bool
    {
        return $this->type === 'employee';
    }

    public function isCustomer(): bool
    {
        return $this->type === 'customer';
    }

    public function userRole(): BelongsTo
    {
        return $this->belongsTo(UserRole::class, 'role_id');
    }

    public function sellerVerification(): HasOne
    {
        return $this->hasOne(SellerVerification::class, 'seller_id');
    }

    public function carListings(): HasMany
    {
        return $this->hasMany(CarListing::class, 'seller_id');
    }

    public function savedListings(): HasMany
    {
        return $this->hasMany(SavedListing::class, 'user_id');
    }

    public function inquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class, 'buyer_id');
    }

    public function receivedInquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class, 'seller_id');
    }

    public function offers(): HasMany
    {
        return $this->hasMany(Offer::class, 'buyer_id');
    }

    public function receivedOffers(): HasMany
    {
        return $this->hasMany(Offer::class, 'seller_id');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'buyer_id');
    }

    public function sales(): HasMany
    {
        return $this->hasMany(Order::class, 'seller_id');
    }

    public function conversations(): HasMany
    {
        return $this->hasMany(Conversation::class, 'sender_id');
    }

    public function receivedConversations(): HasMany
    {
        return $this->hasMany(Conversation::class, 'receiver_id');
    }

    public function sentMessages(): HasMany
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function reviewsGiven(): HasMany
    {
        return $this->hasMany(SellerReview::class, 'reviewer_id');
    }

    public function reviewsReceived(): HasMany
    {
        return $this->hasMany(SellerReview::class, 'seller_id');
    }

    public function getJWTIdentifier(): mixed
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }
}
