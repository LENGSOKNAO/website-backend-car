import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\OrderController::store
* @see app/Http/Controllers/Admin/OrderController.php:81
* @route '/admin/orders/{order}/transactions'
*/
export const store = (args: { order: string | { id: string } } | [order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/orders/{order}/transactions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::store
* @see app/Http/Controllers/Admin/OrderController.php:81
* @route '/admin/orders/{order}/transactions'
*/
store.url = (args: { order: string | { id: string } } | [order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { order: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            order: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        order: typeof args.order === 'object'
        ? args.order.id
        : args.order,
    }

    return store.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::store
* @see app/Http/Controllers/Admin/OrderController.php:81
* @route '/admin/orders/{order}/transactions'
*/
store.post = (args: { order: string | { id: string } } | [order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::store
* @see app/Http/Controllers/Admin/OrderController.php:81
* @route '/admin/orders/{order}/transactions'
*/
const storeForm = (args: { order: string | { id: string } } | [order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::store
* @see app/Http/Controllers/Admin/OrderController.php:81
* @route '/admin/orders/{order}/transactions'
*/
storeForm.post = (args: { order: string | { id: string } } | [order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:110
* @route '/admin/orders/{order}/transactions/{transaction}/status'
*/
export const status = (args: { order: string | { id: string }, transaction: string | { id: string } } | [order: string | { id: string }, transaction: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

status.definition = {
    methods: ["put"],
    url: '/admin/orders/{order}/transactions/{transaction}/status',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:110
* @route '/admin/orders/{order}/transactions/{transaction}/status'
*/
status.url = (args: { order: string | { id: string }, transaction: string | { id: string } } | [order: string | { id: string }, transaction: string | { id: string } ], options?: RouteQueryOptions) => {

    if (Array.isArray(args)) {
        args = {
            order: args[0],
            transaction: args[1],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        order: typeof args.order === 'object'
        ? args.order.id
        : args.order,
        transaction: typeof args.transaction === 'object'
        ? args.transaction.id
        : args.transaction,
    }

    return status.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:110
* @route '/admin/orders/{order}/transactions/{transaction}/status'
*/
status.put = (args: { order: string | { id: string }, transaction: string | { id: string } } | [order: string | { id: string }, transaction: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:110
* @route '/admin/orders/{order}/transactions/{transaction}/status'
*/
const statusForm = (args: { order: string | { id: string }, transaction: string | { id: string } } | [order: string | { id: string }, transaction: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::status
* @see app/Http/Controllers/Admin/OrderController.php:110
* @route '/admin/orders/{order}/transactions/{transaction}/status'
*/
statusForm.put = (args: { order: string | { id: string }, transaction: string | { id: string } } | [order: string | { id: string }, transaction: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

status.form = statusForm



const transactions = {
    store: Object.assign(store, store),
    status: Object.assign(status, status),
}

export default transactions