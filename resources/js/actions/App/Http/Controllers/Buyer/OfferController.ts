import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Buyer\OfferController::index
* @see app/Http/Controllers/Buyer/OfferController.php:12
* @route '/buyer/offers'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/buyer/offers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Buyer\OfferController::index
* @see app/Http/Controllers/Buyer/OfferController.php:12
* @route '/buyer/offers'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Buyer\OfferController::index
* @see app/Http/Controllers/Buyer/OfferController.php:12
* @route '/buyer/offers'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Buyer\OfferController::index
* @see app/Http/Controllers/Buyer/OfferController.php:12
* @route '/buyer/offers'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Buyer\OfferController::index
* @see app/Http/Controllers/Buyer/OfferController.php:12
* @route '/buyer/offers'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Buyer\OfferController::index
* @see app/Http/Controllers/Buyer/OfferController.php:12
* @route '/buyer/offers'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Buyer\OfferController::index
* @see app/Http/Controllers/Buyer/OfferController.php:12
* @route '/buyer/offers'
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
* @see \App\Http\Controllers\Buyer\OfferController::show
* @see app/Http/Controllers/Buyer/OfferController.php:29
* @route '/buyer/offers/{offer}'
*/
export const show = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/buyer/offers/{offer}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Buyer\OfferController::show
* @see app/Http/Controllers/Buyer/OfferController.php:29
* @route '/buyer/offers/{offer}'
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
* @see \App\Http\Controllers\Buyer\OfferController::show
* @see app/Http/Controllers/Buyer/OfferController.php:29
* @route '/buyer/offers/{offer}'
*/
show.get = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Buyer\OfferController::show
* @see app/Http/Controllers/Buyer/OfferController.php:29
* @route '/buyer/offers/{offer}'
*/
show.head = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Buyer\OfferController::show
* @see app/Http/Controllers/Buyer/OfferController.php:29
* @route '/buyer/offers/{offer}'
*/
const showForm = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Buyer\OfferController::show
* @see app/Http/Controllers/Buyer/OfferController.php:29
* @route '/buyer/offers/{offer}'
*/
showForm.get = (args: { offer: string | number } | [offer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Buyer\OfferController::show
* @see app/Http/Controllers/Buyer/OfferController.php:29
* @route '/buyer/offers/{offer}'
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

const OfferController = { index, show }

export default OfferController