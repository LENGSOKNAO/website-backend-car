import { Link, usePage } from '@inertiajs/react';
import { BookOpen, FolderGit2, MessageSquare } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { dashboard } from '@/routes';
import messages from '@/routes/messages';
import { getAdminNavItems } from '@/lib/sidebar/admin-nav';
import { getBuyerNavItems } from '@/lib/sidebar/buyer-nav';
import { getSellerNavItems } from '@/lib/sidebar/seller-nav';
import type { NavItem } from '@/types';

function SidebarNavGroup({
    label,
    items,
}: {
    label: string;
    items: NavItem[];
}) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem
                        key={
                            typeof item.href === 'string'
                                ? item.href
                                : item.href.url
                        }
                    >
                        <SidebarMenuButton
                            asChild
                            isActive={isCurrentUrl(item.href)}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

export function AppSidebar() {
    const { auth } = usePage().props;
    const userRoles = auth.user?.roles?.map((r) => r.name) ?? [];
    const isAdmin = userRoles.some((r) => r === 'admin' || r === 'super-admin');
    const isStaff = userRoles.some((r) => r === 'staff');
    const isSeller = userRoles.some((r) => r === 'seller' || isAdmin);
    const isBuyer = userRoles.some((r) => r === 'buyer' || isAdmin);

    const dealershipItems = getAdminNavItems(isAdmin, isStaff);

    const accountItems: NavItem[] = [
        ...(isSeller ? getSellerNavItems() : []),
        ...(isBuyer ? getBuyerNavItems(!isAdmin) : []),
        {
            title: 'Messages',
            href: messages.index(),
            icon: MessageSquare,
        } as NavItem,
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="overflow-x-hidden overflow-y-auto pb-10">
                {dealershipItems.length > 0 && (
                    <SidebarNavGroup
                        label="Dealership"
                        items={dealershipItems}
                    />
                )}
                {accountItems.length > 0 && (
                    <>
                        <SidebarSeparator />
                        <SidebarNavGroup
                            label="My Account"
                            items={accountItems}
                        />
                    </>
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
