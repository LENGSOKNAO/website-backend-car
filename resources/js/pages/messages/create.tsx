import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Send, Search, MessageSquare, ShoppingBag, Shield, Store } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import messages from '@/routes/messages';
import type { User } from '@/types';

type UserGroup = 'admin' | 'seller' | 'customer';

function getUserGroup(u: User): UserGroup {
    const roleNames = u.roles?.map((r) => r.name) ?? [];

    if (roleNames.some((r) => ['super-admin', 'admin', 'staff'].includes(r))) {
return 'admin';
}

    if (roleNames.includes('seller')) {
return 'seller';
}

    return 'customer';
}

const groupMeta: Record<UserGroup, { label: string; icon: typeof Shield }> = {
    admin: { label: 'Admin', icon: Shield },
    seller: { label: 'Seller', icon: Store },
    customer: { label: 'Customer', icon: ShoppingBag },
};

export default function MessageCreate({ users, receiver_id }: { users: User[]; receiver_id?: string }) {
    const [receiverId, setReceiverId] = useState(receiver_id ?? '');
    const [content, setContent] = useState('');
    const [search, setSearch] = useState('');

    const selectedUser = users.find((u) => u.id === receiverId);

    const filteredUsers = useMemo(
        () => users.filter((u) =>
            u.full_name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
        ),
        [users, search]
    );

    const groupedUsers = useMemo(() => {
        const groups: Record<UserGroup, User[]> = { admin: [], seller: [], customer: [] };

        for (const u of filteredUsers) {
            groups[getUserGroup(u)].push(u);
        }

        return groups;
    }, [filteredUsers]);

    const groupOrder: UserGroup[] = ['admin', 'seller', 'customer'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!receiverId || !content.trim()) {
return;
}

        router.post(messages.store().url, {
            receiver_id: receiverId,
            content,
        }, {
            onSuccess: () => { },
        });
    };

    return (
        <>
            <Head title="New Message" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 w-full">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={messages.index()}>
                            <ArrowLeft className="size-4 mr-1" /> Back
                        </Link>
                    </Button>
                    <h1 className="text-xl font-bold">New Message</h1>
                </div>

                <div className="grid gap-4 md:grid-cols-5 flex-1">
                    <div className="md:col-span-2">
                        <Card className="shadow-sm h-full">
                            <CardContent className="p-3">
                                <div className="relative mb-3">
                                    <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground pointer-events-none" />
                                    <Input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search users..."
                                        className="pl-8 h-9 text-sm"
                                    />
                                </div>
                                <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 260px)' }}>
                                    {filteredUsers.length === 0 ? (
                                        <p className="text-sm text-muted-foreground text-center py-8">No users found</p>
                                    ) : (
                                        groupOrder.map((group) => {
                                            const groupUsers = groupedUsers[group];

                                            if (groupUsers.length === 0) {
return null;
}

                                            const { label, icon: Icon } = groupMeta[group];

                                            return (
                                                <div key={group}>
                                                    <div className="flex items-center gap-1.5 px-1 py-1.5">
                                                        <Icon className="size-3.5 text-muted-foreground" />
                                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
                                                        <span className="text-xs text-muted-foreground/60 ml-auto">{groupUsers.length}</span>
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        {groupUsers.map((u) => (
                                                            <button
                                                                key={u.id}
                                                                type="button"
                                                                onClick={() => setReceiverId(u.id)}
                                                                className={cn(
                                                                    'w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                                                                    u.id === receiverId
                                                                        ? 'bg-primary text-primary-foreground'
                                                                        : 'hover:bg-muted'
                                                                )}
                                                            >
                                                                <Avatar className="size-8 shrink-0">
                                                                    <AvatarFallback className={cn(
                                                                        'text-xs',
                                                                        u.id === receiverId
                                                                            ? 'bg-primary-foreground/20 text-primary-foreground'
                                                                            : 'bg-muted-foreground/10 text-muted-foreground'
                                                                    )}>
                                                                        {u.full_name.charAt(0).toUpperCase()}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div className="min-w-0 flex-1">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <p className="truncate font-medium">{u.full_name}</p>
                                                                        {u.has_ordered_from_me && (
                                                                            <Badge variant="secondary" className="shrink-0 text-[10px] px-1.5 py-0 h-4 font-normal whitespace-nowrap">
                                                                                Ordered
                                                                            </Badge>
                                                                        )}
                                                                    </div>
                                                                    <p className={cn(
                                                                        'truncate text-xs',
                                                                        u.id === receiverId ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                                                    )}>{u.email}</p>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-3">
                        <Card className="shadow-sm h-full">
                            <CardContent className="p-4 flex flex-col h-full">
                                {selectedUser ? (
                                    <>
                                        <div className="flex items-center gap-3 pb-4 border-b">
                                            <Avatar className="size-10">
                                                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                                    {selectedUser.full_name.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-sm">{selectedUser.full_name}</p>
                                                    {selectedUser.has_ordered_from_me && (
                                                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 font-normal">
                                                            Ordered from you
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground">{selectedUser.email}</p>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-3 mt-4">
                                            <div className="flex-1">
                                                <textarea
                                                    value={content}
                                                    onChange={(e) => setContent(e.target.value)}
                                                    placeholder="Write your message..."
                                                    rows={6}
                                                    className="flex w-full h-full min-h-[120px] rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs text-muted-foreground">
                                                    {content.length > 0 && `${content.length} characters`}
                                                </p>
                                                <Button type="submit" disabled={!content.trim()} size="sm">
                                                    <Send className="size-4 mr-1.5" /> Send
                                                </Button>
                                            </div>
                                        </form>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center flex-1 gap-3 text-muted-foreground">
                                        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                                            <MessageSquare className="size-6" />
                                        </div>
                                        <p className="text-sm font-medium">Select a recipient</p>
                                        <p className="text-xs text-center max-w-[200px]">
                                            Choose a user from the list to start a conversation
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

MessageCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Messages', href: messages.index() },
        { title: 'New Message', href: '' },
    ],
};
