import { BarChart3, ShoppingCart, MessageSquareText, DollarSign, Heart, Package } from 'lucide-react';
import buyer from '@/routes/buyer';
import type { NavItem } from '@/types';

export function getBuyerNavItems(showDashboard: boolean): NavItem[] {
    const items: NavItem[] = [];

    if (showDashboard) {
        items.push({
            title: 'Dashboard',
            href: buyer.dashboard(),
            icon: BarChart3,
        } as NavItem);
    }

    items.push(
        {
            title: 'My Orders',
            href: buyer.orders.index(),
            icon: ShoppingCart,
        } as NavItem,
        {
            title: 'My Inquiries',
            href: buyer.inquiries.index(),
            icon: MessageSquareText,
        } as NavItem,
        {
            title: 'My Offers',
            href: buyer.offers.index(),
            icon: DollarSign,
        } as NavItem,
        {
            title: 'Saved Listings',
            href: buyer.savedListings.index(),
            icon: Heart,
        } as NavItem,
        {
            title: 'Pre-Orders',
            href: buyer.preOrders.index(),
            icon: Package,
        } as NavItem,
    );

    return items;
}
