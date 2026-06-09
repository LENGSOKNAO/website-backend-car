import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:14
* @route '/admin/orders'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:14
* @route '/admin/orders'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:14
* @route '/admin/orders'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:14
* @route '/admin/orders'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:14
* @route '/admin/orders'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:14
* @route '/admin/orders'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::index
* @see app/Http/Controllers/Admin/OrderController.php:14
* @route '/admin/orders'
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
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}'
*/
export const show = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/orders/{order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}'
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
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}'
*/
show.get = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}'
*/
show.head = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}'
*/
const showForm = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}'
*/
showForm.get = (args: { order: string | number } | [order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::show
* @see app/Http/Controllers/Admin/OrderController.php:35
* @route '/admin/orders/{order}'
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
* @see \App\Http\Controllers\Admin\OrderController::updateStatus
* @see app/Http/Controllers/Admin/OrderController.php:59
* @route '/admin/orders/{order}/status'
*/
export const updateStatus = (args: { order: string | { id: string } } | [order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

updateStatus.definition = {
    methods: ["put"],
    url: '/admin/orders/{order}/status',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::updateStatus
* @see app/Http/Controllers/Admin/OrderController.php:59
* @route '/admin/orders/{order}/status'
*/
updateStatus.url = (args: { order: string | { id: string } } | [order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return updateStatus.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::updateStatus
* @see app/Http/Controllers/Admin/OrderController.php:59
* @route '/admin/orders/{order}/status'
*/
updateStatus.put = (args: { order: string | { id: string } } | [order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::updateStatus
* @see app/Http/Controllers/Admin/OrderController.php:59
* @route '/admin/orders/{order}/status'
*/
const updateStatusForm = (args: { order: string | { id: string } } | [order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::updateStatus
* @see app/Http/Controllers/Admin/OrderController.php:59
* @route '/admin/orders/{order}/status'
*/
updateStatusForm.put = (args: { order: string | { id: string } } | [order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateStatus.form = updateStatusForm

/**
* @see \App\Http\Controllers\Admin\OrderController::addTransaction
* @see app/Http/Controllers/Admin/OrderController.php:81
* @route '/admin/orders/{order}/transactions'
*/
export const addTransaction = (args: { order: string | { id: string } } | [order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addTransaction.url(args, options),
    method: 'post',
})

addTransaction.definition = {
    methods: ["post"],
    url: '/admin/orders/{order}/transactions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::addTransaction
* @see app/Http/Controllers/Admin/OrderController.php:81
* @route '/admin/orders/{order}/transactions'
*/
addTransaction.url = (args: { order: string | { id: string } } | [order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return addTransaction.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::addTransaction
* @see app/Http/Controllers/Admin/OrderController.php:81
* @route '/admin/orders/{order}/transactions'
*/
addTransaction.post = (args: { order: string | { id: string } } | [order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addTransaction.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::addTransaction
* @see app/Http/Controllers/Admin/OrderController.php:81
* @route '/admin/orders/{order}/transactions'
*/
const addTransactionForm = (args: { order: string | { id: string } } | [order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addTransaction.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::addTransaction
* @see app/Http/Controllers/Admin/OrderController.php:81
* @route '/admin/orders/{order}/transactions'
*/
addTransactionForm.post = (args: { order: string | { id: string } } | [order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: addTransaction.url(args, options),
    method: 'post',
})

addTransaction.form = addTransactionForm

/**
* @see \App\Http\Controllers\Admin\OrderController::updateTransactionStatus
* @see app/Http/Controllers/Admin/OrderController.php:110
* @route '/admin/orders/{order}/transactions/{transaction}/status'
*/
export const updateTransactionStatus = (args: { order: string | { id: string }, transaction: string | { id: string } } | [order: string | { id: string }, transaction: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateTransactionStatus.url(args, options),
    method: 'put',
})

updateTransactionStatus.definition = {
    methods: ["put"],
    url: '/admin/orders/{order}/transactions/{transaction}/status',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\OrderController::updateTransactionStatus
* @see app/Http/Controllers/Admin/OrderController.php:110
* @route '/admin/orders/{order}/transactions/{transaction}/status'
*/
updateTransactionStatus.url = (args: { order: string | { id: string }, transaction: string | { id: string } } | [order: string | { id: string }, transaction: string | { id: string } ], options?: RouteQueryOptions) => {

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

    return updateTransactionStatus.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace('{transaction}', parsedArgs.transaction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderController::updateTransactionStatus
* @see app/Http/Controllers/Admin/OrderController.php:110
* @route '/admin/orders/{order}/transactions/{transaction}/status'
*/
updateTransactionStatus.put = (args: { order: string | { id: string }, transaction: string | { id: string } } | [order: string | { id: string }, transaction: string | { id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateTransactionStatus.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::updateTransactionStatus
* @see app/Http/Controllers/Admin/OrderController.php:110
* @route '/admin/orders/{order}/transactions/{transaction}/status'
*/
const updateTransactionStatusForm = (args: { order: string | { id: string }, transaction: string | { id: string } } | [order: string | { id: string }, transaction: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateTransactionStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\OrderController::updateTransactionStatus
* @see app/Http/Controllers/Admin/OrderController.php:110
* @route '/admin/orders/{order}/transactions/{transaction}/status'
*/
updateTransactionStatusForm.put = (args: { order: string | { id: string }, transaction: string | { id: string } } | [order: string | { id: string }, transaction: string | { id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateTransactionStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateTransactionStatus.form = updateTransactionStatusForm

const OrderController = { index, show, updateStatus, addTransaction, updateTransactionStatus }

export default OrderController