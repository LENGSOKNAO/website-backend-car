import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Seller\PreOrderController::index
* @see app/Http/Controllers/Seller/PreOrderController.php:12
* @route '/seller/pre-orders'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/seller/pre-orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\PreOrderController::index
* @see app/Http/Controllers/Seller/PreOrderController.php:12
* @route '/seller/pre-orders'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\PreOrderController::index
* @see app/Http/Controllers/Seller/PreOrderController.php:12
* @route '/seller/pre-orders'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\PreOrderController::index
* @see app/Http/Controllers/Seller/PreOrderController.php:12
* @route '/seller/pre-orders'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Seller\PreOrderController::index
* @see app/Http/Controllers/Seller/PreOrderController.php:12
* @route '/seller/pre-orders'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\PreOrderController::index
* @see app/Http/Controllers/Seller/PreOrderController.php:12
* @route '/seller/pre-orders'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\PreOrderController::index
* @see app/Http/Controllers/Seller/PreOrderController.php:12
* @route '/seller/pre-orders'
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
* @see \App\Http\Controllers\Seller\PreOrderController::show
* @see app/Http/Controllers/Seller/PreOrderController.php:46
* @route '/seller/pre-orders/{pre_order}'
*/
export const show = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/seller/pre-orders/{pre_order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\PreOrderController::show
* @see app/Http/Controllers/Seller/PreOrderController.php:46
* @route '/seller/pre-orders/{pre_order}'
*/
show.url = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pre_order: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pre_order: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pre_order: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        pre_order: typeof args.pre_order === 'object'
        ? args.pre_order.id
        : args.pre_order,
    }

    return show.definition.url
            .replace('{pre_order}', parsedArgs.pre_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\PreOrderController::show
* @see app/Http/Controllers/Seller/PreOrderController.php:46
* @route '/seller/pre-orders/{pre_order}'
*/
show.get = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\PreOrderController::show
* @see app/Http/Controllers/Seller/PreOrderController.php:46
* @route '/seller/pre-orders/{pre_order}'
*/
show.head = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Seller\PreOrderController::show
* @see app/Http/Controllers/Seller/PreOrderController.php:46
* @route '/seller/pre-orders/{pre_order}'
*/
const showForm = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\PreOrderController::show
* @see app/Http/Controllers/Seller/PreOrderController.php:46
* @route '/seller/pre-orders/{pre_order}'
*/
showForm.get = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\PreOrderController::show
* @see app/Http/Controllers/Seller/PreOrderController.php:46
* @route '/seller/pre-orders/{pre_order}'
*/
showForm.head = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm



const preOrders = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default preOrders