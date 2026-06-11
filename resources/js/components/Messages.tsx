import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

interface MessagesProps {
    receiverId: string;
    listingId?: string;
    onSuccess?: () => void;
}

export default function Messages({ receiverId, listingId, onSuccess }: MessagesProps) {
    const [content, setContent] = useState('');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || sending) return;

        setSending(true);
        setError(null);

        try {
            await api.post('/messages/send', {
                receiver_id: receiverId,
                listing_id: listingId || null,
                content: content.trim(),
            });
            setContent('');
            onSuccess?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send message');
        } finally {
            setSending(false);
        }
    };

    return (
        <form onSubmit={handleSend} className="flex flex-col gap-3">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your message..."
                rows={4}
                className="flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
            <div className="flex justify-end">
                <Button type="submit" disabled={!content.trim() || sending} size="sm">
                    {sending ? (
                        <Loader2 className="size-4 mr-1.5 animate-spin" />
                    ) : (
                        <Send className="size-4 mr-1.5" />
                    )}
                    {sending ? 'Sending...' : 'Send Message'}
                </Button>
            </div>
        </form>
    );
}
