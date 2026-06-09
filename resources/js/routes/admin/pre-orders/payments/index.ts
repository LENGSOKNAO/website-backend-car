import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PreOrderController::store
* @see app/Http/Controllers/Admin/PreOrderController.php:173
* @route '/admin/pre-orders/{pre_order}/payments'
*/
export const store = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/pre-orders/{pre_order}/payments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PreOrderController::store
* @see app/Http/Controllers/Admin/PreOrderController.php:173
* @route '/admin/pre-orders/{pre_order}/payments'
*/
store.url = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{pre_order}', parsedArgs.pre_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PreOrderController::store
* @see app/Http/Controllers/Admin/PreOrderController.php:173
* @route '/admin/pre-orders/{pre_order}/payments'
*/
store.post = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::store
* @see app/Http/Controllers/Admin/PreOrderController.php:173
* @route '/admin/pre-orders/{pre_order}/payments'
*/
const storeForm = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::store
* @see app/Http/Controllers/Admin/PreOrderController.php:173
* @route '/admin/pre-orders/{pre_order}/payments'
*/
storeForm.post = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\PreOrderController::destroy
* @see app/Http/Controllers/Admin/PreOrderController.php:194
* @route '/admin/pre-orders/{pre_order}/payments/{payment}'
*/
export const destroy = (args: { pre_order: string | { id: string }, payment: string | number } | [pre_order: string | { id: string }, payment: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/pre-orders/{pre_order}/payments/{payment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PreOrderController::destroy
* @see app/Http/Controllers/Admin/PreOrderController.php:194
* @route '/admin/pre-orders/{pre_order}/payments/{payment}'
*/
destroy.url = (args: { pre_order: string | { id: string }, payment: string | number } | [pre_order: string | { id: string }, payment: string | number ], options?: RouteQueryOptions) => {

    if (Array.isArray(args)) {
        args = {
            pre_order: args[0],
            payment: args[1],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        pre_order: typeof args.pre_order === 'object'
        ? args.pre_order.id
        : args.pre_order,
        payment: args.payment,
    }

    return destroy.definition.url
            .replace('{pre_order}', parsedArgs.pre_order.toString())
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PreOrderController::destroy
* @see app/Http/Controllers/Admin/PreOrderController.php:194
* @route '/admin/pre-orders/{pre_order}/payments/{payment}'
*/
destroy.delete = (args: { pre_order: string | { id: string }, payment: string | number } | [pre_order: string | { id: string }, payment: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::destroy
* @see app/Http/Controllers/Admin/PreOrderController.php:194
* @route '/admin/pre-orders/{pre_order}/payments/{payment}'
*/
const destroyForm = (args: { pre_order: string | { id: string }, payment: string | number } | [pre_order: string | { id: string }, payment: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::destroy
* @see app/Http/Controllers/Admin/PreOrderController.php:194
* @route '/admin/pre-orders/{pre_order}/payments/{payment}'
*/
destroyForm.delete = (args: { pre_order: string | { id: string }, payment: string | number } | [pre_order: string | { id: string }, payment: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm



const payments = {
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default payments