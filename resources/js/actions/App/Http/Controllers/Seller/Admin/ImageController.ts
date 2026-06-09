import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Seller\Admin\ImageController::store
* @see app/Http/Controllers/Seller/Admin/ImageController.php:12
* @route '/v1/seller/settings/{type}'
*/
export const store = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/v1/seller/settings/{type}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Seller\Admin\ImageController::store
* @see app/Http/Controllers/Seller/Admin/ImageController.php:12
* @route '/v1/seller/settings/{type}'
*/
store.url = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { type: args }
    }


    if (Array.isArray(args)) {
        args = {
            type: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        type: args.type,
    }

    return store.definition.url
            .replace('{type}', parsedArgs.type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\Admin\ImageController::store
* @see app/Http/Controllers/Seller/Admin/ImageController.php:12
* @route '/v1/seller/settings/{type}'
*/
store.post = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\Admin\ImageController::store
* @see app/Http/Controllers/Seller/Admin/ImageController.php:12
* @route '/v1/seller/settings/{type}'
*/
const storeForm = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\Admin\ImageController::store
* @see app/Http/Controllers/Seller/Admin/ImageController.php:12
* @route '/v1/seller/settings/{type}'
*/
storeForm.post = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Seller\Admin\ImageController::getSettings
* @see app/Http/Controllers/Seller/Admin/ImageController.php:39
* @route '/v1/seller/settings'
*/
export const getSettings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSettings.url(options),
    method: 'get',
})

getSettings.definition = {
    methods: ["get","head"],
    url: '/v1/seller/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\Admin\ImageController::getSettings
* @see app/Http/Controllers/Seller/Admin/ImageController.php:39
* @route '/v1/seller/settings'
*/
getSettings.url = (options?: RouteQueryOptions) => {




    return getSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\Admin\ImageController::getSettings
* @see app/Http/Controllers/Seller/Admin/ImageController.php:39
* @route '/v1/seller/settings'
*/
getSettings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSettings.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\Admin\ImageController::getSettings
* @see app/Http/Controllers/Seller/Admin/ImageController.php:39
* @route '/v1/seller/settings'
*/
getSettings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSettings.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Seller\Admin\ImageController::getSettings
* @see app/Http/Controllers/Seller/Admin/ImageController.php:39
* @route '/v1/seller/settings'
*/
const getSettingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getSettings.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\Admin\ImageController::getSettings
* @see app/Http/Controllers/Seller/Admin/ImageController.php:39
* @route '/v1/seller/settings'
*/
getSettingsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getSettings.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\Admin\ImageController::getSettings
* @see app/Http/Controllers/Seller/Admin/ImageController.php:39
* @route '/v1/seller/settings'
*/
getSettingsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getSettings.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getSettings.form = getSettingsForm

const ImageController = { store, getSettings }

export default ImageController