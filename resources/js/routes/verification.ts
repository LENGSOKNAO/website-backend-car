import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'

/**
 * @see \Laravel\Fortify\Http\Controllers\EmailVerificationPromptController::send
 * @see vendor/laravel/fortify/src/Http/Controllers/EmailVerificationPromptController.php:35
 * @route '/email/verification-notification'
 */
export const send = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/email/verification-notification',
} satisfies RouteDefinition<["post"]>

/**
 * @see \Laravel\Fortify\Http\Controllers\EmailVerificationPromptController::send
 * @see vendor/laravel/fortify/src/Http/Controllers/EmailVerificationPromptController.php:35
 * @route '/email/verification-notification'
 */
send.url = (options?: RouteQueryOptions) => {
    return send.definition.url + queryParams(options)
}

/**
 * @see \Laravel\Fortify\Http\Controllers\EmailVerificationPromptController::send
 * @see vendor/laravel/fortify/src/Http/Controllers/EmailVerificationPromptController.php:35
 * @route '/email/verification-notification'
 */
send.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

const sendForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: send.url(options),
    method: 'post',
})

sendForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: send.url(options),
    method: 'post',
})

send.form = sendForm
