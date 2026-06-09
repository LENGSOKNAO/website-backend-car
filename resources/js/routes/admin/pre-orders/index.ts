import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import payments from './payments'
/**
* @see \App\Http\Controllers\Admin\PreOrderController::index
* @see app/Http/Controllers/Admin/PreOrderController.php:17
* @route '/admin/pre-orders'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/pre-orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PreOrderController::index
* @see app/Http/Controllers/Admin/PreOrderController.php:17
* @route '/admin/pre-orders'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PreOrderController::index
* @see app/Http/Controllers/Admin/PreOrderController.php:17
* @route '/admin/pre-orders'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::index
* @see app/Http/Controllers/Admin/PreOrderController.php:17
* @route '/admin/pre-orders'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::index
* @see app/Http/Controllers/Admin/PreOrderController.php:17
* @route '/admin/pre-orders'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::index
* @see app/Http/Controllers/Admin/PreOrderController.php:17
* @route '/admin/pre-orders'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::index
* @see app/Http/Controllers/Admin/PreOrderController.php:17
* @route '/admin/pre-orders'
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
* @see \App\Http\Controllers\Admin\PreOrderController::create
* @see app/Http/Controllers/Admin/PreOrderController.php:63
* @route '/admin/pre-orders/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/pre-orders/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PreOrderController::create
* @see app/Http/Controllers/Admin/PreOrderController.php:63
* @route '/admin/pre-orders/create'
*/
create.url = (options?: RouteQueryOptions) => {




    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PreOrderController::create
* @see app/Http/Controllers/Admin/PreOrderController.php:63
* @route '/admin/pre-orders/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::create
* @see app/Http/Controllers/Admin/PreOrderController.php:63
* @route '/admin/pre-orders/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::create
* @see app/Http/Controllers/Admin/PreOrderController.php:63
* @route '/admin/pre-orders/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::create
* @see app/Http/Controllers/Admin/PreOrderController.php:63
* @route '/admin/pre-orders/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::create
* @see app/Http/Controllers/Admin/PreOrderController.php:63
* @route '/admin/pre-orders/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\Admin\PreOrderController::store
* @see app/Http/Controllers/Admin/PreOrderController.php:81
* @route '/admin/pre-orders'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/pre-orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PreOrderController::store
* @see app/Http/Controllers/Admin/PreOrderController.php:81
* @route '/admin/pre-orders'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PreOrderController::store
* @see app/Http/Controllers/Admin/PreOrderController.php:81
* @route '/admin/pre-orders'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::store
* @see app/Http/Controllers/Admin/PreOrderController.php:81
* @route '/admin/pre-orders'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::store
* @see app/Http/Controllers/Admin/PreOrderController.php:81
* @route '/admin/pre-orders'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\PreOrderController::show
* @see app/Http/Controllers/Admin/PreOrderController.php:135
* @route '/admin/pre-orders/{pre_order}'
*/
export const show = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/pre-orders/{pre_order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PreOrderController::show
* @see app/Http/Controllers/Admin/PreOrderController.php:135
* @route '/admin/pre-orders/{pre_order}'
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
* @see \App\Http\Controllers\Admin\PreOrderController::show
* @see app/Http/Controllers/Admin/PreOrderController.php:135
* @route '/admin/pre-orders/{pre_order}'
*/
show.get = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::show
* @see app/Http/Controllers/Admin/PreOrderController.php:135
* @route '/admin/pre-orders/{pre_order}'
*/
show.head = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::show
* @see app/Http/Controllers/Admin/PreOrderController.php:135
* @route '/admin/pre-orders/{pre_order}'
*/
const showForm = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::show
* @see app/Http/Controllers/Admin/PreOrderController.php:135
* @route '/admin/pre-orders/{pre_order}'
*/
showForm.get = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::show
* @see app/Http/Controllers/Admin/PreOrderController.php:135
* @route '/admin/pre-orders/{pre_order}'
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

/**
* @see \App\Http\Controllers\Admin\PreOrderController::edit
* @see app/Http/Controllers/Admin/PreOrderController.php:204
* @route '/admin/pre-orders/{pre_order}/edit'
*/
export const edit = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/pre-orders/{pre_order}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PreOrderController::edit
* @see app/Http/Controllers/Admin/PreOrderController.php:204
* @route '/admin/pre-orders/{pre_order}/edit'
*/
edit.url = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{pre_order}', parsedArgs.pre_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PreOrderController::edit
* @see app/Http/Controllers/Admin/PreOrderController.php:204
* @route '/admin/pre-orders/{pre_order}/edit'
*/
edit.get = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::edit
* @see app/Http/Controllers/Admin/PreOrderController.php:204
* @route '/admin/pre-orders/{pre_order}/edit'
*/
edit.head = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::edit
* @see app/Http/Controllers/Admin/PreOrderController.php:204
* @route '/admin/pre-orders/{pre_order}/edit'
*/
const editForm = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::edit
* @see app/Http/Controllers/Admin/PreOrderController.php:204
* @route '/admin/pre-orders/{pre_order}/edit'
*/
editForm.get = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::edit
* @see app/Http/Controllers/Admin/PreOrderController.php:204
* @route '/admin/pre-orders/{pre_order}/edit'
*/
editForm.head = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Admin\PreOrderController::update
* @see app/Http/Controllers/Admin/PreOrderController.php:225
* @route '/admin/pre-orders/{pre_order}'
*/
export const update = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/pre-orders/{pre_order}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\PreOrderController::update
* @see app/Http/Controllers/Admin/PreOrderController.php:225
* @route '/admin/pre-orders/{pre_order}'
*/
update.url = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{pre_order}', parsedArgs.pre_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PreOrderController::update
* @see app/Http/Controllers/Admin/PreOrderController.php:225
* @route '/admin/pre-orders/{pre_order}'
*/
update.put = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::update
* @see app/Http/Controllers/Admin/PreOrderController.php:225
* @route '/admin/pre-orders/{pre_order}'
*/
update.patch = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::update
* @see app/Http/Controllers/Admin/PreOrderController.php:225
* @route '/admin/pre-orders/{pre_order}'
*/
const updateForm = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::update
* @see app/Http/Controllers/Admin/PreOrderController.php:225
* @route '/admin/pre-orders/{pre_order}'
*/
updateForm.put = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::update
* @see app/Http/Controllers/Admin/PreOrderController.php:225
* @route '/admin/pre-orders/{pre_order}'
*/
updateForm.patch = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Admin\PreOrderController::destroy
* @see app/Http/Controllers/Admin/PreOrderController.php:277
* @route '/admin/pre-orders/{pre_order}'
*/
export const destroy = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/pre-orders/{pre_order}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PreOrderController::destroy
* @see app/Http/Controllers/Admin/PreOrderController.php:277
* @route '/admin/pre-orders/{pre_order}'
*/
destroy.url = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{pre_order}', parsedArgs.pre_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PreOrderController::destroy
* @see app/Http/Controllers/Admin/PreOrderController.php:277
* @route '/admin/pre-orders/{pre_order}'
*/
destroy.delete = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\PreOrderController::destroy
* @see app/Http/Controllers/Admin/PreOrderController.php:277
* @route '/admin/pre-orders/{pre_order}'
*/
const destroyForm = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/PreOrderController.php:277
* @route '/admin/pre-orders/{pre_order}'
*/
destroyForm.delete = (args: { pre_order: string | { id: string } } | [pre_order: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm



const preOrders = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    payments: Object.assign(payments, payments),
}

export default preOrders