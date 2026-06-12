import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import orders from './orders'
import inquiries from './inquiries'
import savedListings from './saved-listings'
import preOrders from './pre-orders'
/**
* @see \App\Http\Controllers\Buyer\DashboardController::dashboard
 * @see app/Http/Controllers/Buyer/DashboardController.php:14
 * @route '/buyer/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/buyer/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Buyer\DashboardController::dashboard
 * @see app/Http/Controllers/Buyer/DashboardController.php:14
 * @route '/buyer/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Buyer\DashboardController::dashboard
 * @see app/Http/Controllers/Buyer/DashboardController.php:14
 * @route '/buyer/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Buyer\DashboardController::dashboard
 * @see app/Http/Controllers/Buyer/DashboardController.php:14
 * @route '/buyer/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Buyer\DashboardController::dashboard
 * @see app/Http/Controllers/Buyer/DashboardController.php:14
 * @route '/buyer/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Buyer\DashboardController::dashboard
 * @see app/Http/Controllers/Buyer/DashboardController.php:14
 * @route '/buyer/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Buyer\DashboardController::dashboard
 * @see app/Http/Controllers/Buyer/DashboardController.php:14
 * @route '/buyer/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
const buyer = {
    dashboard: Object.assign(dashboard, dashboard),
orders: Object.assign(orders, orders),
inquiries: Object.assign(inquiries, inquiries),
savedListings: Object.assign(savedListings, savedListings),
preOrders: Object.assign(preOrders, preOrders),
}

export default buyer