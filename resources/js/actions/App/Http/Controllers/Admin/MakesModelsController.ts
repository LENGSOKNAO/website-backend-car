import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\MakesModelsController::index
* @see app/Http/Controllers/Admin/MakesModelsController.php:13
* @route '/admin/makes-models'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/makes-models',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MakesModelsController::index
* @see app/Http/Controllers/Admin/MakesModelsController.php:13
* @route '/admin/makes-models'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MakesModelsController::index
* @see app/Http/Controllers/Admin/MakesModelsController.php:13
* @route '/admin/makes-models'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MakesModelsController::index
* @see app/Http/Controllers/Admin/MakesModelsController.php:13
* @route '/admin/makes-models'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MakesModelsController::index
* @see app/Http/Controllers/Admin/MakesModelsController.php:13
* @route '/admin/makes-models'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MakesModelsController::index
* @see app/Http/Controllers/Admin/MakesModelsController.php:13
* @route '/admin/makes-models'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MakesModelsController::index
* @see app/Http/Controllers/Admin/MakesModelsController.php:13
* @route '/admin/makes-models'
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

const MakesModelsController = { index }

export default MakesModelsController