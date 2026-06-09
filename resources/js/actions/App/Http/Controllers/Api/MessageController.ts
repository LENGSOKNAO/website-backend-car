import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\MessageController::conversations
* @see app/Http/Controllers/Api/MessageController.php:13
* @route '/v1/conversations'
*/
export const conversations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: conversations.url(options),
    method: 'get',
})

conversations.definition = {
    methods: ["get","head"],
    url: '/v1/conversations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\MessageController::conversations
* @see app/Http/Controllers/Api/MessageController.php:13
* @route '/v1/conversations'
*/
conversations.url = (options?: RouteQueryOptions) => {




    return conversations.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\MessageController::conversations
* @see app/Http/Controllers/Api/MessageController.php:13
* @route '/v1/conversations'
*/
conversations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: conversations.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\MessageController::conversations
* @see app/Http/Controllers/Api/MessageController.php:13
* @route '/v1/conversations'
*/
conversations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: conversations.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\MessageController::conversations
* @see app/Http/Controllers/Api/MessageController.php:13
* @route '/v1/conversations'
*/
const conversationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: conversations.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\MessageController::conversations
* @see app/Http/Controllers/Api/MessageController.php:13
* @route '/v1/conversations'
*/
conversationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: conversations.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\MessageController::conversations
* @see app/Http/Controllers/Api/MessageController.php:13
* @route '/v1/conversations'
*/
conversationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: conversations.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

conversations.form = conversationsForm

/**
* @see \App\Http\Controllers\Api\MessageController::messages
* @see app/Http/Controllers/Api/MessageController.php:42
* @route '/v1/conversations/{id}/messages'
*/
export const messages = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: messages.url(args, options),
    method: 'get',
})

messages.definition = {
    methods: ["get","head"],
    url: '/v1/conversations/{id}/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\MessageController::messages
* @see app/Http/Controllers/Api/MessageController.php:42
* @route '/v1/conversations/{id}/messages'
*/
messages.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return messages.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\MessageController::messages
* @see app/Http/Controllers/Api/MessageController.php:42
* @route '/v1/conversations/{id}/messages'
*/
messages.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: messages.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\MessageController::messages
* @see app/Http/Controllers/Api/MessageController.php:42
* @route '/v1/conversations/{id}/messages'
*/
messages.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: messages.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\MessageController::messages
* @see app/Http/Controllers/Api/MessageController.php:42
* @route '/v1/conversations/{id}/messages'
*/
const messagesForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: messages.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\MessageController::messages
* @see app/Http/Controllers/Api/MessageController.php:42
* @route '/v1/conversations/{id}/messages'
*/
messagesForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: messages.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\MessageController::messages
* @see app/Http/Controllers/Api/MessageController.php:42
* @route '/v1/conversations/{id}/messages'
*/
messagesForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: messages.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

messages.form = messagesForm

/**
* @see \App\Http\Controllers\Api\MessageController::send
* @see app/Http/Controllers/Api/MessageController.php:67
* @route '/v1/messages/send'
*/
export const send = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/v1/messages/send',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\MessageController::send
* @see app/Http/Controllers/Api/MessageController.php:67
* @route '/v1/messages/send'
*/
send.url = (options?: RouteQueryOptions) => {




    return send.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\MessageController::send
* @see app/Http/Controllers/Api/MessageController.php:67
* @route '/v1/messages/send'
*/
send.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\MessageController::send
* @see app/Http/Controllers/Api/MessageController.php:67
* @route '/v1/messages/send'
*/
const sendForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: send.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\MessageController::send
* @see app/Http/Controllers/Api/MessageController.php:67
* @route '/v1/messages/send'
*/
sendForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: send.url(options),
    method: 'post',
})

send.form = sendForm

/**
* @see \App\Http\Controllers\Api\MessageController::reply
* @see app/Http/Controllers/Api/MessageController.php:118
* @route '/v1/conversations/{id}/reply'
*/
export const reply = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

reply.definition = {
    methods: ["post"],
    url: '/v1/conversations/{id}/reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\MessageController::reply
* @see app/Http/Controllers/Api/MessageController.php:118
* @route '/v1/conversations/{id}/reply'
*/
reply.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return reply.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\MessageController::reply
* @see app/Http/Controllers/Api/MessageController.php:118
* @route '/v1/conversations/{id}/reply'
*/
reply.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\MessageController::reply
* @see app/Http/Controllers/Api/MessageController.php:118
* @route '/v1/conversations/{id}/reply'
*/
const replyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reply.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\MessageController::reply
* @see app/Http/Controllers/Api/MessageController.php:118
* @route '/v1/conversations/{id}/reply'
*/
replyForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reply.url(args, options),
    method: 'post',
})

reply.form = replyForm

/**
* @see \App\Http\Controllers\Api\MessageController::markRead
* @see app/Http/Controllers/Api/MessageController.php:146
* @route '/v1/conversations/{id}/read'
*/
export const markRead = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markRead.url(args, options),
    method: 'post',
})

markRead.definition = {
    methods: ["post"],
    url: '/v1/conversations/{id}/read',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\MessageController::markRead
* @see app/Http/Controllers/Api/MessageController.php:146
* @route '/v1/conversations/{id}/read'
*/
markRead.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return markRead.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\MessageController::markRead
* @see app/Http/Controllers/Api/MessageController.php:146
* @route '/v1/conversations/{id}/read'
*/
markRead.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markRead.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\MessageController::markRead
* @see app/Http/Controllers/Api/MessageController.php:146
* @route '/v1/conversations/{id}/read'
*/
const markReadForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markRead.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\MessageController::markRead
* @see app/Http/Controllers/Api/MessageController.php:146
* @route '/v1/conversations/{id}/read'
*/
markReadForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markRead.url(args, options),
    method: 'post',
})

markRead.form = markReadForm

const MessageController = { conversations, messages, send, reply, markRead }

export default MessageController