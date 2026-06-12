import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\FuelTypeController::index
 * @see app/Http/Controllers/Admin/FuelTypeController.php:12
 * @route '/admin/fuel-types'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/fuel-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FuelTypeController::index
 * @see app/Http/Controllers/Admin/FuelTypeController.php:12
 * @route '/admin/fuel-types'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FuelTypeController::index
 * @see app/Http/Controllers/Admin/FuelTypeController.php:12
 * @route '/admin/fuel-types'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\FuelTypeController::index
 * @see app/Http/Controllers/Admin/FuelTypeController.php:12
 * @route '/admin/fuel-types'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\FuelTypeController::index
 * @see app/Http/Controllers/Admin/FuelTypeController.php:12
 * @route '/admin/fuel-types'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\FuelTypeController::index
 * @see app/Http/Controllers/Admin/FuelTypeController.php:12
 * @route '/admin/fuel-types'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\FuelTypeController::index
 * @see app/Http/Controllers/Admin/FuelTypeController.php:12
 * @route '/admin/fuel-types'
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
* @see \App\Http\Controllers\Admin\FuelTypeController::store
 * @see app/Http/Controllers/Admin/FuelTypeController.php:21
 * @route '/admin/fuel-types'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/fuel-types',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\FuelTypeController::store
 * @see app/Http/Controllers/Admin/FuelTypeController.php:21
 * @route '/admin/fuel-types'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FuelTypeController::store
 * @see app/Http/Controllers/Admin/FuelTypeController.php:21
 * @route '/admin/fuel-types'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\FuelTypeController::store
 * @see app/Http/Controllers/Admin/FuelTypeController.php:21
 * @route '/admin/fuel-types'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\FuelTypeController::store
 * @see app/Http/Controllers/Admin/FuelTypeController.php:21
 * @route '/admin/fuel-types'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\FuelTypeController::edit
 * @see app/Http/Controllers/Admin/FuelTypeController.php:0
 * @route '/admin/fuel-types/{fuel_type}/edit'
 */
export const edit = (args: { fuel_type: string | number } | [fuel_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/fuel-types/{fuel_type}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FuelTypeController::edit
 * @see app/Http/Controllers/Admin/FuelTypeController.php:0
 * @route '/admin/fuel-types/{fuel_type}/edit'
 */
edit.url = (args: { fuel_type: string | number } | [fuel_type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { fuel_type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    fuel_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        fuel_type: args.fuel_type,
                }

    return edit.definition.url
            .replace('{fuel_type}', parsedArgs.fuel_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FuelTypeController::edit
 * @see app/Http/Controllers/Admin/FuelTypeController.php:0
 * @route '/admin/fuel-types/{fuel_type}/edit'
 */
edit.get = (args: { fuel_type: string | number } | [fuel_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\FuelTypeController::edit
 * @see app/Http/Controllers/Admin/FuelTypeController.php:0
 * @route '/admin/fuel-types/{fuel_type}/edit'
 */
edit.head = (args: { fuel_type: string | number } | [fuel_type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\FuelTypeController::edit
 * @see app/Http/Controllers/Admin/FuelTypeController.php:0
 * @route '/admin/fuel-types/{fuel_type}/edit'
 */
    const editForm = (args: { fuel_type: string | number } | [fuel_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\FuelTypeController::edit
 * @see app/Http/Controllers/Admin/FuelTypeController.php:0
 * @route '/admin/fuel-types/{fuel_type}/edit'
 */
        editForm.get = (args: { fuel_type: string | number } | [fuel_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\FuelTypeController::edit
 * @see app/Http/Controllers/Admin/FuelTypeController.php:0
 * @route '/admin/fuel-types/{fuel_type}/edit'
 */
        editForm.head = (args: { fuel_type: string | number } | [fuel_type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\FuelTypeController::update
 * @see app/Http/Controllers/Admin/FuelTypeController.php:33
 * @route '/admin/fuel-types/{fuel_type}'
 */
export const update = (args: { fuel_type: string | { id: string } } | [fuel_type: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/fuel-types/{fuel_type}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\FuelTypeController::update
 * @see app/Http/Controllers/Admin/FuelTypeController.php:33
 * @route '/admin/fuel-types/{fuel_type}'
 */
update.url = (args: { fuel_type: string | { id: string } } | [fuel_type: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { fuel_type: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { fuel_type: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    fuel_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        fuel_type: typeof args.fuel_type === 'object'
                ? args.fuel_type.id
                : args.fuel_type,
                }

    return update.definition.url
            .replace('{fuel_type}', parsedArgs.fuel_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FuelTypeController::update
 * @see app/Http/Controllers/Admin/FuelTypeController.php:33
 * @route '/admin/fuel-types/{fuel_type}'
 */
update.put = (args: { fuel_type: string | { id: string } } | [fuel_type: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\FuelTypeController::update
 * @see app/Http/Controllers/Admin/FuelTypeController.php:33
 * @route '/admin/fuel-types/{fuel_type}'
 */
update.patch = (args: { fuel_type: string | { id: string } } | [fuel_type: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\FuelTypeController::update
 * @see app/Http/Controllers/Admin/FuelTypeController.php:33
 * @route '/admin/fuel-types/{fuel_type}'
 */
    const updateForm = (args: { fuel_type: string | { id: string } } | [fuel_type: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\FuelTypeController::update
 * @see app/Http/Controllers/Admin/FuelTypeController.php:33
 * @route '/admin/fuel-types/{fuel_type}'
 */
        updateForm.put = (args: { fuel_type: string | { id: string } } | [fuel_type: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\FuelTypeController::update
 * @see app/Http/Controllers/Admin/FuelTypeController.php:33
 * @route '/admin/fuel-types/{fuel_type}'
 */
        updateForm.patch = (args: { fuel_type: string | { id: string } } | [fuel_type: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\FuelTypeController::destroy
 * @see app/Http/Controllers/Admin/FuelTypeController.php:45
 * @route '/admin/fuel-types/{fuel_type}'
 */
export const destroy = (args: { fuel_type: string | { id: string } } | [fuel_type: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/fuel-types/{fuel_type}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\FuelTypeController::destroy
 * @see app/Http/Controllers/Admin/FuelTypeController.php:45
 * @route '/admin/fuel-types/{fuel_type}'
 */
destroy.url = (args: { fuel_type: string | { id: string } } | [fuel_type: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { fuel_type: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { fuel_type: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    fuel_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        fuel_type: typeof args.fuel_type === 'object'
                ? args.fuel_type.id
                : args.fuel_type,
                }

    return destroy.definition.url
            .replace('{fuel_type}', parsedArgs.fuel_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FuelTypeController::destroy
 * @see app/Http/Controllers/Admin/FuelTypeController.php:45
 * @route '/admin/fuel-types/{fuel_type}'
 */
destroy.delete = (args: { fuel_type: string | { id: string } } | [fuel_type: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\FuelTypeController::destroy
 * @see app/Http/Controllers/Admin/FuelTypeController.php:45
 * @route '/admin/fuel-types/{fuel_type}'
 */
    const destroyForm = (args: { fuel_type: string | { id: string } } | [fuel_type: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\FuelTypeController::destroy
 * @see app/Http/Controllers/Admin/FuelTypeController.php:45
 * @route '/admin/fuel-types/{fuel_type}'
 */
        destroyForm.delete = (args: { fuel_type: string | { id: string } } | [fuel_type: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const FuelTypeController = { index, store, edit, update, destroy }

export default FuelTypeController