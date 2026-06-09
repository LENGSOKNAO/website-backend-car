import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Send, Pencil, Check, X, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import messages from '@/routes/messages';

// Import Echo for real-time broadcasting
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;

interface MessageItem {
    id: string;
    sender_id: string;
    sender_name: string;
    content: string;
    read_at: string | null;
    edited_at: string | null;
    deleted_at: string | null;
    created_at: string;
    is_mine: boolean;
}

interface ConversationData {
    id: string;
    subject: string | null;
    other_user: { id: string; full_name: string };
    listing: { id: string; title: string } | null;
}

export default function MessageShow({
    conversation,
    messages: initialMessages,
}: {
    conversation: ConversationData;
    messages: MessageItem[];
}) {
    const [newContent, setNewContent] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState('');
    const [messagesList, setMessagesList] = useState<MessageItem[]>(initialMessages);
    const [usersTyping, setUsersTyping] = useState<string[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const editInputRef = useRef<HTMLInputElement>(null);

    // Set up real-time updates using Echo/Pusher
    useEffect(() => {
        // In a real app, you would get the conversation ID from props
        const conversationId = conversation.id;
        
        // Set up Echo to listen for message events
        // Only proceed if Echo is available (initialized in bootstrap.js)
        if (!window.Echo) {
            console.warn('Echo not available. Real-time updates disabled.');
            return;
        }
        
        const echo = window.Echo;

        // Subscribe to the private channel for this conversation
        const channel = echo.private(`App.Models.Conversation.${conversationId}`);

         // Listen for the MessageCreated event
         channel.listen('.MessageCreated', (e: any) => {
             // When we receive a new message, fetch the latest messages
             fetch(`/messages/${conversationId}/fetch`, {
                 credentials: 'include'
             })
                 .then(response => response.json())
                 .then(data => {
                     setMessagesList(data);
                 })
                 .catch(error => {
                     console.error('Failed to fetch messages:', error);
                 });
         });

        // Fetch initial data
        const fetchInitialData = async () => {
            try {
                const response = await fetch(`/messages/${conversationId}/fetch`);
                if (response.ok) {
                    const data = await response.json();
                    setMessagesList(data);
                }
            } catch (error) {
                console.error('Failed to fetch initial messages:', error);
            }
        };

        fetchInitialData();

        // Clean up on unmount
        return () => {
            echo.leave(channel);
        };
    }, [conversation.id]); // Re-run if conversation changes

    // Set up polling for new messages (fallback for when real-time isn't working)
    useEffect(() => {
        let pollingInterval: NodeJS.Timeout | null = null;
        let isMounted = true;
        let lastKnownMessageCount = 0;
        let errorCount = 0;
        const MAX_ERRORS_BEFORE_BACKOFF = 3;

            // Poll for new messages - start with 5 seconds, increase if errors occur
            const fetchNewMessages = async () => {
                // Don't proceed if component is unmounted
                if (!isMounted) return;

                try {
                    const response = await fetch(`/messages/${conversation.id}/fetch`);
                    
                    if (response.ok) {
                        const data = await response.json();
                        
                        // Reset error count on successful fetch
                        errorCount = 0;
                        
                        // If we got data and component is still mounted, update our messages list
                        if (isMounted && data) {
                            const newMessages = data as MessageItem[];
                            
                            // Only update if we have new messages (more efficient than JSON.stringify comparison)
                            if (newMessages.length !== lastKnownMessageCount) {
                                setMessagesList(newMessages);
                                lastKnownMessageCount = newMessages.length;
                                
                            // Message activity chart removed as requested
                                
                                // Scroll to bottom to show new messages
                                if (isMounted && bottomRef.current) {
                                    // Use requestAnimationFrame to ensure DOM is updated
                                    requestAnimationFrame(() => {
                                        if (isMounted && bottomRef.current) {
                                            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    });
                                }
                            }
                        }
                    } else {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                } catch (error) {
                    // Only handle error if component is still mounted
                    if (isMounted) {
                        errorCount++;
                        console.warn(`Failed to fetch new messages (error #${errorCount}):`, error.message);
                        
                        // If we have too many consecutive errors, we might want to back off
                        // but we'll keep trying - the interval remains constant for simplicity
                        if (errorCount >= MAX_ERRORS_BEFORE_BACKOFF) {
                            console.warn('Multiple consecutive errors fetching messages. Continuing to try...');
                        }
                    }
                }
            };

        // Start polling - less frequent since we have real-time updates (5 seconds)
        pollingInterval = setInterval(fetchNewMessages, 5000);

        // Clean up on unmount
        return () => {
            isMounted = false;
            if (pollingInterval) {
                clearInterval(pollingInterval);
            }
        };
    }, [conversation.id, router]); // Only re-run if conversation changes or router changes

    const startEdit = (msg: MessageItem) => {
        setEditingId(msg.id);
        setEditContent(msg.content);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditContent('');
    };

    const saveEdit = (msgId: string) => {
        if (!editContent.trim()) {
return;
}

        router.put(messages.update(msgId).url, { content: editContent }, {
            preserveScroll: true,
            onSuccess: () => {
                setEditingId(null);
                setEditContent('');
            },
        });
    };

    const handleEditKeyDown = (e: React.KeyboardEvent, msgId: string) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            saveEdit(msgId);
        }

        if (e.key === 'Escape') {
            cancelEdit();
        }
    };

    const deleteMessage = (msgId: string) => {
        if (!confirm('Delete this message?')) {
            return;
        }

        router.delete(messages.destroy(msgId).url, { preserveScroll: true });
    };

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newContent.trim()) {
            return;
        }

        router.post(messages.reply(conversation.id).url, {
            content: newContent,
        }, {
            onSuccess: () => {
                setNewContent('');
                // Scroll to bottom after sending message
                if (bottomRef.current) {
                    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            },
            onError: () => {
                // Handle error - you might want to show a notification
                console.error('Failed to send message');
            }
        });
    };

    return (
        <>
            <Head title={conversation.other_user.full_name} />
             <div className="flex h-full flex-1 flex-col gap-4 p-4">
              <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm" asChild>
                          <Link href={messages.index()}>
                              <ArrowLeft className="size-4 mr-2" /> Back
                          </Link>
                      </Button>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                          {conversation.other_user.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 space-y-2">
                          <h1 className="text-lg font-semibold truncate">{conversation.other_user.full_name}</h1>
                          {conversation.listing && (
                              <p className="text-sm text-muted-foreground truncate">Re: {conversation.listing.title}</p>
                           )}
                      </div>
                  </div>

                    <Card className="flex-1 flex flex-col shadow-sm">
                         {usersTyping.length > 0 && (
                             <div className="px-4 py-2 text-sm text-muted-foreground">
                                 {usersTyping.map((userId, index) => {
                                     // In a real app, you'd fetch user names from props or context
                                     // For now, we'll show a generic indicator
                                     return (
                                         <span key={userId} className="animate-pulse">
                                             User is typing
                                         </span>
                                     );
                                 })}
                             </div>
                         )}
                        <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[60vh]">
                           {messagesList.length === 0 ? (
                               <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
                                   <p className="text-sm">No messages yet. Send the first message.</p>
                               </div>
                           ) : (
                               messagesList.map((msg) => (
                                   <div key={msg.id} className={`flex ${msg.is_mine ? 'justify-end' : 'justify-start'} group`}>
                                       <div className="max-w-[75%]">
                                        <div
                                                className={`rounded-2xl px-4 py-3 ${
                                                    msg.is_mine
                                                        ? 'bg-primary text-primary-foreground rounded-br-sm ml-auto'
                                                        : 'bg-muted rounded-bl-sm mr-auto'
                                                } shadow-sm`}
                                            >
                                              {msg.deleted_at ? (
                                                  <p className="text-sm italic opacity-60">This message was deleted</p>
                                              ) : editingId === msg.id ? (
                                                  <div className="flex gap-1">
                                                      <Input
                                                          ref={editInputRef}
                                                          value={editContent}
                                                          onChange={(e) => setEditContent(e.target.value)}
                                                          onKeyDown={(e) => handleEditKeyDown(e, msg.id)}
                                                          className="min-w-[200px] text-sm"
                                                      />
                                                      <Button size="icon" variant="ghost" onClick={() => saveEdit(msg.id)} className="size-8 shrink-0">
                                                          <Check className="size-4" />
                                                      </Button>
                                                      <Button size="icon" variant="ghost" onClick={cancelEdit} className="size-8 shrink-0">
                                                          <X className="size-4" />
                                                      </Button>
                                                  </div>
                                              ) : (
                                                  <>
                                                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                                      <div className="flex items-center gap-1 justify-end">
                                                          <p className={`text-[10px] mt-1 ${msg.is_mine ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                                              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                              {msg.edited_at && ' (edited)'}
                                                              {msg.is_mine && msg.read_at && ' · Read'}
                                                          </p>
                                                          {msg.is_mine && editingId !== msg.id && !msg.deleted_at && (
                                                              <>
                                                                  <button
                                                                      onClick={() => startEdit(msg)}
                                                                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] mt-1 text-primary-foreground/50 hover:text-primary-foreground"
                                                                  >
                                                                      <Pencil className="size-3" />
                                                                  </button>
                                                                  <button
                                                                      onClick={() => deleteMessage(msg.id)}
                                                                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] mt-1 text-destructive/50 hover:text-destructive"
                                                                  >
                                                                      <Trash2 className="size-3" />
                                                                  </button>
                                                              </>
                                                          )}
                                                      </div>
                                                  </>
                                              )}
                                          </div>
                                      </div>
                                  </div>
                              ))
                           )}
                          <div ref={bottomRef} />
                      </CardContent>
                  </Card>

                 <form onSubmit={sendMessage} className="flex gap-3 p-3 bg-muted/50 rounded-xl border">
                      <Input
                          value={newContent}
                          onChange={(e) => setNewContent(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-3 text-sm"
                      />
                     <Button type="submit" disabled={!newContent.trim()} className="px-4 py-3">
                         <Send className="size-5" />
                     </Button>
                 </form>
            </div>
        </>
    );
}

MessageShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Messages', href: messages.index() },
        { title: 'Conversation', href: '' },
    ],
};
