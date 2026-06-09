import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Seller\ProfileController::index
* @see app/Http/Controllers/Seller/ProfileController.php:13
* @route '/seller/profile'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/seller/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Seller\ProfileController::index
* @see app/Http/Controllers/Seller/ProfileController.php:13
* @route '/seller/profile'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\ProfileController::index
* @see app/Http/Controllers/Seller/ProfileController.php:13
* @route '/seller/profile'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\ProfileController::index
* @see app/Http/Controllers/Seller/ProfileController.php:13
* @route '/seller/profile'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Seller\ProfileController::index
* @see app/Http/Controllers/Seller/ProfileController.php:13
* @route '/seller/profile'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\ProfileController::index
* @see app/Http/Controllers/Seller/ProfileController.php:13
* @route '/seller/profile'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Seller\ProfileController::index
* @see app/Http/Controllers/Seller/ProfileController.php:13
* @route '/seller/profile'
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
* @see \App\Http\Controllers\Seller\ProfileController::update
* @see app/Http/Controllers/Seller/ProfileController.php:23
* @route '/seller/profile'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/seller/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Seller\ProfileController::update
* @see app/Http/Controllers/Seller/ProfileController.php:23
* @route '/seller/profile'
*/
update.url = (options?: RouteQueryOptions) => {




    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\ProfileController::update
* @see app/Http/Controllers/Seller/ProfileController.php:23
* @route '/seller/profile'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Seller\ProfileController::update
* @see app/Http/Controllers/Seller/ProfileController.php:23
* @route '/seller/profile'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\ProfileController::update
* @see app/Http/Controllers/Seller/ProfileController.php:23
* @route '/seller/profile'
*/
updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Seller\ProfileController::submitVerification
* @see app/Http/Controllers/Seller/ProfileController.php:37
* @route '/seller/profile/verification'
*/
export const submitVerification = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitVerification.url(options),
    method: 'post',
})

submitVerification.definition = {
    methods: ["post"],
    url: '/seller/profile/verification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Seller\ProfileController::submitVerification
* @see app/Http/Controllers/Seller/ProfileController.php:37
* @route '/seller/profile/verification'
*/
submitVerification.url = (options?: RouteQueryOptions) => {




    return submitVerification.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Seller\ProfileController::submitVerification
* @see app/Http/Controllers/Seller/ProfileController.php:37
* @route '/seller/profile/verification'
*/
submitVerification.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitVerification.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\ProfileController::submitVerification
* @see app/Http/Controllers/Seller/ProfileController.php:37
* @route '/seller/profile/verification'
*/
const submitVerificationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submitVerification.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Seller\ProfileController::submitVerification
* @see app/Http/Controllers/Seller/ProfileController.php:37
* @route '/seller/profile/verification'
*/
submitVerificationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submitVerification.url(options),
    method: 'post',
})

submitVerification.form = submitVerificationForm

const ProfileController = { index, update, submitVerification }

export default ProfileController