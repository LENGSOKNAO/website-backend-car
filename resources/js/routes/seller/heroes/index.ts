import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Seller\HeroController::index
* @see app/Http/Controllers/Seller/HeroController.php:13
* @route '/seller/heroes'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/seller/heroes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\HeroController::index
* @see app/Http/Controllers/Seller/HeroController.php:13
* @route '/seller/heroes'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\HeroController::index
* @see app/Http/Controllers/Seller/HeroController.php:13
* @route '/seller/heroes'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\HeroController::index
* @see app/Http/Controllers/Seller/HeroController.php:13
* @route '/seller/heroes'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Seller\HeroController::index
* @see app/Http/Controllers/Seller/HeroController.php:13
* @route '/seller/heroes'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\HeroController::index
* @see app/Http/Controllers/Seller/HeroController.php:13
* @route '/seller/heroes'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\HeroController::index
* @see app/Http/Controllers/Seller/HeroController.php:13
* @route '/seller/heroes'
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
* @see \App\Http\Controllers\Seller\HeroController::store
* @see app/Http/Controllers/Seller/HeroController.php:32
* @route '/seller/heroes'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/seller/heroes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Seller\HeroController::store
* @see app/Http/Controllers/Seller/HeroController.php:32
* @route '/seller/heroes'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\HeroController::store
* @see app/Http/Controllers/Seller/HeroController.php:32
* @route '/seller/heroes'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\HeroController::store
* @see app/Http/Controllers/Seller/HeroController.php:32
* @route '/seller/heroes'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\HeroController::store
* @see app/Http/Controllers/Seller/HeroController.php:32
* @route '/seller/heroes'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Seller\HeroController::update
* @see app/Http/Controllers/Seller/HeroController.php:49
* @route '/seller/heroes/{hero}'
*/
export const update = (args: { hero: number | { id: number } } | [hero: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/seller/heroes/{hero}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Seller\HeroController::update
* @see app/Http/Controllers/Seller/HeroController.php:49
* @route '/seller/heroes/{hero}'
*/
update.url = (args: { hero: number | { id: number } } | [hero: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hero: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { hero: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            hero: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        hero: typeof args.hero === 'object'
        ? args.hero.id
        : args.hero,
    }

    return update.definition.url
            .replace('{hero}', parsedArgs.hero.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\HeroController::update
* @see app/Http/Controllers/Seller/HeroController.php:49
* @route '/seller/heroes/{hero}'
*/
update.put = (args: { hero: number | { id: number } } | [hero: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Seller\HeroController::update
* @see app/Http/Controllers/Seller/HeroController.php:49
* @route '/seller/heroes/{hero}'
*/
const updateForm = (args: { hero: number | { id: number } } | [hero: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\HeroController::update
* @see app/Http/Controllers/Seller/HeroController.php:49
* @route '/seller/heroes/{hero}'
*/
updateForm.put = (args: { hero: number | { id: number } } | [hero: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Seller\HeroController::destroy
* @see app/Http/Controllers/Seller/HeroController.php:70
* @route '/seller/heroes/{hero}'
*/
export const destroy = (args: { hero: number | { id: number } } | [hero: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/seller/heroes/{hero}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Seller\HeroController::destroy
* @see app/Http/Controllers/Seller/HeroController.php:70
* @route '/seller/heroes/{hero}'
*/
destroy.url = (args: { hero: number | { id: number } } | [hero: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hero: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { hero: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            hero: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        hero: typeof args.hero === 'object'
        ? args.hero.id
        : args.hero,
    }

    return destroy.definition.url
            .replace('{hero}', parsedArgs.hero.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\HeroController::destroy
* @see app/Http/Controllers/Seller/HeroController.php:70
* @route '/seller/heroes/{hero}'
*/
destroy.delete = (args: { hero: number | { id: number } } | [hero: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Seller\HeroController::destroy
* @see app/Http/Controllers/Seller/HeroController.php:70
* @route '/seller/heroes/{hero}'
*/
const destroyForm = (args: { hero: number | { id: number } } | [hero: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\HeroController::destroy
* @see app/Http/Controllers/Seller/HeroController.php:70
* @route '/seller/heroes/{hero}'
*/
destroyForm.delete = (args: { hero: number | { id: number } } | [hero: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm



const heroes = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default heroes