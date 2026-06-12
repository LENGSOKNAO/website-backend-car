import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\MakeController::index
 * @see app/Http/Controllers/Admin/MakeController.php:12
 * @route '/admin/makes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/makes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MakeController::index
 * @see app/Http/Controllers/Admin/MakeController.php:12
 * @route '/admin/makes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MakeController::index
 * @see app/Http/Controllers/Admin/MakeController.php:12
 * @route '/admin/makes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MakeController::index
 * @see app/Http/Controllers/Admin/MakeController.php:12
 * @route '/admin/makes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MakeController::index
 * @see app/Http/Controllers/Admin/MakeController.php:12
 * @route '/admin/makes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MakeController::index
 * @see app/Http/Controllers/Admin/MakeController.php:12
 * @route '/admin/makes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MakeController::index
 * @see app/Http/Controllers/Admin/MakeController.php:12
 * @route '/admin/makes'
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
* @see \App\Http\Controllers\Admin\MakeController::store
 * @see app/Http/Controllers/Admin/MakeController.php:21
 * @route '/admin/makes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/makes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\MakeController::store
 * @see app/Http/Controllers/Admin/MakeController.php:21
 * @route '/admin/makes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MakeController::store
 * @see app/Http/Controllers/Admin/MakeController.php:21
 * @route '/admin/makes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\MakeController::store
 * @see app/Http/Controllers/Admin/MakeController.php:21
 * @route '/admin/makes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MakeController::store
 * @see app/Http/Controllers/Admin/MakeController.php:21
 * @route '/admin/makes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\MakeController::edit
 * @see app/Http/Controllers/Admin/MakeController.php:0
 * @route '/admin/makes/{make}/edit'
 */
export const edit = (args: { make: string | number } | [make: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/makes/{make}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MakeController::edit
 * @see app/Http/Controllers/Admin/MakeController.php:0
 * @route '/admin/makes/{make}/edit'
 */
edit.url = (args: { make: string | number } | [make: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { make: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    make: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        make: args.make,
                }

    return edit.definition.url
            .replace('{make}', parsedArgs.make.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MakeController::edit
 * @see app/Http/Controllers/Admin/MakeController.php:0
 * @route '/admin/makes/{make}/edit'
 */
edit.get = (args: { make: string | number } | [make: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MakeController::edit
 * @see app/Http/Controllers/Admin/MakeController.php:0
 * @route '/admin/makes/{make}/edit'
 */
edit.head = (args: { make: string | number } | [make: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MakeController::edit
 * @see app/Http/Controllers/Admin/MakeController.php:0
 * @route '/admin/makes/{make}/edit'
 */
    const editForm = (args: { make: string | number } | [make: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MakeController::edit
 * @see app/Http/Controllers/Admin/MakeController.php:0
 * @route '/admin/makes/{make}/edit'
 */
        editForm.get = (args: { make: string | number } | [make: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MakeController::edit
 * @see app/Http/Controllers/Admin/MakeController.php:0
 * @route '/admin/makes/{make}/edit'
 */
        editForm.head = (args: { make: string | number } | [make: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\MakeController::update
 * @see app/Http/Controllers/Admin/MakeController.php:34
 * @route '/admin/makes/{make}'
 */
export const update = (args: { make: string | { id: string } } | [make: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/makes/{make}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\MakeController::update
 * @see app/Http/Controllers/Admin/MakeController.php:34
 * @route '/admin/makes/{make}'
 */
update.url = (args: { make: string | { id: string } } | [make: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { make: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { make: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    make: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        make: typeof args.make === 'object'
                ? args.make.id
                : args.make,
                }

    return update.definition.url
            .replace('{make}', parsedArgs.make.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MakeController::update
 * @see app/Http/Controllers/Admin/MakeController.php:34
 * @route '/admin/makes/{make}'
 */
update.put = (args: { make: string | { id: string } } | [make: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\MakeController::update
 * @see app/Http/Controllers/Admin/MakeController.php:34
 * @route '/admin/makes/{make}'
 */
update.patch = (args: { make: string | { id: string } } | [make: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\MakeController::update
 * @see app/Http/Controllers/Admin/MakeController.php:34
 * @route '/admin/makes/{make}'
 */
    const updateForm = (args: { make: string | { id: string } } | [make: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MakeController::update
 * @see app/Http/Controllers/Admin/MakeController.php:34
 * @route '/admin/makes/{make}'
 */
        updateForm.put = (args: { make: string | { id: string } } | [make: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\MakeController::update
 * @see app/Http/Controllers/Admin/MakeController.php:34
 * @route '/admin/makes/{make}'
 */
        updateForm.patch = (args: { make: string | { id: string } } | [make: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\MakeController::destroy
 * @see app/Http/Controllers/Admin/MakeController.php:47
 * @route '/admin/makes/{make}'
 */
export const destroy = (args: { make: string | { id: string } } | [make: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/makes/{make}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\MakeController::destroy
 * @see app/Http/Controllers/Admin/MakeController.php:47
 * @route '/admin/makes/{make}'
 */
destroy.url = (args: { make: string | { id: string } } | [make: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { make: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { make: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    make: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        make: typeof args.make === 'object'
                ? args.make.id
                : args.make,
                }

    return destroy.definition.url
            .replace('{make}', parsedArgs.make.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MakeController::destroy
 * @see app/Http/Controllers/Admin/MakeController.php:47
 * @route '/admin/makes/{make}'
 */
destroy.delete = (args: { make: string | { id: string } } | [make: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\MakeController::destroy
 * @see app/Http/Controllers/Admin/MakeController.php:47
 * @route '/admin/makes/{make}'
 */
    const destroyForm = (args: { make: string | { id: string } } | [make: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MakeController::destroy
 * @see app/Http/Controllers/Admin/MakeController.php:47
 * @route '/admin/makes/{make}'
 */
        destroyForm.delete = (args: { make: string | { id: string } } | [make: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const MakeController = { index, store, edit, update, destroy }

export default MakeController