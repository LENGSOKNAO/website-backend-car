import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:51
 * @route '/messages'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:51
 * @route '/messages'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:51
 * @route '/messages'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:51
 * @route '/messages'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:51
 * @route '/messages'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:51
 * @route '/messages'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:51
 * @route '/messages'
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
* @see \App\Http\Controllers\MessageController::create
 * @see app/Http/Controllers/MessageController.php:16
 * @route '/messages/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/messages/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MessageController::create
 * @see app/Http/Controllers/MessageController.php:16
 * @route '/messages/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::create
 * @see app/Http/Controllers/MessageController.php:16
 * @route '/messages/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MessageController::create
 * @see app/Http/Controllers/MessageController.php:16
 * @route '/messages/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MessageController::create
 * @see app/Http/Controllers/MessageController.php:16
 * @route '/messages/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MessageController::create
 * @see app/Http/Controllers/MessageController.php:16
 * @route '/messages/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MessageController::create
 * @see app/Http/Controllers/MessageController.php:16
 * @route '/messages/create'
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
* @see \App\Http\Controllers\MessageController::show
 * @see app/Http/Controllers/MessageController.php:86
 * @route '/messages/{message}'
 */
export const show = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/messages/{message}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MessageController::show
 * @see app/Http/Controllers/MessageController.php:86
 * @route '/messages/{message}'
 */
show.url = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    message: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        message: args.message,
                }

    return show.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::show
 * @see app/Http/Controllers/MessageController.php:86
 * @route '/messages/{message}'
 */
show.get = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MessageController::show
 * @see app/Http/Controllers/MessageController.php:86
 * @route '/messages/{message}'
 */
show.head = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MessageController::show
 * @see app/Http/Controllers/MessageController.php:86
 * @route '/messages/{message}'
 */
    const showForm = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MessageController::show
 * @see app/Http/Controllers/MessageController.php:86
 * @route '/messages/{message}'
 */
        showForm.get = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MessageController::show
 * @see app/Http/Controllers/MessageController.php:86
 * @route '/messages/{message}'
 */
        showForm.head = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\MessageController::store
 * @see app/Http/Controllers/MessageController.php:131
 * @route '/messages'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/messages',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MessageController::store
 * @see app/Http/Controllers/MessageController.php:131
 * @route '/messages'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::store
 * @see app/Http/Controllers/MessageController.php:131
 * @route '/messages'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MessageController::store
 * @see app/Http/Controllers/MessageController.php:131
 * @route '/messages'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MessageController::store
 * @see app/Http/Controllers/MessageController.php:131
 * @route '/messages'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\MessageController::reply
 * @see app/Http/Controllers/MessageController.php:182
 * @route '/messages/{message}/reply'
 */
export const reply = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

reply.definition = {
    methods: ["post"],
    url: '/messages/{message}/reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MessageController::reply
 * @see app/Http/Controllers/MessageController.php:182
 * @route '/messages/{message}/reply'
 */
reply.url = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    message: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        message: args.message,
                }

    return reply.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::reply
 * @see app/Http/Controllers/MessageController.php:182
 * @route '/messages/{message}/reply'
 */
reply.post = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MessageController::reply
 * @see app/Http/Controllers/MessageController.php:182
 * @route '/messages/{message}/reply'
 */
    const replyForm = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reply.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MessageController::reply
 * @see app/Http/Controllers/MessageController.php:182
 * @route '/messages/{message}/reply'
 */
        replyForm.post = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reply.url(args, options),
            method: 'post',
        })
    
    reply.form = replyForm
/**
* @see \App\Http\Controllers\MessageController::update
 * @see app/Http/Controllers/MessageController.php:209
 * @route '/messages/{message}'
 */
export const update = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/messages/{message}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MessageController::update
 * @see app/Http/Controllers/MessageController.php:209
 * @route '/messages/{message}'
 */
update.url = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    message: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        message: args.message,
                }

    return update.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::update
 * @see app/Http/Controllers/MessageController.php:209
 * @route '/messages/{message}'
 */
update.put = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\MessageController::update
 * @see app/Http/Controllers/MessageController.php:209
 * @route '/messages/{message}'
 */
    const updateForm = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MessageController::update
 * @see app/Http/Controllers/MessageController.php:209
 * @route '/messages/{message}'
 */
        updateForm.put = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\MessageController::destroy
 * @see app/Http/Controllers/MessageController.php:225
 * @route '/messages/{message}'
 */
export const destroy = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/messages/{message}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MessageController::destroy
 * @see app/Http/Controllers/MessageController.php:225
 * @route '/messages/{message}'
 */
destroy.url = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    message: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        message: args.message,
                }

    return destroy.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::destroy
 * @see app/Http/Controllers/MessageController.php:225
 * @route '/messages/{message}'
 */
destroy.delete = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MessageController::destroy
 * @see app/Http/Controllers/MessageController.php:225
 * @route '/messages/{message}'
 */
    const destroyForm = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MessageController::destroy
 * @see app/Http/Controllers/MessageController.php:225
 * @route '/messages/{message}'
 */
        destroyForm.delete = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\MessageController::fetch
 * @see app/Http/Controllers/MessageController.php:234
 * @route '/messages/{conversation}/fetch'
 */
export const fetch = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fetch.url(args, options),
    method: 'get',
})

fetch.definition = {
    methods: ["get","head"],
    url: '/messages/{conversation}/fetch',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MessageController::fetch
 * @see app/Http/Controllers/MessageController.php:234
 * @route '/messages/{conversation}/fetch'
 */
fetch.url = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { conversation: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    conversation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        conversation: args.conversation,
                }

    return fetch.definition.url
            .replace('{conversation}', parsedArgs.conversation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::fetch
 * @see app/Http/Controllers/MessageController.php:234
 * @route '/messages/{conversation}/fetch'
 */
fetch.get = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fetch.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MessageController::fetch
 * @see app/Http/Controllers/MessageController.php:234
 * @route '/messages/{conversation}/fetch'
 */
fetch.head = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: fetch.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MessageController::fetch
 * @see app/Http/Controllers/MessageController.php:234
 * @route '/messages/{conversation}/fetch'
 */
    const fetchForm = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: fetch.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MessageController::fetch
 * @see app/Http/Controllers/MessageController.php:234
 * @route '/messages/{conversation}/fetch'
 */
        fetchForm.get = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fetch.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MessageController::fetch
 * @see app/Http/Controllers/MessageController.php:234
 * @route '/messages/{conversation}/fetch'
 */
        fetchForm.head = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fetch.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    fetch.form = fetchForm
const messages = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
show: Object.assign(show, show),
store: Object.assign(store, store),
reply: Object.assign(reply, reply),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
fetch: Object.assign(fetch, fetch),
}

export default messages