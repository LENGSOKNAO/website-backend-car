import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MessageController::index
* @see app/Http/Controllers/MessageController.php:37
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
* @see app/Http/Controllers/MessageController.php:37
* @route '/messages'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::index
* @see app/Http/Controllers/MessageController.php:37
* @route '/messages'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MessageController::index
* @see app/Http/Controllers/MessageController.php:37
* @route '/messages'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MessageController::index
* @see app/Http/Controllers/MessageController.php:37
* @route '/messages'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MessageController::index
* @see app/Http/Controllers/MessageController.php:37
* @route '/messages'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MessageController::index
* @see app/Http/Controllers/MessageController.php:37
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
* @see app/Http/Controllers/MessageController.php:15
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
* @see app/Http/Controllers/MessageController.php:15
* @route '/messages/create'
*/
create.url = (options?: RouteQueryOptions) => {




    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::create
* @see app/Http/Controllers/MessageController.php:15
* @route '/messages/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MessageController::create
* @see app/Http/Controllers/MessageController.php:15
* @route '/messages/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MessageController::create
* @see app/Http/Controllers/MessageController.php:15
* @route '/messages/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MessageController::create
* @see app/Http/Controllers/MessageController.php:15
* @route '/messages/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MessageController::create
* @see app/Http/Controllers/MessageController.php:15
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
* @see \App\Http\Controllers\MessageController::store
* @see app/Http/Controllers/MessageController.php:117
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
* @see app/Http/Controllers/MessageController.php:117
* @route '/messages'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::store
* @see app/Http/Controllers/MessageController.php:117
* @route '/messages'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MessageController::store
* @see app/Http/Controllers/MessageController.php:117
* @route '/messages'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MessageController::store
* @see app/Http/Controllers/MessageController.php:117
* @route '/messages'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\MessageController::show
* @see app/Http/Controllers/MessageController.php:72
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
* @see app/Http/Controllers/MessageController.php:72
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
* @see app/Http/Controllers/MessageController.php:72
* @route '/messages/{message}'
*/
show.get = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MessageController::show
* @see app/Http/Controllers/MessageController.php:72
* @route '/messages/{message}'
*/
show.head = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MessageController::show
* @see app/Http/Controllers/MessageController.php:72
* @route '/messages/{message}'
*/
const showForm = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MessageController::show
* @see app/Http/Controllers/MessageController.php:72
* @route '/messages/{message}'
*/
showForm.get = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MessageController::show
* @see app/Http/Controllers/MessageController.php:72
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
* @see \App\Http\Controllers\MessageController::storeMessage
* @see app/Http/Controllers/MessageController.php:166
* @route '/messages/{message}/reply'
*/
export const storeMessage = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMessage.url(args, options),
    method: 'post',
})

storeMessage.definition = {
    methods: ["post"],
    url: '/messages/{message}/reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MessageController::storeMessage
* @see app/Http/Controllers/MessageController.php:166
* @route '/messages/{message}/reply'
*/
storeMessage.url = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return storeMessage.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::storeMessage
* @see app/Http/Controllers/MessageController.php:166
* @route '/messages/{message}/reply'
*/
storeMessage.post = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeMessage.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MessageController::storeMessage
* @see app/Http/Controllers/MessageController.php:166
* @route '/messages/{message}/reply'
*/
const storeMessageForm = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeMessage.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MessageController::storeMessage
* @see app/Http/Controllers/MessageController.php:166
* @route '/messages/{message}/reply'
*/
storeMessageForm.post = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeMessage.url(args, options),
    method: 'post',
})

storeMessage.form = storeMessageForm

/**
* @see \App\Http\Controllers\MessageController::updateMessage
* @see app/Http/Controllers/MessageController.php:189
* @route '/messages/{message}'
*/
export const updateMessage = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateMessage.url(args, options),
    method: 'put',
})

updateMessage.definition = {
    methods: ["put"],
    url: '/messages/{message}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MessageController::updateMessage
* @see app/Http/Controllers/MessageController.php:189
* @route '/messages/{message}'
*/
updateMessage.url = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateMessage.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::updateMessage
* @see app/Http/Controllers/MessageController.php:189
* @route '/messages/{message}'
*/
updateMessage.put = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateMessage.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MessageController::updateMessage
* @see app/Http/Controllers/MessageController.php:189
* @route '/messages/{message}'
*/
const updateMessageForm = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateMessage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MessageController::updateMessage
* @see app/Http/Controllers/MessageController.php:189
* @route '/messages/{message}'
*/
updateMessageForm.put = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateMessage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateMessage.form = updateMessageForm

/**
* @see \App\Http\Controllers\MessageController::destroyMessage
* @see app/Http/Controllers/MessageController.php:205
* @route '/messages/{message}'
*/
export const destroyMessage = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyMessage.url(args, options),
    method: 'delete',
})

destroyMessage.definition = {
    methods: ["delete"],
    url: '/messages/{message}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MessageController::destroyMessage
* @see app/Http/Controllers/MessageController.php:205
* @route '/messages/{message}'
*/
destroyMessage.url = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroyMessage.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::destroyMessage
* @see app/Http/Controllers/MessageController.php:205
* @route '/messages/{message}'
*/
destroyMessage.delete = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyMessage.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\MessageController::destroyMessage
* @see app/Http/Controllers/MessageController.php:205
* @route '/messages/{message}'
*/
const destroyMessageForm = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyMessage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MessageController::destroyMessage
* @see app/Http/Controllers/MessageController.php:205
* @route '/messages/{message}'
*/
destroyMessageForm.delete = (args: { message: string | number } | [message: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyMessage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyMessage.form = destroyMessageForm

/**
* @see \App\Http\Controllers\MessageController::fetchMessages
* @see app/Http/Controllers/MessageController.php:214
* @route '/messages/{conversation}/fetch'
*/
export const fetchMessages = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fetchMessages.url(args, options),
    method: 'get',
})

fetchMessages.definition = {
    methods: ["get","head"],
    url: '/messages/{conversation}/fetch',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MessageController::fetchMessages
* @see app/Http/Controllers/MessageController.php:214
* @route '/messages/{conversation}/fetch'
*/
fetchMessages.url = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return fetchMessages.definition.url
            .replace('{conversation}', parsedArgs.conversation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::fetchMessages
* @see app/Http/Controllers/MessageController.php:214
* @route '/messages/{conversation}/fetch'
*/
fetchMessages.get = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fetchMessages.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MessageController::fetchMessages
* @see app/Http/Controllers/MessageController.php:214
* @route '/messages/{conversation}/fetch'
*/
fetchMessages.head = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: fetchMessages.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MessageController::fetchMessages
* @see app/Http/Controllers/MessageController.php:214
* @route '/messages/{conversation}/fetch'
*/
const fetchMessagesForm = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: fetchMessages.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MessageController::fetchMessages
* @see app/Http/Controllers/MessageController.php:214
* @route '/messages/{conversation}/fetch'
*/
fetchMessagesForm.get = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: fetchMessages.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MessageController::fetchMessages
* @see app/Http/Controllers/MessageController.php:214
* @route '/messages/{conversation}/fetch'
*/
fetchMessagesForm.head = (args: { conversation: string | number } | [conversation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: fetchMessages.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

fetchMessages.form = fetchMessagesForm

const MessageController = { index, create, store, show, storeMessage, updateMessage, destroyMessage, fetchMessages }

export default MessageController