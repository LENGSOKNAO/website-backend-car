import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import cars from './cars'
import orders from './orders'
import inquiries from './inquiries'
import preOrders from './pre-orders'
import reviews from './reviews'
import profile from './profile'
import web from './web'
import heroes from './heroes'
/**
* @see \App\Http\Controllers\Seller\DashboardController::dashboard
* @see app/Http/Controllers/Seller/DashboardController.php:17
* @route '/seller/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/seller/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\DashboardController::dashboard
* @see app/Http/Controllers/Seller/DashboardController.php:17
* @route '/seller/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {




    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\DashboardController::dashboard
* @see app/Http/Controllers/Seller/DashboardController.php:17
* @route '/seller/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\DashboardController::dashboard
* @see app/Http/Controllers/Seller/DashboardController.php:17
* @route '/seller/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Seller\DashboardController::dashboard
* @see app/Http/Controllers/Seller/DashboardController.php:17
* @route '/seller/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\DashboardController::dashboard
* @see app/Http/Controllers/Seller/DashboardController.php:17
* @route '/seller/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\DashboardController::dashboard
* @see app/Http/Controllers/Seller/DashboardController.php:17
* @route '/seller/dashboard'
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



const seller = {
    dashboard: Object.assign(dashboard, dashboard),
    cars: Object.assign(cars, cars),
    orders: Object.assign(orders, orders),
    inquiries: Object.assign(inquiries, inquiries),
    preOrders: Object.assign(preOrders, preOrders),
    reviews: Object.assign(reviews, reviews),
    profile: Object.assign(profile, profile),
    web: Object.assign(web, web),
    heroes: Object.assign(heroes, heroes),
}

export default seller