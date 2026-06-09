<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use App\Events\UserOnline;
use App\Events\UserOffline;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind('db.connector.pgsql', \App\Database\Connectors\PostgresConnector::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $pgsql = config('database.connections.pgsql');
        $candidates = array_filter([$pgsql['host'] ?? null, $pgsql['url'] ?? null]);
        foreach ($candidates as $value) {
            if (preg_match('/ep-[^.]+(?=\.c-\d+)/', $value, $m)) {
                putenv('PGOPTIONS=endpoint=' . $m[0]);
                break;
            }
        }

        $this->configureRateLimiting();
        $this->configureDefaults();

        if (app()->isProduction()) {
            URL::forceHttps();
        }

        try {
            \Illuminate\Support\Facades\DB::select('SELECT 1 FROM stored_files LIMIT 1');
        } catch (\Exception) {
            \Illuminate\Support\Facades\DB::statement('
                CREATE TABLE IF NOT EXISTS stored_files (
                    id UUID PRIMARY KEY,
                    original_name VARCHAR(255) NOT NULL,
                    mime_type VARCHAR(127) NOT NULL,
                    size INTEGER NOT NULL,
                    data BYTEA NOT NULL,
                    created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
                )
            ');
        }

        // Only register broadcasting listeners if the Pusher package is available
        if (class_exists('Pusher\Pusher')) {
            Event::listen(\Illuminate\Auth\Events\Login::class, function ($event) {
                UserOnline::dispatch($event->user, true);
            });

            Event::listen(\Illuminate\Auth\Events\Logout::class, function ($event) {
                UserOffline::dispatch($event->user);
            });
        }
    }

    /**
     * Configure the rate limiters for the application.
     */
    protected function configureRateLimiting(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by(optional($request->user())->id ?: $request->ip());
        });
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(6)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
