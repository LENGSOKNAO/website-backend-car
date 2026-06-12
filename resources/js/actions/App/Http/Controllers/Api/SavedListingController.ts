import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\SavedListingController::index
 * @see app/Http/Controllers/Api/SavedListingController.php:11
 * @route '/v1/saved-listings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/v1/saved-listings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SavedListingController::index
 * @see app/Http/Controllers/Api/SavedListingController.php:11
 * @route '/v1/saved-listings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SavedListingController::index
 * @see app/Http/Controllers/Api/SavedListingController.php:11
 * @route '/v1/saved-listings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\SavedListingController::index
 * @see app/Http/Controllers/Api/SavedListingController.php:11
 * @route '/v1/saved-listings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\SavedListingController::index
 * @see app/Http/Controllers/Api/SavedListingController.php:11
 * @route '/v1/saved-listings'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\SavedListingController::index
 * @see app/Http/Controllers/Api/SavedListingController.php:11
 * @route '/v1/saved-listings'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\SavedListingController::index
 * @see app/Http/Controllers/Api/SavedListingController.php:11
 * @route '/v1/saved-listings'
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
* @see \App\Http\Controllers\Api\SavedListingController::store
 * @see app/Http/Controllers/Api/SavedListingController.php:21
 * @route '/v1/saved-listings'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/v1/saved-listings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SavedListingController::store
 * @see app/Http/Controllers/Api/SavedListingController.php:21
 * @route '/v1/saved-listings'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SavedListingController::store
 * @see app/Http/Controllers/Api/SavedListingController.php:21
 * @route '/v1/saved-listings'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\SavedListingController::store
 * @see app/Http/Controllers/Api/SavedListingController.php:21
 * @route '/v1/saved-listings'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\SavedListingController::store
 * @see app/Http/Controllers/Api/SavedListingController.php:21
 * @route '/v1/saved-listings'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\SavedListingController::destroy
 * @see app/Http/Controllers/Api/SavedListingController.php:48
 * @route '/v1/saved-listings/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/v1/saved-listings/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\SavedListingController::destroy
 * @see app/Http/Controllers/Api/SavedListingController.php:48
 * @route '/v1/saved-listings/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SavedListingController::destroy
 * @see app/Http/Controllers/Api/SavedListingController.php:48
 * @route '/v1/saved-listings/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\SavedListingController::destroy
 * @see app/Http/Controllers/Api/SavedListingController.php:48
 * @route '/v1/saved-listings/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\SavedListingController::destroy
 * @see app/Http/Controllers/Api/SavedListingController.php:48
 * @route '/v1/saved-listings/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const SavedListingController = { index, store, destroy }

export default SavedListingController