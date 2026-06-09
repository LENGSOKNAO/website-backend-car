import { Link } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Action {
    label: string;
    href?: string | { url: string };
    onClick?: () => void;
    destructive?: boolean;
    disabled?: boolean;
}

interface TableActionsProps {
    actions: Action[];
}

function resolveHref(href: string | { url: string }): string {
    return typeof href === 'string' ? href : href.url;
}

export function TableActions({ actions }: TableActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontal className="size-4" />
                    <span className="sr-only">Actions</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[120px]">
                {actions.map((action, i) =>
                    action.href ? (
                        <DropdownMenuItem key={i} asChild>
                            <Link href={resolveHref(action.href)} className="cursor-pointer">
                                {action.label}
                            </Link>
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem
                            key={i}
                            variant={action.destructive ? 'destructive' : 'default'}
                            disabled={action.disabled}
                            onClick={action.onClick}
                        >
                            {action.label}
                        </DropdownMenuItem>
                    )
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
