import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\OfferController::index
* @see app/Http/Controllers/Api/OfferController.php:16
* @route '/v1/offers'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/v1/offers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\OfferController::index
* @see app/Http/Controllers/Api/OfferController.php:16
* @route '/v1/offers'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\OfferController::index
* @see app/Http/Controllers/Api/OfferController.php:16
* @route '/v1/offers'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\OfferController::index
* @see app/Http/Controllers/Api/OfferController.php:16
* @route '/v1/offers'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\OfferController::index
* @see app/Http/Controllers/Api/OfferController.php:16
* @route '/v1/offers'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\OfferController::index
* @see app/Http/Controllers/Api/OfferController.php:16
* @route '/v1/offers'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\OfferController::index
* @see app/Http/Controllers/Api/OfferController.php:16
* @route '/v1/offers'
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
* @see \App\Http\Controllers\Api\OfferController::store
* @see app/Http/Controllers/Api/OfferController.php:27
* @route '/v1/offers'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/v1/offers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\OfferController::store
* @see app/Http/Controllers/Api/OfferController.php:27
* @route '/v1/offers'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\OfferController::store
* @see app/Http/Controllers/Api/OfferController.php:27
* @route '/v1/offers'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\OfferController::store
* @see app/Http/Controllers/Api/OfferController.php:27
* @route '/v1/offers'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\OfferController::store
* @see app/Http/Controllers/Api/OfferController.php:27
* @route '/v1/offers'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\OfferController::show
* @see app/Http/Controllers/Api/OfferController.php:54
* @route '/v1/offers/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/v1/offers/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\OfferController::show
* @see app/Http/Controllers/Api/OfferController.php:54
* @route '/v1/offers/{id}'
*/
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\OfferController::show
* @see app/Http/Controllers/Api/OfferController.php:54
* @route '/v1/offers/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\OfferController::show
* @see app/Http/Controllers/Api/OfferController.php:54
* @route '/v1/offers/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\OfferController::show
* @see app/Http/Controllers/Api/OfferController.php:54
* @route '/v1/offers/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\OfferController::show
* @see app/Http/Controllers/Api/OfferController.php:54
* @route '/v1/offers/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\OfferController::show
* @see app/Http/Controllers/Api/OfferController.php:54
* @route '/v1/offers/{id}'
*/
showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Api\OfferController::accept
* @see app/Http/Controllers/Api/OfferController.php:66
* @route '/v1/offers/{id}/accept'
*/
export const accept = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(args, options),
    method: 'post',
})

accept.definition = {
    methods: ["post"],
    url: '/v1/offers/{id}/accept',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\OfferController::accept
* @see app/Http/Controllers/Api/OfferController.php:66
* @route '/v1/offers/{id}/accept'
*/
accept.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return accept.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\OfferController::accept
* @see app/Http/Controllers/Api/OfferController.php:66
* @route '/v1/offers/{id}/accept'
*/
accept.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\OfferController::accept
* @see app/Http/Controllers/Api/OfferController.php:66
* @route '/v1/offers/{id}/accept'
*/
const acceptForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: accept.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\OfferController::accept
* @see app/Http/Controllers/Api/OfferController.php:66
* @route '/v1/offers/{id}/accept'
*/
acceptForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: accept.url(args, options),
    method: 'post',
})

accept.form = acceptForm

/**
* @see \App\Http\Controllers\Api\OfferController::reject
* @see app/Http/Controllers/Api/OfferController.php:107
* @route '/v1/offers/{id}/reject'
*/
export const reject = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/v1/offers/{id}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\OfferController::reject
* @see app/Http/Controllers/Api/OfferController.php:107
* @route '/v1/offers/{id}/reject'
*/
reject.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return reject.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\OfferController::reject
* @see app/Http/Controllers/Api/OfferController.php:107
* @route '/v1/offers/{id}/reject'
*/
reject.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\OfferController::reject
* @see app/Http/Controllers/Api/OfferController.php:107
* @route '/v1/offers/{id}/reject'
*/
const rejectForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\OfferController::reject
* @see app/Http/Controllers/Api/OfferController.php:107
* @route '/v1/offers/{id}/reject'
*/
rejectForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

reject.form = rejectForm

/**
* @see \App\Http\Controllers\Api\OfferController::counter
* @see app/Http/Controllers/Api/OfferController.php:120
* @route '/v1/offers/{id}/counter'
*/
export const counter = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: counter.url(args, options),
    method: 'post',
})

counter.definition = {
    methods: ["post"],
    url: '/v1/offers/{id}/counter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\OfferController::counter
* @see app/Http/Controllers/Api/OfferController.php:120
* @route '/v1/offers/{id}/counter'
*/
counter.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return counter.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\OfferController::counter
* @see app/Http/Controllers/Api/OfferController.php:120
* @route '/v1/offers/{id}/counter'
*/
counter.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: counter.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\OfferController::counter
* @see app/Http/Controllers/Api/OfferController.php:120
* @route '/v1/offers/{id}/counter'
*/
const counterForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: counter.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\OfferController::counter
* @see app/Http/Controllers/Api/OfferController.php:120
* @route '/v1/offers/{id}/counter'
*/
counterForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: counter.url(args, options),
    method: 'post',
})

counter.form = counterForm

const OfferController = { index, store, show, accept, reject, counter }

export default OfferController