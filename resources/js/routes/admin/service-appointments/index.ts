import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::index
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:12
* @route '/admin/service-appointments'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/service-appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::index
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:12
* @route '/admin/service-appointments'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::index
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:12
* @route '/admin/service-appointments'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::index
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:12
* @route '/admin/service-appointments'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::index
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:12
* @route '/admin/service-appointments'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::index
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:12
* @route '/admin/service-appointments'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::index
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:12
* @route '/admin/service-appointments'
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
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::show
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:23
* @route '/admin/service-appointments/{service_appointment}'
*/
export const show = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/service-appointments/{service_appointment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::show
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:23
* @route '/admin/service-appointments/{service_appointment}'
*/
show.url = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service_appointment: args }
    }


    if (Array.isArray(args)) {
        args = {
            service_appointment: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        service_appointment: args.service_appointment,
    }

    return show.definition.url
            .replace('{service_appointment}', parsedArgs.service_appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::show
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:23
* @route '/admin/service-appointments/{service_appointment}'
*/
show.get = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::show
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:23
* @route '/admin/service-appointments/{service_appointment}'
*/
show.head = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::show
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:23
* @route '/admin/service-appointments/{service_appointment}'
*/
const showForm = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::show
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:23
* @route '/admin/service-appointments/{service_appointment}'
*/
showForm.get = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::show
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:23
* @route '/admin/service-appointments/{service_appointment}'
*/
showForm.head = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::edit
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:0
* @route '/admin/service-appointments/{service_appointment}/edit'
*/
export const edit = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/service-appointments/{service_appointment}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::edit
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:0
* @route '/admin/service-appointments/{service_appointment}/edit'
*/
edit.url = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service_appointment: args }
    }


    if (Array.isArray(args)) {
        args = {
            service_appointment: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        service_appointment: args.service_appointment,
    }

    return edit.definition.url
            .replace('{service_appointment}', parsedArgs.service_appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::edit
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:0
* @route '/admin/service-appointments/{service_appointment}/edit'
*/
edit.get = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::edit
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:0
* @route '/admin/service-appointments/{service_appointment}/edit'
*/
edit.head = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::edit
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:0
* @route '/admin/service-appointments/{service_appointment}/edit'
*/
const editForm = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::edit
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:0
* @route '/admin/service-appointments/{service_appointment}/edit'
*/
editForm.get = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::edit
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:0
* @route '/admin/service-appointments/{service_appointment}/edit'
*/
editForm.head = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::update
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:34
* @route '/admin/service-appointments/{service_appointment}'
*/
export const update = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/service-appointments/{service_appointment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::update
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:34
* @route '/admin/service-appointments/{service_appointment}'
*/
update.url = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service_appointment: args }
    }


    if (Array.isArray(args)) {
        args = {
            service_appointment: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        service_appointment: args.service_appointment,
    }

    return update.definition.url
            .replace('{service_appointment}', parsedArgs.service_appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::update
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:34
* @route '/admin/service-appointments/{service_appointment}'
*/
update.put = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::update
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:34
* @route '/admin/service-appointments/{service_appointment}'
*/
update.patch = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::update
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:34
* @route '/admin/service-appointments/{service_appointment}'
*/
const updateForm = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::update
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:34
* @route '/admin/service-appointments/{service_appointment}'
*/
updateForm.put = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::update
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:34
* @route '/admin/service-appointments/{service_appointment}'
*/
updateForm.patch = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::destroy
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:52
* @route '/admin/service-appointments/{service_appointment}'
*/
export const destroy = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/service-appointments/{service_appointment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::destroy
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:52
* @route '/admin/service-appointments/{service_appointment}'
*/
destroy.url = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { service_appointment: args }
    }


    if (Array.isArray(args)) {
        args = {
            service_appointment: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        service_appointment: args.service_appointment,
    }

    return destroy.definition.url
            .replace('{service_appointment}', parsedArgs.service_appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::destroy
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:52
* @route '/admin/service-appointments/{service_appointment}'
*/
destroy.delete = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::destroy
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:52
* @route '/admin/service-appointments/{service_appointment}'
*/
const destroyForm = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ServiceAppointmentController::destroy
* @see app/Http/Controllers/Admin/ServiceAppointmentController.php:52
* @route '/admin/service-appointments/{service_appointment}'
*/
destroyForm.delete = (args: { service_appointment: string | number } | [service_appointment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm



const serviceAppointments = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default serviceAppointments