import { Head, Link, router } from '@inertiajs/react';
import { MessageSquare, Mail, Send, ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import messages from '@/routes/messages';

interface ConversationItem {
    id: string;
    other_user: { id: string; full_name: string };
    subject: string | null;
    listing: { id: string; title: string } | null;
    last_message: string | null;
    last_message_at: string | null;
    unread: boolean;
}

export default function MessageIndex({ conversations }: { conversations: ConversationItem[] }) {
    return (
        <>
            <Head title="Messages" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
             <div className="flex items-center justify-between mb-6">
                     <div>
                         <h1 className="text-2xl font-bold">Messages</h1>
                         <p className="text-sm text-muted-foreground">Your conversations</p>
                     </div>
                     <Button asChild>
                         <Link href={messages.create()}>
                             <Send className="size-4 mr-2" /> New Message
                         </Link>
                     </Button>
                 </div>

                 <div className="space-y-4">
                     <div className="flex items-center justify-between pb-3 border-b border-muted/20">
                         <h2 className="text-lg font-semibold">All Conversations</h2>
                         <p className="text-sm text-muted-foreground">{conversations.length} conversations</p>
                     </div>
                     
                     {conversations.length === 0 ? (
                         <div className="flex flex-col items-center gap-4 py-12 text-center text-muted-foreground">
                             <MessageSquare className="size-12 opacity-50" />
                             <p>No conversations yet.</p>
                             <Button variant="outline" asChild>
                                 <Link href={messages.create()}>
                                     <Send className="size-4 mr-2" /> Start a conversation
                                 </Link>
                             </Button>
                         </div>
                     ) : (
                         <div className="space-y-2">
                             {conversations.map((conv) => (
                                 <Link
                                     key={conv.id}
                                     href={messages.show(conv.id)}
                                     className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors border border-muted/20 hover:border-muted/30"
                                 >
                                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                                         {conv.other_user.full_name.charAt(0).toUpperCase()}
                                     </div>
                                     <div className="flex-1 min-w-0 space-y-1">
                                         <div className="flex items-center gap-2">
                                             <h3 className="font-medium">{conv.other_user.full_name}</h3>
                                             {conv.unread && (
                                                 <Badge variant="secondary" className="h-2 w-2 rounded-full bg-primary" />
                                             )}
                                             {conv.listing && (
                                                 <span className="text-xs text-muted-foreground truncate max-w-[150px]">{conv.listing.title}</span>
                                             )}
                                         </div>
                                         <p className="text-sm text-muted-foreground line-clamp-1">
                                             {conv.last_message ?? conv.subject ?? 'No messages yet'}
                                         </p>
                                     </div>
                                     <div className="text-right text-xs flex items-center gap-2">
                                         <div className="space-y-1">
                                             <p className="text-xs">{conv.last_message_at
                                                 ? new Date(conv.last_message_at).toLocaleDateString()
                                                 : ''}</p>
                                             {conv.last_message_at && (
                                                 <p className="text-xs text-muted-foreground">
                                                     {new Date(conv.last_message_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                 </p>
                                             )}
                                         </div>
                                         <ArrowRight className="size-4 text-muted-foreground" />
                                     </div>
                                 </Link>
                             ))}
                         </div>
                     )}
                 </div>
            </div>
        </>
    );
}

MessageIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Messages', href: messages.index() },
    ],
};
