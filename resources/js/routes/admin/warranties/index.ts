import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\WarrantyController::index
* @see app/Http/Controllers/Admin/WarrantyController.php:12
* @route '/admin/warranties'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/warranties',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WarrantyController::index
* @see app/Http/Controllers/Admin/WarrantyController.php:12
* @route '/admin/warranties'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WarrantyController::index
* @see app/Http/Controllers/Admin/WarrantyController.php:12
* @route '/admin/warranties'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::index
* @see app/Http/Controllers/Admin/WarrantyController.php:12
* @route '/admin/warranties'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::index
* @see app/Http/Controllers/Admin/WarrantyController.php:12
* @route '/admin/warranties'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::index
* @see app/Http/Controllers/Admin/WarrantyController.php:12
* @route '/admin/warranties'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::index
* @see app/Http/Controllers/Admin/WarrantyController.php:12
* @route '/admin/warranties'
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
* @see \App\Http\Controllers\Admin\WarrantyController::show
* @see app/Http/Controllers/Admin/WarrantyController.php:23
* @route '/admin/warranties/{warranty}'
*/
export const show = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/warranties/{warranty}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WarrantyController::show
* @see app/Http/Controllers/Admin/WarrantyController.php:23
* @route '/admin/warranties/{warranty}'
*/
show.url = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { warranty: args }
    }


    if (Array.isArray(args)) {
        args = {
            warranty: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        warranty: args.warranty,
    }

    return show.definition.url
            .replace('{warranty}', parsedArgs.warranty.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WarrantyController::show
* @see app/Http/Controllers/Admin/WarrantyController.php:23
* @route '/admin/warranties/{warranty}'
*/
show.get = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::show
* @see app/Http/Controllers/Admin/WarrantyController.php:23
* @route '/admin/warranties/{warranty}'
*/
show.head = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::show
* @see app/Http/Controllers/Admin/WarrantyController.php:23
* @route '/admin/warranties/{warranty}'
*/
const showForm = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::show
* @see app/Http/Controllers/Admin/WarrantyController.php:23
* @route '/admin/warranties/{warranty}'
*/
showForm.get = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::show
* @see app/Http/Controllers/Admin/WarrantyController.php:23
* @route '/admin/warranties/{warranty}'
*/
showForm.head = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\WarrantyController::edit
* @see app/Http/Controllers/Admin/WarrantyController.php:0
* @route '/admin/warranties/{warranty}/edit'
*/
export const edit = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/warranties/{warranty}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WarrantyController::edit
* @see app/Http/Controllers/Admin/WarrantyController.php:0
* @route '/admin/warranties/{warranty}/edit'
*/
edit.url = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { warranty: args }
    }


    if (Array.isArray(args)) {
        args = {
            warranty: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        warranty: args.warranty,
    }

    return edit.definition.url
            .replace('{warranty}', parsedArgs.warranty.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WarrantyController::edit
* @see app/Http/Controllers/Admin/WarrantyController.php:0
* @route '/admin/warranties/{warranty}/edit'
*/
edit.get = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::edit
* @see app/Http/Controllers/Admin/WarrantyController.php:0
* @route '/admin/warranties/{warranty}/edit'
*/
edit.head = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::edit
* @see app/Http/Controllers/Admin/WarrantyController.php:0
* @route '/admin/warranties/{warranty}/edit'
*/
const editForm = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::edit
* @see app/Http/Controllers/Admin/WarrantyController.php:0
* @route '/admin/warranties/{warranty}/edit'
*/
editForm.get = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::edit
* @see app/Http/Controllers/Admin/WarrantyController.php:0
* @route '/admin/warranties/{warranty}/edit'
*/
editForm.head = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\WarrantyController::update
* @see app/Http/Controllers/Admin/WarrantyController.php:34
* @route '/admin/warranties/{warranty}'
*/
export const update = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/warranties/{warranty}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\WarrantyController::update
* @see app/Http/Controllers/Admin/WarrantyController.php:34
* @route '/admin/warranties/{warranty}'
*/
update.url = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { warranty: args }
    }


    if (Array.isArray(args)) {
        args = {
            warranty: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        warranty: args.warranty,
    }

    return update.definition.url
            .replace('{warranty}', parsedArgs.warranty.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WarrantyController::update
* @see app/Http/Controllers/Admin/WarrantyController.php:34
* @route '/admin/warranties/{warranty}'
*/
update.put = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::update
* @see app/Http/Controllers/Admin/WarrantyController.php:34
* @route '/admin/warranties/{warranty}'
*/
update.patch = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::update
* @see app/Http/Controllers/Admin/WarrantyController.php:34
* @route '/admin/warranties/{warranty}'
*/
const updateForm = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::update
* @see app/Http/Controllers/Admin/WarrantyController.php:34
* @route '/admin/warranties/{warranty}'
*/
updateForm.put = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::update
* @see app/Http/Controllers/Admin/WarrantyController.php:34
* @route '/admin/warranties/{warranty}'
*/
updateForm.patch = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\WarrantyController::destroy
* @see app/Http/Controllers/Admin/WarrantyController.php:50
* @route '/admin/warranties/{warranty}'
*/
export const destroy = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/warranties/{warranty}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\WarrantyController::destroy
* @see app/Http/Controllers/Admin/WarrantyController.php:50
* @route '/admin/warranties/{warranty}'
*/
destroy.url = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { warranty: args }
    }


    if (Array.isArray(args)) {
        args = {
            warranty: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        warranty: args.warranty,
    }

    return destroy.definition.url
            .replace('{warranty}', parsedArgs.warranty.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WarrantyController::destroy
* @see app/Http/Controllers/Admin/WarrantyController.php:50
* @route '/admin/warranties/{warranty}'
*/
destroy.delete = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::destroy
* @see app/Http/Controllers/Admin/WarrantyController.php:50
* @route '/admin/warranties/{warranty}'
*/
const destroyForm = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\WarrantyController::destroy
* @see app/Http/Controllers/Admin/WarrantyController.php:50
* @route '/admin/warranties/{warranty}'
*/
destroyForm.delete = (args: { warranty: string | number } | [warranty: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm



const warranties = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default warranties