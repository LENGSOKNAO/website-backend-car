import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Seller\DashboardController::apiIndex
 * @see app/Http/Controllers/Seller/DashboardController.php:82
 * @route '/v1/seller/dashboard'
 */
export const apiIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiIndex.url(options),
    method: 'get',
})

apiIndex.definition = {
    methods: ["get","head"],
    url: '/v1/seller/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\DashboardController::apiIndex
 * @see app/Http/Controllers/Seller/DashboardController.php:82
 * @route '/v1/seller/dashboard'
 */
apiIndex.url = (options?: RouteQueryOptions) => {
    return apiIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\DashboardController::apiIndex
 * @see app/Http/Controllers/Seller/DashboardController.php:82
 * @route '/v1/seller/dashboard'
 */
apiIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apiIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Seller\DashboardController::apiIndex
 * @see app/Http/Controllers/Seller/DashboardController.php:82
 * @route '/v1/seller/dashboard'
 */
apiIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: apiIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Seller\DashboardController::apiIndex
 * @see app/Http/Controllers/Seller/DashboardController.php:82
 * @route '/v1/seller/dashboard'
 */
    const apiIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: apiIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Seller\DashboardController::apiIndex
 * @see app/Http/Controllers/Seller/DashboardController.php:82
 * @route '/v1/seller/dashboard'
 */
        apiIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: apiIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Seller\DashboardController::apiIndex
 * @see app/Http/Controllers/Seller/DashboardController.php:82
 * @route '/v1/seller/dashboard'
 */
        apiIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: apiIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    apiIndex.form = apiIndexForm
/**
* @see \App\Http\Controllers\Seller\DashboardController::index
 * @see app/Http/Controllers/Seller/DashboardController.php:16
 * @route '/seller/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/seller/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\DashboardController::index
 * @see app/Http/Controllers/Seller/DashboardController.php:16
 * @route '/seller/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\DashboardController::index
 * @see app/Http/Controllers/Seller/DashboardController.php:16
 * @route '/seller/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Seller\DashboardController::index
 * @see app/Http/Controllers/Seller/DashboardController.php:16
 * @route '/seller/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Seller\DashboardController::index
 * @see app/Http/Controllers/Seller/DashboardController.php:16
 * @route '/seller/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Seller\DashboardController::index
 * @see app/Http/Controllers/Seller/DashboardController.php:16
 * @route '/seller/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Seller\DashboardController::index
 * @see app/Http/Controllers/Seller/DashboardController.php:16
 * @route '/seller/dashboard'
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
const DashboardController = { apiIndex, index }

export default DashboardController