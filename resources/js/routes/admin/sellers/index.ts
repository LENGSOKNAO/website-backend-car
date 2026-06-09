import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SellerController::index
* @see app/Http/Controllers/Admin/SellerController.php:13
* @route '/admin/sellers'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/sellers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SellerController::index
* @see app/Http/Controllers/Admin/SellerController.php:13
* @route '/admin/sellers'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SellerController::index
* @see app/Http/Controllers/Admin/SellerController.php:13
* @route '/admin/sellers'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::index
* @see app/Http/Controllers/Admin/SellerController.php:13
* @route '/admin/sellers'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::index
* @see app/Http/Controllers/Admin/SellerController.php:13
* @route '/admin/sellers'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::index
* @see app/Http/Controllers/Admin/SellerController.php:13
* @route '/admin/sellers'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::index
* @see app/Http/Controllers/Admin/SellerController.php:13
* @route '/admin/sellers'
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
* @see \App\Http\Controllers\Admin\SellerController::create
* @see app/Http/Controllers/Admin/SellerController.php:36
* @route '/admin/sellers/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/sellers/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SellerController::create
* @see app/Http/Controllers/Admin/SellerController.php:36
* @route '/admin/sellers/create'
*/
create.url = (options?: RouteQueryOptions) => {




    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SellerController::create
* @see app/Http/Controllers/Admin/SellerController.php:36
* @route '/admin/sellers/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::create
* @see app/Http/Controllers/Admin/SellerController.php:36
* @route '/admin/sellers/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::create
* @see app/Http/Controllers/Admin/SellerController.php:36
* @route '/admin/sellers/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::create
* @see app/Http/Controllers/Admin/SellerController.php:36
* @route '/admin/sellers/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::create
* @see app/Http/Controllers/Admin/SellerController.php:36
* @route '/admin/sellers/create'
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
* @see \App\Http\Controllers\Admin\SellerController::store
* @see app/Http/Controllers/Admin/SellerController.php:41
* @route '/admin/sellers'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/sellers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SellerController::store
* @see app/Http/Controllers/Admin/SellerController.php:41
* @route '/admin/sellers'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SellerController::store
* @see app/Http/Controllers/Admin/SellerController.php:41
* @route '/admin/sellers'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::store
* @see app/Http/Controllers/Admin/SellerController.php:41
* @route '/admin/sellers'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::store
* @see app/Http/Controllers/Admin/SellerController.php:41
* @route '/admin/sellers'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\SellerController::edit
* @see app/Http/Controllers/Admin/SellerController.php:89
* @route '/admin/sellers/{seller}/edit'
*/
export const edit = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/sellers/{seller}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SellerController::edit
* @see app/Http/Controllers/Admin/SellerController.php:89
* @route '/admin/sellers/{seller}/edit'
*/
edit.url = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { seller: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { seller: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            seller: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        seller: typeof args.seller === 'object'
        ? args.seller.id
        : args.seller,
    }

    return edit.definition.url
            .replace('{seller}', parsedArgs.seller.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SellerController::edit
* @see app/Http/Controllers/Admin/SellerController.php:89
* @route '/admin/sellers/{seller}/edit'
*/
edit.get = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::edit
* @see app/Http/Controllers/Admin/SellerController.php:89
* @route '/admin/sellers/{seller}/edit'
*/
edit.head = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::edit
* @see app/Http/Controllers/Admin/SellerController.php:89
* @route '/admin/sellers/{seller}/edit'
*/
const editForm = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::edit
* @see app/Http/Controllers/Admin/SellerController.php:89
* @route '/admin/sellers/{seller}/edit'
*/
editForm.get = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::edit
* @see app/Http/Controllers/Admin/SellerController.php:89
* @route '/admin/sellers/{seller}/edit'
*/
editForm.head = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\SellerController::update
* @see app/Http/Controllers/Admin/SellerController.php:100
* @route '/admin/sellers/{seller}'
*/
export const update = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/sellers/{seller}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\SellerController::update
* @see app/Http/Controllers/Admin/SellerController.php:100
* @route '/admin/sellers/{seller}'
*/
update.url = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { seller: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { seller: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            seller: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        seller: typeof args.seller === 'object'
        ? args.seller.id
        : args.seller,
    }

    return update.definition.url
            .replace('{seller}', parsedArgs.seller.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SellerController::update
* @see app/Http/Controllers/Admin/SellerController.php:100
* @route '/admin/sellers/{seller}'
*/
update.put = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::update
* @see app/Http/Controllers/Admin/SellerController.php:100
* @route '/admin/sellers/{seller}'
*/
update.patch = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::update
* @see app/Http/Controllers/Admin/SellerController.php:100
* @route '/admin/sellers/{seller}'
*/
const updateForm = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::update
* @see app/Http/Controllers/Admin/SellerController.php:100
* @route '/admin/sellers/{seller}'
*/
updateForm.put = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::update
* @see app/Http/Controllers/Admin/SellerController.php:100
* @route '/admin/sellers/{seller}'
*/
updateForm.patch = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\SellerController::destroy
* @see app/Http/Controllers/Admin/SellerController.php:131
* @route '/admin/sellers/{seller}'
*/
export const destroy = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/sellers/{seller}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SellerController::destroy
* @see app/Http/Controllers/Admin/SellerController.php:131
* @route '/admin/sellers/{seller}'
*/
destroy.url = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { seller: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { seller: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            seller: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        seller: typeof args.seller === 'object'
        ? args.seller.id
        : args.seller,
    }

    return destroy.definition.url
            .replace('{seller}', parsedArgs.seller.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SellerController::destroy
* @see app/Http/Controllers/Admin/SellerController.php:131
* @route '/admin/sellers/{seller}'
*/
destroy.delete = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::destroy
* @see app/Http/Controllers/Admin/SellerController.php:131
* @route '/admin/sellers/{seller}'
*/
const destroyForm = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::destroy
* @see app/Http/Controllers/Admin/SellerController.php:131
* @route '/admin/sellers/{seller}'
*/
destroyForm.delete = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\Admin\SellerController::show
* @see app/Http/Controllers/Admin/SellerController.php:78
* @route '/admin/sellers/{seller}'
*/
export const show = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/sellers/{seller}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SellerController::show
* @see app/Http/Controllers/Admin/SellerController.php:78
* @route '/admin/sellers/{seller}'
*/
show.url = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { seller: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { seller: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            seller: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        seller: typeof args.seller === 'object'
        ? args.seller.id
        : args.seller,
    }

    return show.definition.url
            .replace('{seller}', parsedArgs.seller.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SellerController::show
* @see app/Http/Controllers/Admin/SellerController.php:78
* @route '/admin/sellers/{seller}'
*/
show.get = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::show
* @see app/Http/Controllers/Admin/SellerController.php:78
* @route '/admin/sellers/{seller}'
*/
show.head = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::show
* @see app/Http/Controllers/Admin/SellerController.php:78
* @route '/admin/sellers/{seller}'
*/
const showForm = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::show
* @see app/Http/Controllers/Admin/SellerController.php:78
* @route '/admin/sellers/{seller}'
*/
showForm.get = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SellerController::show
* @see app/Http/Controllers/Admin/SellerController.php:78
* @route '/admin/sellers/{seller}'
*/
showForm.head = (args: { seller: string | { id: string } } | [seller: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm



const sellers = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    show: Object.assign(show, show),
}

export default sellers