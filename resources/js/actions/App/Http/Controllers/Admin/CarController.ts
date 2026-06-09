import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CarController::index
* @see app/Http/Controllers/Admin/CarController.php:20
* @route '/admin/cars'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/cars',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CarController::index
* @see app/Http/Controllers/Admin/CarController.php:20
* @route '/admin/cars'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CarController::index
* @see app/Http/Controllers/Admin/CarController.php:20
* @route '/admin/cars'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CarController::index
* @see app/Http/Controllers/Admin/CarController.php:20
* @route '/admin/cars'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CarController::index
* @see app/Http/Controllers/Admin/CarController.php:20
* @route '/admin/cars'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CarController::index
* @see app/Http/Controllers/Admin/CarController.php:20
* @route '/admin/cars'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CarController::index
* @see app/Http/Controllers/Admin/CarController.php:20
* @route '/admin/cars'
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
* @see \App\Http\Controllers\Admin\CarController::show
* @see app/Http/Controllers/Admin/CarController.php:86
* @route '/admin/cars/{car}'
*/
export const show = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/cars/{car}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CarController::show
* @see app/Http/Controllers/Admin/CarController.php:86
* @route '/admin/cars/{car}'
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
* @see \App\Http\Controllers\Admin\CarController::show
* @see app/Http/Controllers/Admin/CarController.php:86
* @route '/admin/cars/{car}'
*/
show.get = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CarController::show
* @see app/Http/Controllers/Admin/CarController.php:86
* @route '/admin/cars/{car}'
*/
show.head = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CarController::show
* @see app/Http/Controllers/Admin/CarController.php:86
* @route '/admin/cars/{car}'
*/
const showForm = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CarController::show
* @see app/Http/Controllers/Admin/CarController.php:86
* @route '/admin/cars/{car}'
*/
showForm.get = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CarController::show
* @see app/Http/Controllers/Admin/CarController.php:86
* @route '/admin/cars/{car}'
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
* @see \App\Http\Controllers\Admin\CarController::edit
* @see app/Http/Controllers/Admin/CarController.php:109
* @route '/admin/cars/{car}/edit'
*/
export const edit = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/cars/{car}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CarController::edit
* @see app/Http/Controllers/Admin/CarController.php:109
* @route '/admin/cars/{car}/edit'
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
* @see \App\Http\Controllers\Admin\CarController::edit
* @see app/Http/Controllers/Admin/CarController.php:109
* @route '/admin/cars/{car}/edit'
*/
edit.get = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CarController::edit
* @see app/Http/Controllers/Admin/CarController.php:109
* @route '/admin/cars/{car}/edit'
*/
edit.head = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CarController::edit
* @see app/Http/Controllers/Admin/CarController.php:109
* @route '/admin/cars/{car}/edit'
*/
const editForm = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CarController::edit
* @see app/Http/Controllers/Admin/CarController.php:109
* @route '/admin/cars/{car}/edit'
*/
editForm.get = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CarController::edit
* @see app/Http/Controllers/Admin/CarController.php:109
* @route '/admin/cars/{car}/edit'
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
* @see \App\Http\Controllers\Admin\CarController::update
* @see app/Http/Controllers/Admin/CarController.php:137
* @route '/admin/cars/{car}'
*/
export const update = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/cars/{car}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\CarController::update
* @see app/Http/Controllers/Admin/CarController.php:137
* @route '/admin/cars/{car}'
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
* @see \App\Http\Controllers\Admin\CarController::update
* @see app/Http/Controllers/Admin/CarController.php:137
* @route '/admin/cars/{car}'
*/
update.put = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\CarController::update
* @see app/Http/Controllers/Admin/CarController.php:137
* @route '/admin/cars/{car}'
*/
update.patch = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\CarController::update
* @see app/Http/Controllers/Admin/CarController.php:137
* @route '/admin/cars/{car}'
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
* @see \App\Http\Controllers\Admin\CarController::update
* @see app/Http/Controllers/Admin/CarController.php:137
* @route '/admin/cars/{car}'
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
* @see \App\Http\Controllers\Admin\CarController::update
* @see app/Http/Controllers/Admin/CarController.php:137
* @route '/admin/cars/{car}'
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
* @see \App\Http\Controllers\Admin\CarController::destroy
* @see app/Http/Controllers/Admin/CarController.php:238
* @route '/admin/cars/{car}'
*/
export const destroy = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/cars/{car}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CarController::destroy
* @see app/Http/Controllers/Admin/CarController.php:238
* @route '/admin/cars/{car}'
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
* @see \App\Http\Controllers\Admin\CarController::destroy
* @see app/Http/Controllers/Admin/CarController.php:238
* @route '/admin/cars/{car}'
*/
destroy.delete = (args: { car: string | { id: string } } | [car: string | { id: string } ] | string | { id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\CarController::destroy
* @see app/Http/Controllers/Admin/CarController.php:238
* @route '/admin/cars/{car}'
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
* @see \App\Http\Controllers\Admin\CarController::destroy
* @see app/Http/Controllers/Admin/CarController.php:238
* @route '/admin/cars/{car}'
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

const CarController = { index, show, edit, update, destroy }

export default CarController