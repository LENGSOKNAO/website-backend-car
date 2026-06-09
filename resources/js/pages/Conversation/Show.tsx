import { useEffect, useState, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import Textarea from '@/components/UI/Textarea';
import { Pusher } from 'pusher-js';

const ConversationShow = () => {
    const { data, visit } = usePage();
    const [messages, setMessages] = useState<Array<any>>([]);
    const [form] = useForm({
        content: '',
    });
    const [typingUsers, setTypingUsers] = useState<Set<number>>(new Set());
    const [onlineUsers, setOnlineUsers] = useState<Set<number>>(new Set());
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const typingTimeouts = useRef<Map<number, NodeJS.Timeout>>(new Map());

    useEffect(() => {
        // Load initial messages
        if (data.props.conversation) {
            setMessages(data.props.conversation.messages);
        }

        // Set up Echo to listen for events
        const echo = window.Echo;

        if (data.props.conversation?.id) {
            const conversationId = data.props.conversation.id;
            const currentUserId = data.props.auth?.user?.id;

            // Join presence channel for online status
            const presenceChannel = echo.join('online')
                .here((users: any[]) => {
                    // Set initial online users
                    setOnlineUsers(new Set(users.map((user: any) => user.user_id)));
                })
                .joining((user: any) => {
                    // User came online
                    setOnlineUsers(prev => {
                        const newSet = new Set(prev);
                        newSet.add(user.user_id);
                        return newSet;
                    });
                })
                .leaving((user: any) => {
                    // User went offline
                    setOnlineUsers(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(user.user_id);
                        return newSet;
                    });
                });

            // Listen for new messages
            echo.private(`App.Models.Conversation.${conversationId}`)
                .listen('.MessageCreated', (e: any) => {
                    setMessages(prev => [...prev, e.message]);
                    scrollToBottom();
                })
                .listen('.MessageRead', (e: any) => {
                    // Update the read status of messages
                    setMessages(prev => {
                        return prev.map(msg => {
                            if (msg.id === e.message_id && !msg.is_mine) {
                                return { ...msg, read_at: e.read_at };
                            }
                            return msg;
                        });
                    });
                })
                .listenForWhisper('typing', (e: any) => {
                    // Handle typing indicators
                    if (e.user_id !== currentUserId) {
                        if (e.typing) {
                            setTypingUsers(prev => {
                                const newSet = new Set(prev);
                                newSet.add(e.user_id);
                                return newSet;
                            });
                        } else {
                            setTypingUsers(prev => {
                                const newSet = new Set(prev);
                                newSet.delete(e.user_id);
                                return newSet;
                            });
                        }
                    }
                });

            // Clean up on unmount
            return () => {
                // Clear all typing timeouts
                typingTimeouts.current.forEach(timeout => clearTimeout(timeout));
                typingTimeouts.current.clear();
                echo.leave(`App.Models.Conversation.${conversationId}`);
                presenceChannel.leave(); // Leave presence channel
            };
        }
    }, [data.props.conversation?.id, data.props.auth?.user?.id]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.content.trim()) return;

        visit(
            route('messages.send', {
                receiver_id: data.props.conversation?.other_user.id,
                listing_id: data.props.conversation?.listing?.id ?? null,
                content: form.content,
            }),
            {
                method: 'post',
                onSuccess: () => {
                    form.setData({ content: '' });
                    // Stop typing indicator when sending message
                    window.Echo?.private(`App.Models.Conversation.${data.props.conversation?.id}`)
                        .whisper('typing', {
                            user_id: data.props.auth?.user?.id,
                            typing: false
                        });
                },
                onError: () => {
                    // Handle error
                }
            }
        );
    };

    const handleTyping = () => {
        const currentUserId = data.props.auth?.user?.id;
        const conversationId = data.props.conversation?.id;

        if (!currentUserId || !conversationId) return;

        // Emit typing started
        window.Echo?.private(`App.Models.Conversation.${conversationId}`)
            .whisper('typing', {
                user_id: currentUserId,
                typing: true
            });

        // Clear existing timeout for this user
        if (typingTimeouts.current.has(currentUserId)) {
            clearTimeout(typingTimeouts.current.get(currentUserId)!);
        }

        // Set timeout to stop typing after 3 seconds of inactivity
        const timeout = setTimeout(() => {
            window.Echo?.private(`App.Models.Conversation.${conversationId}`)
                .whisper('typing', {
                    user_id: currentUserId,
                    typing: false
                });
            typingTimeouts.current.delete(currentUserId);
        }, 3000);

        typingTimeouts.current.set(currentUserId, timeout);
    };

    if (!data.props.conversation) {
        return <div>Loading conversation...</div>;
    }

    return (
        <div className="flex h-screen flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message: any) => (
                    <div key={message.id} className={`flex ${message.is_mine ? 'justify-end' : 'justify-start'} mb-2`}>
                        <div className={`max-w-xs px-4 py-2 rounded-lg ${
                            message.is_mine
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800'
                        }`}>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            {!message.is_mine && message.read_at && (
                                <span className="text-xs text-gray-500 block mt-1">Read</span>
                            )}
                            {!message.is_mine && !message.read_at && (
                                <span className="text-xs text-gray-500 block mt-1">Delivered</span>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center p-4 border-t border-gray-200">
                <div className="flex-1 space-x-2">
                    {/* Online status indicator */}
                    {onlineUsers.has(data.props.conversation?.other_user.id) && (
                        <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" title="Online"></span>
                    )}
                    {!onlineUsers.has(data.props.conversation?.other_user.id) && (
                        <span className="h-2 w-2 bg-gray-400 rounded-full" title="Offline"></span>
                    )}
                    <span className="ml-1 text-xs">{data.props.conversation?.other_user?.full_name}</span>
                </div>
                
                {typingUsers.size > 0 && (
                    <div className="flex-1 text-xs text-gray-500 italic">
                        {Array.from(typingUsers).map(userId => 
                            data.props.conversation?.other_user.id === userId ? 
                            `${data.props.conversation?.other_user.full_name} is typing...` : ''
                        ).filter(Boolean).join(', ')}
                    </div>
                )}
                <textarea
                    value={form.content}
                    onChange={e => {
                        form.setData('content', e.target.value);
                        handleTyping();
                    }}
                    onBlur={() => {
                        // Stop typing when textarea loses focus
                        window.Echo?.private(`App.Models.Conversation.${data.props.conversation?.id}`)
                            .whisper('typing', {
                                user_id: data.props.auth?.user?.id,
                                typing: false
                            });
                    }}
                    placeholder="Type a message..."
                    className="flex-1 min-h-[60px] resize-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                    onClick={handleSubmit}
                    disabled={form.processing}
                    className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ConversationShow;