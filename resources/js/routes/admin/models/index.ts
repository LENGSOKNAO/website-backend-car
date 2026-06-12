import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ModelController::index
 * @see app/Http/Controllers/Admin/ModelController.php:13
 * @route '/admin/models'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/models',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ModelController::index
 * @see app/Http/Controllers/Admin/ModelController.php:13
 * @route '/admin/models'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ModelController::index
 * @see app/Http/Controllers/Admin/ModelController.php:13
 * @route '/admin/models'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ModelController::index
 * @see app/Http/Controllers/Admin/ModelController.php:13
 * @route '/admin/models'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ModelController::index
 * @see app/Http/Controllers/Admin/ModelController.php:13
 * @route '/admin/models'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ModelController::index
 * @see app/Http/Controllers/Admin/ModelController.php:13
 * @route '/admin/models'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ModelController::index
 * @see app/Http/Controllers/Admin/ModelController.php:13
 * @route '/admin/models'
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
* @see \App\Http\Controllers\Admin\ModelController::store
 * @see app/Http/Controllers/Admin/ModelController.php:24
 * @route '/admin/models'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/models',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ModelController::store
 * @see app/Http/Controllers/Admin/ModelController.php:24
 * @route '/admin/models'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ModelController::store
 * @see app/Http/Controllers/Admin/ModelController.php:24
 * @route '/admin/models'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ModelController::store
 * @see app/Http/Controllers/Admin/ModelController.php:24
 * @route '/admin/models'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ModelController::store
 * @see app/Http/Controllers/Admin/ModelController.php:24
 * @route '/admin/models'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ModelController::edit
 * @see app/Http/Controllers/Admin/ModelController.php:0
 * @route '/admin/models/{model}/edit'
 */
export const edit = (args: { model: string | number } | [model: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/models/{model}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ModelController::edit
 * @see app/Http/Controllers/Admin/ModelController.php:0
 * @route '/admin/models/{model}/edit'
 */
edit.url = (args: { model: string | number } | [model: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { model: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    model: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        model: args.model,
                }

    return edit.definition.url
            .replace('{model}', parsedArgs.model.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ModelController::edit
 * @see app/Http/Controllers/Admin/ModelController.php:0
 * @route '/admin/models/{model}/edit'
 */
edit.get = (args: { model: string | number } | [model: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ModelController::edit
 * @see app/Http/Controllers/Admin/ModelController.php:0
 * @route '/admin/models/{model}/edit'
 */
edit.head = (args: { model: string | number } | [model: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ModelController::edit
 * @see app/Http/Controllers/Admin/ModelController.php:0
 * @route '/admin/models/{model}/edit'
 */
    const editForm = (args: { model: string | number } | [model: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ModelController::edit
 * @see app/Http/Controllers/Admin/ModelController.php:0
 * @route '/admin/models/{model}/edit'
 */
        editForm.get = (args: { model: string | number } | [model: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ModelController::edit
 * @see app/Http/Controllers/Admin/ModelController.php:0
 * @route '/admin/models/{model}/edit'
 */
        editForm.head = (args: { model: string | number } | [model: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ModelController::update
 * @see app/Http/Controllers/Admin/ModelController.php:39
 * @route '/admin/models/{model}'
 */
export const update = (args: { model: string | { id: string } } | [model: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/models/{model}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ModelController::update
 * @see app/Http/Controllers/Admin/ModelController.php:39
 * @route '/admin/models/{model}'
 */
update.url = (args: { model: string | { id: string } } | [model: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { model: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { model: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    model: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        model: typeof args.model === 'object'
                ? args.model.id
                : args.model,
                }

    return update.definition.url
            .replace('{model}', parsedArgs.model.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ModelController::update
 * @see app/Http/Controllers/Admin/ModelController.php:39
 * @route '/admin/models/{model}'
 */
update.put = (args: { model: string | { id: string } } | [model: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\ModelController::update
 * @see app/Http/Controllers/Admin/ModelController.php:39
 * @route '/admin/models/{model}'
 */
update.patch = (args: { model: string | { id: string } } | [model: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ModelController::update
 * @see app/Http/Controllers/Admin/ModelController.php:39
 * @route '/admin/models/{model}'
 */
    const updateForm = (args: { model: string | { id: string } } | [model: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ModelController::update
 * @see app/Http/Controllers/Admin/ModelController.php:39
 * @route '/admin/models/{model}'
 */
        updateForm.put = (args: { model: string | { id: string } } | [model: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\ModelController::update
 * @see app/Http/Controllers/Admin/ModelController.php:39
 * @route '/admin/models/{model}'
 */
        updateForm.patch = (args: { model: string | { id: string } } | [model: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ModelController::destroy
 * @see app/Http/Controllers/Admin/ModelController.php:54
 * @route '/admin/models/{model}'
 */
export const destroy = (args: { model: string | { id: string } } | [model: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/models/{model}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ModelController::destroy
 * @see app/Http/Controllers/Admin/ModelController.php:54
 * @route '/admin/models/{model}'
 */
destroy.url = (args: { model: string | { id: string } } | [model: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { model: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { model: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    model: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        model: typeof args.model === 'object'
                ? args.model.id
                : args.model,
                }

    return destroy.definition.url
            .replace('{model}', parsedArgs.model.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ModelController::destroy
 * @see app/Http/Controllers/Admin/ModelController.php:54
 * @route '/admin/models/{model}'
 */
destroy.delete = (args: { model: string | { id: string } } | [model: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ModelController::destroy
 * @see app/Http/Controllers/Admin/ModelController.php:54
 * @route '/admin/models/{model}'
 */
    const destroyForm = (args: { model: string | { id: string } } | [model: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ModelController::destroy
 * @see app/Http/Controllers/Admin/ModelController.php:54
 * @route '/admin/models/{model}'
 */
        destroyForm.delete = (args: { model: string | { id: string } } | [model: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const models = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default models