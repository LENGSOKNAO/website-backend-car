import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ConditionController::index
* @see app/Http/Controllers/Admin/ConditionController.php:12
* @route '/admin/conditions'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/conditions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ConditionController::index
* @see app/Http/Controllers/Admin/ConditionController.php:12
* @route '/admin/conditions'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ConditionController::index
* @see app/Http/Controllers/Admin/ConditionController.php:12
* @route '/admin/conditions'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::index
* @see app/Http/Controllers/Admin/ConditionController.php:12
* @route '/admin/conditions'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::index
* @see app/Http/Controllers/Admin/ConditionController.php:12
* @route '/admin/conditions'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::index
* @see app/Http/Controllers/Admin/ConditionController.php:12
* @route '/admin/conditions'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::index
* @see app/Http/Controllers/Admin/ConditionController.php:12
* @route '/admin/conditions'
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
* @see \App\Http\Controllers\Admin\ConditionController::store
* @see app/Http/Controllers/Admin/ConditionController.php:21
* @route '/admin/conditions'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/conditions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ConditionController::store
* @see app/Http/Controllers/Admin/ConditionController.php:21
* @route '/admin/conditions'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ConditionController::store
* @see app/Http/Controllers/Admin/ConditionController.php:21
* @route '/admin/conditions'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::store
* @see app/Http/Controllers/Admin/ConditionController.php:21
* @route '/admin/conditions'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::store
* @see app/Http/Controllers/Admin/ConditionController.php:21
* @route '/admin/conditions'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\ConditionController::edit
* @see app/Http/Controllers/Admin/ConditionController.php:0
* @route '/admin/conditions/{condition}/edit'
*/
export const edit = (args: { condition: string | number } | [condition: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/conditions/{condition}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ConditionController::edit
* @see app/Http/Controllers/Admin/ConditionController.php:0
* @route '/admin/conditions/{condition}/edit'
*/
edit.url = (args: { condition: string | number } | [condition: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { condition: args }
    }


    if (Array.isArray(args)) {
        args = {
            condition: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        condition: args.condition,
    }

    return edit.definition.url
            .replace('{condition}', parsedArgs.condition.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ConditionController::edit
* @see app/Http/Controllers/Admin/ConditionController.php:0
* @route '/admin/conditions/{condition}/edit'
*/
edit.get = (args: { condition: string | number } | [condition: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::edit
* @see app/Http/Controllers/Admin/ConditionController.php:0
* @route '/admin/conditions/{condition}/edit'
*/
edit.head = (args: { condition: string | number } | [condition: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::edit
* @see app/Http/Controllers/Admin/ConditionController.php:0
* @route '/admin/conditions/{condition}/edit'
*/
const editForm = (args: { condition: string | number } | [condition: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::edit
* @see app/Http/Controllers/Admin/ConditionController.php:0
* @route '/admin/conditions/{condition}/edit'
*/
editForm.get = (args: { condition: string | number } | [condition: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::edit
* @see app/Http/Controllers/Admin/ConditionController.php:0
* @route '/admin/conditions/{condition}/edit'
*/
editForm.head = (args: { condition: string | number } | [condition: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ConditionController::update
* @see app/Http/Controllers/Admin/ConditionController.php:33
* @route '/admin/conditions/{condition}'
*/
export const update = (args: { condition: string | { id: string } } | [condition: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/conditions/{condition}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ConditionController::update
* @see app/Http/Controllers/Admin/ConditionController.php:33
* @route '/admin/conditions/{condition}'
*/
update.url = (args: { condition: string | { id: string } } | [condition: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { condition: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { condition: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            condition: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        condition: typeof args.condition === 'object'
        ? args.condition.id
        : args.condition,
    }

    return update.definition.url
            .replace('{condition}', parsedArgs.condition.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ConditionController::update
* @see app/Http/Controllers/Admin/ConditionController.php:33
* @route '/admin/conditions/{condition}'
*/
update.put = (args: { condition: string | { id: string } } | [condition: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::update
* @see app/Http/Controllers/Admin/ConditionController.php:33
* @route '/admin/conditions/{condition}'
*/
update.patch = (args: { condition: string | { id: string } } | [condition: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::update
* @see app/Http/Controllers/Admin/ConditionController.php:33
* @route '/admin/conditions/{condition}'
*/
const updateForm = (args: { condition: string | { id: string } } | [condition: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::update
* @see app/Http/Controllers/Admin/ConditionController.php:33
* @route '/admin/conditions/{condition}'
*/
updateForm.put = (args: { condition: string | { id: string } } | [condition: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::update
* @see app/Http/Controllers/Admin/ConditionController.php:33
* @route '/admin/conditions/{condition}'
*/
updateForm.patch = (args: { condition: string | { id: string } } | [condition: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ConditionController::destroy
* @see app/Http/Controllers/Admin/ConditionController.php:45
* @route '/admin/conditions/{condition}'
*/
export const destroy = (args: { condition: string | { id: string } } | [condition: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/conditions/{condition}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ConditionController::destroy
* @see app/Http/Controllers/Admin/ConditionController.php:45
* @route '/admin/conditions/{condition}'
*/
destroy.url = (args: { condition: string | { id: string } } | [condition: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { condition: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { condition: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            condition: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        condition: typeof args.condition === 'object'
        ? args.condition.id
        : args.condition,
    }

    return destroy.definition.url
            .replace('{condition}', parsedArgs.condition.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ConditionController::destroy
* @see app/Http/Controllers/Admin/ConditionController.php:45
* @route '/admin/conditions/{condition}'
*/
destroy.delete = (args: { condition: string | { id: string } } | [condition: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::destroy
* @see app/Http/Controllers/Admin/ConditionController.php:45
* @route '/admin/conditions/{condition}'
*/
const destroyForm = (args: { condition: string | { id: string } } | [condition: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ConditionController::destroy
* @see app/Http/Controllers/Admin/ConditionController.php:45
* @route '/admin/conditions/{condition}'
*/
destroyForm.delete = (args: { condition: string | { id: string } } | [condition: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const ConditionController = { index, store, edit, update, destroy }

export default ConditionController