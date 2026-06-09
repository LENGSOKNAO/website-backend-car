import { Head, Link, usePage } from '@inertiajs/react';
import { Car, Users, ShoppingCart, ArrowRight, LayoutDashboard, Store, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';

export default function Dashboard() {
    const { auth } = usePage().props as { auth: { user: { roles?: { name: string }[]; type?: string } } };
    const user = auth.user;
    const roles = user?.roles?.map(r => r.name) ?? [];
    const isAdmin = roles.some(r => ['super-admin', 'admin', 'staff'].includes(r));
    const isSeller = roles.includes('seller');
    const isBuyer = roles.includes('buyer');

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Welcome</h1>
                    <p className="text-sm text-muted-foreground">Select an area to get started</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {isAdmin && (
                        <Card className="border-l-4 border-l-blue-600 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Admin Panel</CardTitle>
                                <div className="rounded-lg bg-blue-100 p-2 text-blue-700"><LayoutDashboard className="size-4" /></div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Manage users, sellers, inventory, orders, and all dealership operations.
                                </p>
                                <Button className="w-full" asChild>
                                    <Link href="/admin/dashboard">
                                        Go to Admin <ArrowRight className="ml-2 size-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {isSeller && (
                        <Card className="border-l-4 border-l-emerald-600 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Seller Dashboard</CardTitle>
                                <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700"><Store className="size-4" /></div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    List cars, manage orders, track sales, and respond to customers.
                                </p>
                                <Button className="w-full" variant="secondary" asChild>
                                    <Link href="/seller/dashboard">
                                        Go to Seller <ArrowRight className="ml-2 size-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {isBuyer && (
                        <Card className="border-l-4 border-l-violet-600 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Buyer Dashboard</CardTitle>
                                <div className="rounded-lg bg-violet-100 p-2 text-violet-700"><UserCircle className="size-4" /></div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Browse cars, track orders and manage inquiries.
                                </p>
                                <Button className="w-full" variant="secondary" asChild>
                                    <Link href="/buyer/dashboard">
                                        Go to Buyer <ArrowRight className="ml-2 size-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {isAdmin && (
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Users</CardTitle>
                                <Users className="size-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full justify-start text-sm" asChild>
                                    <Link href="/admin/users"><Users className="mr-2 size-4" /> Manage Users</Link>
                                </Button>
                            </CardContent>
                        </Card>
                        <Card className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Cars</CardTitle>
                                <Car className="size-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full justify-start text-sm" asChild>
                                    <Link href="/admin/cars"><Car className="mr-2 size-4" /> Manage Cars</Link>
                                </Button>
                            </CardContent>
                        </Card>
                        <Card className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                                <ShoppingCart className="size-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full justify-start text-sm" asChild>
                                    <Link href="/admin/orders"><ShoppingCart className="mr-2 size-4" /> View Orders</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
    ],
};
