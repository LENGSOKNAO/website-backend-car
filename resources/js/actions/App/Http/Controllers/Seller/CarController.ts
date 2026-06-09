import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Seller\CarController::index
* @see app/Http/Controllers/Seller/CarController.php:19
* @route '/seller/cars'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/seller/cars',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\CarController::index
* @see app/Http/Controllers/Seller/CarController.php:19
* @route '/seller/cars'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\CarController::index
* @see app/Http/Controllers/Seller/CarController.php:19
* @route '/seller/cars'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\CarController::index
* @see app/Http/Controllers/Seller/CarController.php:19
* @route '/seller/cars'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Seller\CarController::index
* @see app/Http/Controllers/Seller/CarController.php:19
* @route '/seller/cars'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\CarController::index
* @see app/Http/Controllers/Seller/CarController.php:19
* @route '/seller/cars'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\CarController::index
* @see app/Http/Controllers/Seller/CarController.php:19
* @route '/seller/cars'
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
* @see \App\Http\Controllers\Seller\CarController::create
* @see app/Http/Controllers/Seller/CarController.php:85
* @route '/seller/cars/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/seller/cars/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\CarController::create
* @see app/Http/Controllers/Seller/CarController.php:85
* @route '/seller/cars/create'
*/
create.url = (options?: RouteQueryOptions) => {




    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\CarController::create
* @see app/Http/Controllers/Seller/CarController.php:85
* @route '/seller/cars/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\CarController::create
* @see app/Http/Controllers/Seller/CarController.php:85
* @route '/seller/cars/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Seller\CarController::create
* @see app/Http/Controllers/Seller/CarController.php:85
* @route '/seller/cars/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\CarController::create
* @see app/Http/Controllers/Seller/CarController.php:85
* @route '/seller/cars/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\CarController::create
* @see app/Http/Controllers/Seller/CarController.php:85
* @route '/seller/cars/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\Seller\CarController::store
* @see app/Http/Controllers/Seller/CarController.php:102
* @route '/seller/cars'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/seller/cars',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Seller\CarController::store
* @see app/Http/Controllers/Seller/CarController.php:102
* @route '/seller/cars'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\CarController::store
* @see app/Http/Controllers/Seller/CarController.php:102
* @route '/seller/cars'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\CarController::store
* @see app/Http/Controllers/Seller/CarController.php:102
* @route '/seller/cars'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\CarController::store
* @see app/Http/Controllers/Seller/CarController.php:102
* @route '/seller/cars'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Seller\CarController::show
* @see app/Http/Controllers/Seller/CarController.php:58
* @route '/seller/cars/{car}'
*/
export const show = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/seller/cars/{car}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\CarController::show
* @see app/Http/Controllers/Seller/CarController.php:58
* @route '/seller/cars/{car}'
*/
show.url = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { car: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { car: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            car: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        car: typeof args.car === 'object'
        ? args.car.id
        : args.car,
    }

    return show.definition.url
            .replace('{car}', parsedArgs.car.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\CarController::show
* @see app/Http/Controllers/Seller/CarController.php:58
* @route '/seller/cars/{car}'
*/
show.get = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\CarController::show
* @see app/Http/Controllers/Seller/CarController.php:58
* @route '/seller/cars/{car}'
*/
show.head = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Seller\CarController::show
* @see app/Http/Controllers/Seller/CarController.php:58
* @route '/seller/cars/{car}'
*/
const showForm = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\CarController::show
* @see app/Http/Controllers/Seller/CarController.php:58
* @route '/seller/cars/{car}'
*/
showForm.get = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\CarController::show
* @see app/Http/Controllers/Seller/CarController.php:58
* @route '/seller/cars/{car}'
*/
showForm.head = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Seller\CarController::edit
* @see app/Http/Controllers/Seller/CarController.php:157
* @route '/seller/cars/{car}/edit'
*/
export const edit = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/seller/cars/{car}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\CarController::edit
* @see app/Http/Controllers/Seller/CarController.php:157
* @route '/seller/cars/{car}/edit'
*/
edit.url = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { car: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { car: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            car: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        car: typeof args.car === 'object'
        ? args.car.id
        : args.car,
    }

    return edit.definition.url
            .replace('{car}', parsedArgs.car.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\CarController::edit
* @see app/Http/Controllers/Seller/CarController.php:157
* @route '/seller/cars/{car}/edit'
*/
edit.get = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\CarController::edit
* @see app/Http/Controllers/Seller/CarController.php:157
* @route '/seller/cars/{car}/edit'
*/
edit.head = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Seller\CarController::edit
* @see app/Http/Controllers/Seller/CarController.php:157
* @route '/seller/cars/{car}/edit'
*/
const editForm = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\CarController::edit
* @see app/Http/Controllers/Seller/CarController.php:157
* @route '/seller/cars/{car}/edit'
*/
editForm.get = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\CarController::edit
* @see app/Http/Controllers/Seller/CarController.php:157
* @route '/seller/cars/{car}/edit'
*/
editForm.head = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Seller\CarController::update
* @see app/Http/Controllers/Seller/CarController.php:189
* @route '/seller/cars/{car}'
*/
export const update = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/seller/cars/{car}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Seller\CarController::update
* @see app/Http/Controllers/Seller/CarController.php:189
* @route '/seller/cars/{car}'
*/
update.url = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { car: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { car: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            car: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        car: typeof args.car === 'object'
        ? args.car.id
        : args.car,
    }

    return update.definition.url
            .replace('{car}', parsedArgs.car.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\CarController::update
* @see app/Http/Controllers/Seller/CarController.php:189
* @route '/seller/cars/{car}'
*/
update.put = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Seller\CarController::update
* @see app/Http/Controllers/Seller/CarController.php:189
* @route '/seller/cars/{car}'
*/
update.patch = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Seller\CarController::update
* @see app/Http/Controllers/Seller/CarController.php:189
* @route '/seller/cars/{car}'
*/
const updateForm = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\CarController::update
* @see app/Http/Controllers/Seller/CarController.php:189
* @route '/seller/cars/{car}'
*/
updateForm.put = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\CarController::update
* @see app/Http/Controllers/Seller/CarController.php:189
* @route '/seller/cars/{car}'
*/
updateForm.patch = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Seller\CarController::destroy
* @see app/Http/Controllers/Seller/CarController.php:296
* @route '/seller/cars/{car}'
*/
export const destroy = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/seller/cars/{car}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Seller\CarController::destroy
* @see app/Http/Controllers/Seller/CarController.php:296
* @route '/seller/cars/{car}'
*/
destroy.url = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { car: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { car: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            car: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        car: typeof args.car === 'object'
        ? args.car.id
        : args.car,
    }

    return destroy.definition.url
            .replace('{car}', parsedArgs.car.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\CarController::destroy
* @see app/Http/Controllers/Seller/CarController.php:296
* @route '/seller/cars/{car}'
*/
destroy.delete = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Seller\CarController::destroy
* @see app/Http/Controllers/Seller/CarController.php:296
* @route '/seller/cars/{car}'
*/
const destroyForm = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\CarController::destroy
* @see app/Http/Controllers/Seller/CarController.php:296
* @route '/seller/cars/{car}'
*/
destroyForm.delete = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const CarController = { index, create, store, show, edit, update, destroy }

export default CarController