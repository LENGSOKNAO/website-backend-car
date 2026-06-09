import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\BannerController::hero
* @see app/Http/Controllers/Api/BannerController.php:138
* @route '/v1/web/hero'
*/
export const hero = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: hero.url(options),
    method: 'get',
})

hero.definition = {
    methods: ["get","head"],
    url: '/v1/web/hero',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\BannerController::hero
* @see app/Http/Controllers/Api/BannerController.php:138
* @route '/v1/web/hero'
*/
hero.url = (options?: RouteQueryOptions) => {




    return hero.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\BannerController::hero
* @see app/Http/Controllers/Api/BannerController.php:138
* @route '/v1/web/hero'
*/
hero.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: hero.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\BannerController::hero
* @see app/Http/Controllers/Api/BannerController.php:138
* @route '/v1/web/hero'
*/
hero.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: hero.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\BannerController::hero
* @see app/Http/Controllers/Api/BannerController.php:138
* @route '/v1/web/hero'
*/
const heroForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: hero.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\BannerController::hero
* @see app/Http/Controllers/Api/BannerController.php:138
* @route '/v1/web/hero'
*/
heroForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: hero.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\BannerController::hero
* @see app/Http/Controllers/Api/BannerController.php:138
* @route '/v1/web/hero'
*/
heroForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: hero.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

hero.form = heroForm

/**
* @see \App\Http\Controllers\Api\BannerController::brand
* @see app/Http/Controllers/Api/BannerController.php:114
* @route '/v1/web/brand/{slug}'
*/
export const brand = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brand.url(args, options),
    method: 'get',
})

brand.definition = {
    methods: ["get","head"],
    url: '/v1/web/brand/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\BannerController::brand
* @see app/Http/Controllers/Api/BannerController.php:114
* @route '/v1/web/brand/{slug}'
*/
brand.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }


    if (Array.isArray(args)) {
        args = {
            slug: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        slug: args.slug,
    }

    return brand.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\BannerController::brand
* @see app/Http/Controllers/Api/BannerController.php:114
* @route '/v1/web/brand/{slug}'
*/
brand.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: brand.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\BannerController::brand
* @see app/Http/Controllers/Api/BannerController.php:114
* @route '/v1/web/brand/{slug}'
*/
brand.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: brand.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\BannerController::brand
* @see app/Http/Controllers/Api/BannerController.php:114
* @route '/v1/web/brand/{slug}'
*/
const brandForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: brand.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\BannerController::brand
* @see app/Http/Controllers/Api/BannerController.php:114
* @route '/v1/web/brand/{slug}'
*/
brandForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: brand.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\BannerController::brand
* @see app/Http/Controllers/Api/BannerController.php:114
* @route '/v1/web/brand/{slug}'
*/
brandForm.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: brand.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

brand.form = brandForm

/**
* @see \App\Http\Controllers\Api\BannerController::index
* @see app/Http/Controllers/Api/BannerController.php:12
* @route '/v1/web'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/v1/web',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\BannerController::index
* @see app/Http/Controllers/Api/BannerController.php:12
* @route '/v1/web'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\BannerController::index
* @see app/Http/Controllers/Api/BannerController.php:12
* @route '/v1/web'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\BannerController::index
* @see app/Http/Controllers/Api/BannerController.php:12
* @route '/v1/web'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\BannerController::index
* @see app/Http/Controllers/Api/BannerController.php:12
* @route '/v1/web'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\BannerController::index
* @see app/Http/Controllers/Api/BannerController.php:12
* @route '/v1/web'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\BannerController::index
* @see app/Http/Controllers/Api/BannerController.php:12
* @route '/v1/web'
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
* @see \App\Http\Controllers\Api\BannerController::show
* @see app/Http/Controllers/Api/BannerController.php:37
* @route '/v1/web/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/v1/web/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\BannerController::show
* @see app/Http/Controllers/Api/BannerController.php:37
* @route '/v1/web/{id}'
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
* @see \App\Http\Controllers\Api\BannerController::show
* @see app/Http/Controllers/Api/BannerController.php:37
* @route '/v1/web/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\BannerController::show
* @see app/Http/Controllers/Api/BannerController.php:37
* @route '/v1/web/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\BannerController::show
* @see app/Http/Controllers/Api/BannerController.php:37
* @route '/v1/web/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\BannerController::show
* @see app/Http/Controllers/Api/BannerController.php:37
* @route '/v1/web/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\BannerController::show
* @see app/Http/Controllers/Api/BannerController.php:37
* @route '/v1/web/{id}'
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
* @see \App\Http\Controllers\Api\BannerController::store
* @see app/Http/Controllers/Api/BannerController.php:44
* @route '/v1/web'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/v1/web',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\BannerController::store
* @see app/Http/Controllers/Api/BannerController.php:44
* @route '/v1/web'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\BannerController::store
* @see app/Http/Controllers/Api/BannerController.php:44
* @route '/v1/web'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\BannerController::store
* @see app/Http/Controllers/Api/BannerController.php:44
* @route '/v1/web'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\BannerController::store
* @see app/Http/Controllers/Api/BannerController.php:44
* @route '/v1/web'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\BannerController::update
* @see app/Http/Controllers/Api/BannerController.php:76
* @route '/v1/web/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/v1/web/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\BannerController::update
* @see app/Http/Controllers/Api/BannerController.php:76
* @route '/v1/web/{id}'
*/
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\BannerController::update
* @see app/Http/Controllers/Api/BannerController.php:76
* @route '/v1/web/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\BannerController::update
* @see app/Http/Controllers/Api/BannerController.php:76
* @route '/v1/web/{id}'
*/
const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\BannerController::update
* @see app/Http/Controllers/Api/BannerController.php:76
* @route '/v1/web/{id}'
*/
updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\BannerController::destroy
* @see app/Http/Controllers/Api/BannerController.php:106
* @route '/v1/web/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/v1/web/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\BannerController::destroy
* @see app/Http/Controllers/Api/BannerController.php:106
* @route '/v1/web/{id}'
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
* @see \App\Http\Controllers\Api\BannerController::destroy
* @see app/Http/Controllers/Api/BannerController.php:106
* @route '/v1/web/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\BannerController::destroy
* @see app/Http/Controllers/Api/BannerController.php:106
* @route '/v1/web/{id}'
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
* @see \App\Http\Controllers\Api\BannerController::destroy
* @see app/Http/Controllers/Api/BannerController.php:106
* @route '/v1/web/{id}'
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

const BannerController = { hero, brand, index, show, store, update, destroy }

export default BannerController