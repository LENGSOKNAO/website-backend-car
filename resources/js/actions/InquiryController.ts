import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../wayfinder'
/**
* @see \InquiryController::index
 * @see [unknown]:0
 * @route '/seller/inquiries'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/seller/inquiries',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \InquiryController::index
 * @see [unknown]:0
 * @route '/seller/inquiries'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \InquiryController::index
 * @see [unknown]:0
 * @route '/seller/inquiries'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \InquiryController::index
 * @see [unknown]:0
 * @route '/seller/inquiries'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \InquiryController::index
 * @see [unknown]:0
 * @route '/seller/inquiries'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \InquiryController::index
 * @see [unknown]:0
 * @route '/seller/inquiries'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \InquiryController::index
 * @see [unknown]:0
 * @route '/seller/inquiries'
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
* @see \InquiryController::show
 * @see [unknown]:0
 * @route '/seller/inquiries/{inquiry}'
 */
export const show = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/seller/inquiries/{inquiry}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \InquiryController::show
 * @see [unknown]:0
 * @route '/seller/inquiries/{inquiry}'
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
* @see \InquiryController::show
 * @see [unknown]:0
 * @route '/seller/inquiries/{inquiry}'
 */
show.get = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \InquiryController::show
 * @see [unknown]:0
 * @route '/seller/inquiries/{inquiry}'
 */
show.head = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \InquiryController::show
 * @see [unknown]:0
 * @route '/seller/inquiries/{inquiry}'
 */
    const showForm = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \InquiryController::show
 * @see [unknown]:0
 * @route '/seller/inquiries/{inquiry}'
 */
        showForm.get = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \InquiryController::show
 * @see [unknown]:0
 * @route '/seller/inquiries/{inquiry}'
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
/**
* @see \InquiryController::update
 * @see [unknown]:0
 * @route '/seller/inquiries/{inquiry}'
 */
export const update = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/seller/inquiries/{inquiry}',
} satisfies RouteDefinition<["put"]>

/**
* @see \InquiryController::update
 * @see [unknown]:0
 * @route '/seller/inquiries/{inquiry}'
 */
update.url = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{inquiry}', parsedArgs.inquiry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \InquiryController::update
 * @see [unknown]:0
 * @route '/seller/inquiries/{inquiry}'
 */
update.put = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \InquiryController::update
 * @see [unknown]:0
 * @route '/seller/inquiries/{inquiry}'
 */
    const updateForm = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \InquiryController::update
 * @see [unknown]:0
 * @route '/seller/inquiries/{inquiry}'
 */
        updateForm.put = (args: { inquiry: string | number } | [inquiry: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const InquiryController = { index, show, update }

export default InquiryController