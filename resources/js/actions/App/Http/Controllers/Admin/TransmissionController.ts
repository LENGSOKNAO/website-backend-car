import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TransmissionController::index
* @see app/Http/Controllers/Admin/TransmissionController.php:12
* @route '/admin/transmissions'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/transmissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TransmissionController::index
* @see app/Http/Controllers/Admin/TransmissionController.php:12
* @route '/admin/transmissions'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransmissionController::index
* @see app/Http/Controllers/Admin/TransmissionController.php:12
* @route '/admin/transmissions'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::index
* @see app/Http/Controllers/Admin/TransmissionController.php:12
* @route '/admin/transmissions'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::index
* @see app/Http/Controllers/Admin/TransmissionController.php:12
* @route '/admin/transmissions'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::index
* @see app/Http/Controllers/Admin/TransmissionController.php:12
* @route '/admin/transmissions'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::index
* @see app/Http/Controllers/Admin/TransmissionController.php:12
* @route '/admin/transmissions'
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
* @see \App\Http\Controllers\Admin\TransmissionController::store
* @see app/Http/Controllers/Admin/TransmissionController.php:21
* @route '/admin/transmissions'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/transmissions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TransmissionController::store
* @see app/Http/Controllers/Admin/TransmissionController.php:21
* @route '/admin/transmissions'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransmissionController::store
* @see app/Http/Controllers/Admin/TransmissionController.php:21
* @route '/admin/transmissions'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::store
* @see app/Http/Controllers/Admin/TransmissionController.php:21
* @route '/admin/transmissions'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::store
* @see app/Http/Controllers/Admin/TransmissionController.php:21
* @route '/admin/transmissions'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\TransmissionController::edit
* @see app/Http/Controllers/Admin/TransmissionController.php:0
* @route '/admin/transmissions/{transmission}/edit'
*/
export const edit = (args: { transmission: string | number } | [transmission: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/transmissions/{transmission}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TransmissionController::edit
* @see app/Http/Controllers/Admin/TransmissionController.php:0
* @route '/admin/transmissions/{transmission}/edit'
*/
edit.url = (args: { transmission: string | number } | [transmission: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transmission: args }
    }


    if (Array.isArray(args)) {
        args = {
            transmission: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        transmission: args.transmission,
    }

    return edit.definition.url
            .replace('{transmission}', parsedArgs.transmission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransmissionController::edit
* @see app/Http/Controllers/Admin/TransmissionController.php:0
* @route '/admin/transmissions/{transmission}/edit'
*/
edit.get = (args: { transmission: string | number } | [transmission: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::edit
* @see app/Http/Controllers/Admin/TransmissionController.php:0
* @route '/admin/transmissions/{transmission}/edit'
*/
edit.head = (args: { transmission: string | number } | [transmission: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::edit
* @see app/Http/Controllers/Admin/TransmissionController.php:0
* @route '/admin/transmissions/{transmission}/edit'
*/
const editForm = (args: { transmission: string | number } | [transmission: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::edit
* @see app/Http/Controllers/Admin/TransmissionController.php:0
* @route '/admin/transmissions/{transmission}/edit'
*/
editForm.get = (args: { transmission: string | number } | [transmission: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::edit
* @see app/Http/Controllers/Admin/TransmissionController.php:0
* @route '/admin/transmissions/{transmission}/edit'
*/
editForm.head = (args: { transmission: string | number } | [transmission: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\TransmissionController::update
* @see app/Http/Controllers/Admin/TransmissionController.php:33
* @route '/admin/transmissions/{transmission}'
*/
export const update = (args: { transmission: string | { id: string } } | [transmission: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/transmissions/{transmission}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\TransmissionController::update
* @see app/Http/Controllers/Admin/TransmissionController.php:33
* @route '/admin/transmissions/{transmission}'
*/
update.url = (args: { transmission: string | { id: string } } | [transmission: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transmission: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { transmission: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            transmission: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        transmission: typeof args.transmission === 'object'
        ? args.transmission.id
        : args.transmission,
    }

    return update.definition.url
            .replace('{transmission}', parsedArgs.transmission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransmissionController::update
* @see app/Http/Controllers/Admin/TransmissionController.php:33
* @route '/admin/transmissions/{transmission}'
*/
update.put = (args: { transmission: string | { id: string } } | [transmission: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::update
* @see app/Http/Controllers/Admin/TransmissionController.php:33
* @route '/admin/transmissions/{transmission}'
*/
update.patch = (args: { transmission: string | { id: string } } | [transmission: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::update
* @see app/Http/Controllers/Admin/TransmissionController.php:33
* @route '/admin/transmissions/{transmission}'
*/
const updateForm = (args: { transmission: string | { id: string } } | [transmission: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::update
* @see app/Http/Controllers/Admin/TransmissionController.php:33
* @route '/admin/transmissions/{transmission}'
*/
updateForm.put = (args: { transmission: string | { id: string } } | [transmission: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::update
* @see app/Http/Controllers/Admin/TransmissionController.php:33
* @route '/admin/transmissions/{transmission}'
*/
updateForm.patch = (args: { transmission: string | { id: string } } | [transmission: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TransmissionController::destroy
* @see app/Http/Controllers/Admin/TransmissionController.php:45
* @route '/admin/transmissions/{transmission}'
*/
export const destroy = (args: { transmission: string | { id: string } } | [transmission: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/transmissions/{transmission}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TransmissionController::destroy
* @see app/Http/Controllers/Admin/TransmissionController.php:45
* @route '/admin/transmissions/{transmission}'
*/
destroy.url = (args: { transmission: string | { id: string } } | [transmission: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transmission: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { transmission: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            transmission: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        transmission: typeof args.transmission === 'object'
        ? args.transmission.id
        : args.transmission,
    }

    return destroy.definition.url
            .replace('{transmission}', parsedArgs.transmission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TransmissionController::destroy
* @see app/Http/Controllers/Admin/TransmissionController.php:45
* @route '/admin/transmissions/{transmission}'
*/
destroy.delete = (args: { transmission: string | { id: string } } | [transmission: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::destroy
* @see app/Http/Controllers/Admin/TransmissionController.php:45
* @route '/admin/transmissions/{transmission}'
*/
const destroyForm = (args: { transmission: string | { id: string } } | [transmission: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TransmissionController::destroy
* @see app/Http/Controllers/Admin/TransmissionController.php:45
* @route '/admin/transmissions/{transmission}'
*/
destroyForm.delete = (args: { transmission: string | { id: string } } | [transmission: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const TransmissionController = { index, store, edit, update, destroy }

export default TransmissionController