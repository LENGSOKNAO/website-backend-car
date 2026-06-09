import { Car, CheckCircle2, ClipboardList, Cog, Fuel, History, LayoutGrid, ShoppingCart, Store, Tag, UserCog, Users, Wrench, ShieldCheck } from 'lucide-react';
import { dashboard } from '@/routes';
import admin from '@/routes/admin';
import type { NavItem } from '@/types';

export function getAdminNavItems(isAdmin: boolean, isStaff: boolean): NavItem[] {
    if (!isAdmin && !isStaff) return [];

    return [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Staff',
            href: admin.employees.index(),
            icon: UserCog,
        } as NavItem,
        {
            title: 'Customers',
            href: admin.users.index(),
            icon: Users,
        } as NavItem,
        {
            title: 'Sellers',
            href: admin.sellers.index(),
            icon: Store,
        } as NavItem,
        {
            title: 'Inventory',
            href: admin.cars.index(),
            icon: Car,
        } as NavItem,
        {
            title: 'Orders',
            href: admin.orders.index(),
            icon: ClipboardList,
        } as NavItem,
        {
            title: 'Categories',
            href: admin.categories.index(),
            icon: Tag,
        } as NavItem,
        {
            title: 'Makes & Models',
            href: '/admin/makes-models',
            icon: Car,
        } as NavItem,
        {
            title: 'Conditions',
            href: admin.conditions.index(),
            icon: CheckCircle2,
        } as NavItem,
        {
            title: 'Fuel Types',
            href: admin.fuelTypes.index(),
            icon: Fuel,
        } as NavItem,
        {
            title: 'Transmissions',
            href: admin.transmissions.index(),
            icon: Cog,
        } as NavItem,
        {
            title: 'Vehicle History',
            href: '/admin/vehicle-histories',
            icon: History,
        } as NavItem,
        {
            title: 'Warranties',
            href: '/admin/warranties',
            icon: ShieldCheck,
        } as NavItem,
        {
            title: 'Service',
            href: '/admin/service-appointments',
            icon: Wrench,
        } as NavItem,
        {
            title: 'Pre-Orders',
            href: '/admin/pre-orders',
            icon: ShoppingCart,
        } as NavItem,
    ];
}
