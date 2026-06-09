import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::index
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:12
* @route '/admin/vehicle-histories'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/vehicle-histories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::index
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:12
* @route '/admin/vehicle-histories'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::index
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:12
* @route '/admin/vehicle-histories'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::index
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:12
* @route '/admin/vehicle-histories'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::index
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:12
* @route '/admin/vehicle-histories'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::index
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:12
* @route '/admin/vehicle-histories'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::index
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:12
* @route '/admin/vehicle-histories'
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
* @see \App\Http\Controllers\Admin\VehicleHistoryController::store
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:34
* @route '/admin/vehicle-histories'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/vehicle-histories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::store
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:34
* @route '/admin/vehicle-histories'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::store
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:34
* @route '/admin/vehicle-histories'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::store
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:34
* @route '/admin/vehicle-histories'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::store
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:34
* @route '/admin/vehicle-histories'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::show
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:23
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
export const show = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/vehicle-histories/{vehicle_history}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::show
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:23
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
show.url = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vehicle_history: args }
    }


    if (Array.isArray(args)) {
        args = {
            vehicle_history: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        vehicle_history: args.vehicle_history,
    }

    return show.definition.url
            .replace('{vehicle_history}', parsedArgs.vehicle_history.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::show
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:23
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
show.get = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::show
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:23
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
show.head = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::show
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:23
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
const showForm = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::show
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:23
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
showForm.get = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::show
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:23
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
showForm.head = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\VehicleHistoryController::edit
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:0
* @route '/admin/vehicle-histories/{vehicle_history}/edit'
*/
export const edit = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/vehicle-histories/{vehicle_history}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::edit
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:0
* @route '/admin/vehicle-histories/{vehicle_history}/edit'
*/
edit.url = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vehicle_history: args }
    }


    if (Array.isArray(args)) {
        args = {
            vehicle_history: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        vehicle_history: args.vehicle_history,
    }

    return edit.definition.url
            .replace('{vehicle_history}', parsedArgs.vehicle_history.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::edit
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:0
* @route '/admin/vehicle-histories/{vehicle_history}/edit'
*/
edit.get = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::edit
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:0
* @route '/admin/vehicle-histories/{vehicle_history}/edit'
*/
edit.head = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::edit
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:0
* @route '/admin/vehicle-histories/{vehicle_history}/edit'
*/
const editForm = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::edit
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:0
* @route '/admin/vehicle-histories/{vehicle_history}/edit'
*/
editForm.get = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::edit
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:0
* @route '/admin/vehicle-histories/{vehicle_history}/edit'
*/
editForm.head = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\VehicleHistoryController::update
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:53
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
export const update = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/vehicle-histories/{vehicle_history}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::update
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:53
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
update.url = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vehicle_history: args }
    }


    if (Array.isArray(args)) {
        args = {
            vehicle_history: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        vehicle_history: args.vehicle_history,
    }

    return update.definition.url
            .replace('{vehicle_history}', parsedArgs.vehicle_history.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::update
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:53
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
update.put = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::update
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:53
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
update.patch = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::update
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:53
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
const updateForm = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::update
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:53
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
updateForm.put = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::update
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:53
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
updateForm.patch = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\VehicleHistoryController::destroy
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:72
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
export const destroy = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/vehicle-histories/{vehicle_history}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::destroy
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:72
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
destroy.url = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vehicle_history: args }
    }


    if (Array.isArray(args)) {
        args = {
            vehicle_history: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        vehicle_history: args.vehicle_history,
    }

    return destroy.definition.url
            .replace('{vehicle_history}', parsedArgs.vehicle_history.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::destroy
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:72
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
destroy.delete = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::destroy
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:72
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
const destroyForm = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VehicleHistoryController::destroy
* @see app/Http/Controllers/Admin/VehicleHistoryController.php:72
* @route '/admin/vehicle-histories/{vehicle_history}'
*/
destroyForm.delete = (args: { vehicle_history: string | number } | [vehicle_history: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const VehicleHistoryController = { index, store, show, edit, update, destroy }

export default VehicleHistoryController