import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Seller\BannerController::index
* @see app/Http/Controllers/Seller/BannerController.php:14
* @route '/seller/web'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/seller/web',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\BannerController::index
* @see app/Http/Controllers/Seller/BannerController.php:14
* @route '/seller/web'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\BannerController::index
* @see app/Http/Controllers/Seller/BannerController.php:14
* @route '/seller/web'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\BannerController::index
* @see app/Http/Controllers/Seller/BannerController.php:14
* @route '/seller/web'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Seller\BannerController::index
* @see app/Http/Controllers/Seller/BannerController.php:14
* @route '/seller/web'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\BannerController::index
* @see app/Http/Controllers/Seller/BannerController.php:14
* @route '/seller/web'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\BannerController::index
* @see app/Http/Controllers/Seller/BannerController.php:14
* @route '/seller/web'
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
* @see \App\Http\Controllers\Seller\BannerController::store
* @see app/Http/Controllers/Seller/BannerController.php:56
* @route '/seller/web'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/seller/web',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Seller\BannerController::store
* @see app/Http/Controllers/Seller/BannerController.php:56
* @route '/seller/web'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\BannerController::store
* @see app/Http/Controllers/Seller/BannerController.php:56
* @route '/seller/web'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\BannerController::store
* @see app/Http/Controllers/Seller/BannerController.php:56
* @route '/seller/web'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\BannerController::store
* @see app/Http/Controllers/Seller/BannerController.php:56
* @route '/seller/web'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Seller\BannerController::update
* @see app/Http/Controllers/Seller/BannerController.php:90
* @route '/seller/web/{banner}'
*/
export const update = (args: { banner: string | { id: string } } | [banner: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/seller/web/{banner}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Seller\BannerController::update
* @see app/Http/Controllers/Seller/BannerController.php:90
* @route '/seller/web/{banner}'
*/
update.url = (args: { banner: string | { id: string } } | [banner: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { banner: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { banner: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            banner: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        banner: typeof args.banner === 'object'
        ? args.banner.id
        : args.banner,
    }

    return update.definition.url
            .replace('{banner}', parsedArgs.banner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\BannerController::update
* @see app/Http/Controllers/Seller/BannerController.php:90
* @route '/seller/web/{banner}'
*/
update.put = (args: { banner: string | { id: string } } | [banner: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Seller\BannerController::update
* @see app/Http/Controllers/Seller/BannerController.php:90
* @route '/seller/web/{banner}'
*/
const updateForm = (args: { banner: string | { id: string } } | [banner: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\BannerController::update
* @see app/Http/Controllers/Seller/BannerController.php:90
* @route '/seller/web/{banner}'
*/
updateForm.put = (args: { banner: string | { id: string } } | [banner: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Seller\BannerController::destroy
* @see app/Http/Controllers/Seller/BannerController.php:126
* @route '/seller/web/{banner}'
*/
export const destroy = (args: { banner: string | { id: string } } | [banner: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/seller/web/{banner}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Seller\BannerController::destroy
* @see app/Http/Controllers/Seller/BannerController.php:126
* @route '/seller/web/{banner}'
*/
destroy.url = (args: { banner: string | { id: string } } | [banner: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { banner: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { banner: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            banner: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        banner: typeof args.banner === 'object'
        ? args.banner.id
        : args.banner,
    }

    return destroy.definition.url
            .replace('{banner}', parsedArgs.banner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\BannerController::destroy
* @see app/Http/Controllers/Seller/BannerController.php:126
* @route '/seller/web/{banner}'
*/
destroy.delete = (args: { banner: string | { id: string } } | [banner: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Seller\BannerController::destroy
* @see app/Http/Controllers/Seller/BannerController.php:126
* @route '/seller/web/{banner}'
*/
const destroyForm = (args: { banner: string | { id: string } } | [banner: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\BannerController::destroy
* @see app/Http/Controllers/Seller/BannerController.php:126
* @route '/seller/web/{banner}'
*/
destroyForm.delete = (args: { banner: string | { id: string } } | [banner: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const BannerController = { index, store, update, destroy }

export default BannerController