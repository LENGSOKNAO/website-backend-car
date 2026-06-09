import { BarChart3, Car, ClipboardList, Image, Layout } from 'lucide-react';
import seller from '@/routes/seller';
import type { NavItem } from '@/types';

export function getSellerNavItems(): NavItem[] {
    return [
        {
            title: 'Dashboard',
            href: seller.dashboard(),
            icon: BarChart3,
        } as NavItem,
        {
            title: 'My Listings',
            href: seller.cars.index(),
            icon: Car,
        } as NavItem,
        {
            title: 'My Sales',
            href: seller.orders.index(),
            icon: ClipboardList,
        } as NavItem,
        {
            title: 'Web',
            href: seller.web.index(),
            icon: Image,
        } as NavItem,
        {
            title: 'Heroes',
            href: seller.heroes.index(),
            icon: Layout,
        } as NavItem,
    ];
}
