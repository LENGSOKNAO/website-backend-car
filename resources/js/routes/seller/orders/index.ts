import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Seller\OrderController::index
 * @see app/Http/Controllers/Seller/OrderController.php:14
 * @route '/seller/orders'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/seller/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\OrderController::index
 * @see app/Http/Controllers/Seller/OrderController.php:14
 * @route '/seller/orders'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\OrderController::index
 * @see app/Http/Controllers/Seller/OrderController.php:14
 * @route '/seller/orders'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Seller\OrderController::index
 * @see app/Http/Controllers/Seller/OrderController.php:14
 * @route '/seller/orders'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Seller\OrderController::index
 * @see app/Http/Controllers/Seller/OrderController.php:14
 * @route '/seller/orders'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Seller\OrderController::index
 * @see app/Http/Controllers/Seller/OrderController.php:14
 * @route '/seller/orders'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Seller\OrderController::index
 * @see app/Http/Controllers/Seller/OrderController.php:14
 * @route '/seller/orders'
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
* @see \App\Http\Controllers\Seller\OrderController::show
 * @see app/Http/Controllers/Seller/OrderController.php:92
 * @route '/seller/orders/{order}'
 */
export const show = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/seller/orders/{order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\OrderController::show
 * @see app/Http/Controllers/Seller/OrderController.php:92
 * @route '/seller/orders/{order}'
 */
show.url = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: args.order,
                }

    return show.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\OrderController::show
 * @see app/Http/Controllers/Seller/OrderController.php:92
 * @route '/seller/orders/{order}'
 */
show.get = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Seller\OrderController::show
 * @see app/Http/Controllers/Seller/OrderController.php:92
 * @route '/seller/orders/{order}'
 */
show.head = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Seller\OrderController::show
 * @see app/Http/Controllers/Seller/OrderController.php:92
 * @route '/seller/orders/{order}'
 */
    const showForm = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Seller\OrderController::show
 * @see app/Http/Controllers/Seller/OrderController.php:92
 * @route '/seller/orders/{order}'
 */
        showForm.get = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Seller\OrderController::show
 * @see app/Http/Controllers/Seller/OrderController.php:92
 * @route '/seller/orders/{order}'
 */
        showForm.head = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Seller\OrderController::update
 * @see app/Http/Controllers/Seller/OrderController.php:116
 * @route '/seller/orders/{order}'
 */
export const update = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/seller/orders/{order}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Seller\OrderController::update
 * @see app/Http/Controllers/Seller/OrderController.php:116
 * @route '/seller/orders/{order}'
 */
update.url = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: args.order,
                }

    return update.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\OrderController::update
 * @see app/Http/Controllers/Seller/OrderController.php:116
 * @route '/seller/orders/{order}'
 */
update.put = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Seller\OrderController::update
 * @see app/Http/Controllers/Seller/OrderController.php:116
 * @route '/seller/orders/{order}'
 */
update.patch = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Seller\OrderController::update
 * @see app/Http/Controllers/Seller/OrderController.php:116
 * @route '/seller/orders/{order}'
 */
    const updateForm = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Seller\OrderController::update
 * @see app/Http/Controllers/Seller/OrderController.php:116
 * @route '/seller/orders/{order}'
 */
        updateForm.put = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Seller\OrderController::update
 * @see app/Http/Controllers/Seller/OrderController.php:116
 * @route '/seller/orders/{order}'
 */
        updateForm.patch = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const orders = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
update: Object.assign(update, update),
}

export default orders