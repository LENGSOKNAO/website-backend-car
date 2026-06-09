import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Seller\OfferController::index
* @see app/Http/Controllers/Seller/OfferController.php:16
* @route '/seller/offers'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/seller/offers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\OfferController::index
* @see app/Http/Controllers/Seller/OfferController.php:16
* @route '/seller/offers'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\OfferController::index
* @see app/Http/Controllers/Seller/OfferController.php:16
* @route '/seller/offers'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\OfferController::index
* @see app/Http/Controllers/Seller/OfferController.php:16
* @route '/seller/offers'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Seller\OfferController::index
* @see app/Http/Controllers/Seller/OfferController.php:16
* @route '/seller/offers'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\OfferController::index
* @see app/Http/Controllers/Seller/OfferController.php:16
* @route '/seller/offers'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\OfferController::index
* @see app/Http/Controllers/Seller/OfferController.php:16
* @route '/seller/offers'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Seller\OfferController::show
* @see app/Http/Controllers/Seller/OfferController.php:33
* @route '/seller/offers/{offer}'
*/
export const show = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/seller/offers/{offer}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\OfferController::show
* @see app/Http/Controllers/Seller/OfferController.php:33
* @route '/seller/offers/{offer}'
*/
show.url = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { offer: args }
    }


    if (Array.isArray(args)) {
        args = {
            offer: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        offer: args.offer,
    }

    return show.definition.url
            .replace('{offer}', parsedArgs.offer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\OfferController::show
* @see app/Http/Controllers/Seller/OfferController.php:33
* @route '/seller/offers/{offer}'
*/
show.get = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\OfferController::show
* @see app/Http/Controllers/Seller/OfferController.php:33
* @route '/seller/offers/{offer}'
*/
show.head = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Seller\OfferController::show
* @see app/Http/Controllers/Seller/OfferController.php:33
* @route '/seller/offers/{offer}'
*/
const showForm = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\OfferController::show
* @see app/Http/Controllers/Seller/OfferController.php:33
* @route '/seller/offers/{offer}'
*/
showForm.get = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\OfferController::show
* @see app/Http/Controllers/Seller/OfferController.php:33
* @route '/seller/offers/{offer}'
*/
showForm.head = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Seller\OfferController::accept
* @see app/Http/Controllers/Seller/OfferController.php:45
* @route '/seller/offers/{offer}/accept'
*/
export const accept = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(args, options),
    method: 'post',
})

accept.definition = {
    methods: ["post"],
    url: '/seller/offers/{offer}/accept',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Seller\OfferController::accept
* @see app/Http/Controllers/Seller/OfferController.php:45
* @route '/seller/offers/{offer}/accept'
*/
accept.url = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { offer: args }
    }


    if (Array.isArray(args)) {
        args = {
            offer: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        offer: args.offer,
    }

    return accept.definition.url
            .replace('{offer}', parsedArgs.offer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\OfferController::accept
* @see app/Http/Controllers/Seller/OfferController.php:45
* @route '/seller/offers/{offer}/accept'
*/
accept.post = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\OfferController::accept
* @see app/Http/Controllers/Seller/OfferController.php:45
* @route '/seller/offers/{offer}/accept'
*/
const acceptForm = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: accept.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\OfferController::accept
* @see app/Http/Controllers/Seller/OfferController.php:45
* @route '/seller/offers/{offer}/accept'
*/
acceptForm.post = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: accept.url(args, options),
    method: 'post',
})

accept.form = acceptForm

/**
* @see \App\Http\Controllers\Seller\OfferController::reject
* @see app/Http/Controllers/Seller/OfferController.php:85
* @route '/seller/offers/{offer}/reject'
*/
export const reject = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/seller/offers/{offer}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Seller\OfferController::reject
* @see app/Http/Controllers/Seller/OfferController.php:85
* @route '/seller/offers/{offer}/reject'
*/
reject.url = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { offer: args }
    }


    if (Array.isArray(args)) {
        args = {
            offer: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        offer: args.offer,
    }

    return reject.definition.url
            .replace('{offer}', parsedArgs.offer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\OfferController::reject
* @see app/Http/Controllers/Seller/OfferController.php:85
* @route '/seller/offers/{offer}/reject'
*/
reject.post = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\OfferController::reject
* @see app/Http/Controllers/Seller/OfferController.php:85
* @route '/seller/offers/{offer}/reject'
*/
const rejectForm = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\OfferController::reject
* @see app/Http/Controllers/Seller/OfferController.php:85
* @route '/seller/offers/{offer}/reject'
*/
rejectForm.post = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

reject.form = rejectForm

const OfferController = { index, show, accept, reject }

export default OfferController