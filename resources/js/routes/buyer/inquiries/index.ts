import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Buyer\InquiryController::index
 * @see app/Http/Controllers/Buyer/InquiryController.php:12
 * @route '/buyer/inquiries'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/buyer/inquiries',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Buyer\InquiryController::index
 * @see app/Http/Controllers/Buyer/InquiryController.php:12
 * @route '/buyer/inquiries'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Buyer\InquiryController::index
 * @see app/Http/Controllers/Buyer/InquiryController.php:12
 * @route '/buyer/inquiries'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Buyer\InquiryController::index
 * @see app/Http/Controllers/Buyer/InquiryController.php:12
 * @route '/buyer/inquiries'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Buyer\InquiryController::index
 * @see app/Http/Controllers/Buyer/InquiryController.php:12
 * @route '/buyer/inquiries'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Buyer\InquiryController::index
 * @see app/Http/Controllers/Buyer/InquiryController.php:12
 * @route '/buyer/inquiries'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Buyer\InquiryController::index
 * @see app/Http/Controllers/Buyer/InquiryController.php:12
 * @route '/buyer/inquiries'
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
* @see \App\Http\Controllers\Buyer\InquiryController::show
 * @see app/Http/Controllers/Buyer/InquiryController.php:43
 * @route '/buyer/inquiries/{inquiry}'
 */
export const show = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/buyer/inquiries/{inquiry}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Buyer\InquiryController::show
 * @see app/Http/Controllers/Buyer/InquiryController.php:43
 * @route '/buyer/inquiries/{inquiry}'
 */
show.url = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { inquiry: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    inquiry: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        inquiry: args.inquiry,
                }

    return show.definition.url
            .replace('{inquiry}', parsedArgs.inquiry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Buyer\InquiryController::show
 * @see app/Http/Controllers/Buyer/InquiryController.php:43
 * @route '/buyer/inquiries/{inquiry}'
 */
show.get = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Buyer\InquiryController::show
 * @see app/Http/Controllers/Buyer/InquiryController.php:43
 * @route '/buyer/inquiries/{inquiry}'
 */
show.head = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Buyer\InquiryController::show
 * @see app/Http/Controllers/Buyer/InquiryController.php:43
 * @route '/buyer/inquiries/{inquiry}'
 */
    const showForm = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Buyer\InquiryController::show
 * @see app/Http/Controllers/Buyer/InquiryController.php:43
 * @route '/buyer/inquiries/{inquiry}'
 */
        showForm.get = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Buyer\InquiryController::show
 * @see app/Http/Controllers/Buyer/InquiryController.php:43
 * @route '/buyer/inquiries/{inquiry}'
 */
        showForm.head = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const inquiries = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default inquiries