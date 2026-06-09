import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Mail, Phone, Calendar, MapPin, Store } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import type { User } from '@/types';

export default function SellerShow({ seller }: { seller: User }) {
    return (
        <>
            <Head title={`Seller: ${seller.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={admin.sellers.index()}>
                            <ArrowLeft className="size-4 mr-1" /> Back
                        </Link>
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>{seller.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="size-4 text-muted-foreground" />
                                <span>{seller.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="size-4 text-muted-foreground" />
                                <span>{seller.phone ?? '—'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Store className="size-4 text-muted-foreground" />
                                <span>{seller.dealer_name ?? '—'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="size-4 text-muted-foreground" />
                                <span>{seller.location ?? '—'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="size-4 text-muted-foreground" />
                                <span>Joined {new Date(seller.created_at).toLocaleDateString()}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

SellerShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Sellers', href: admin.sellers.index() },
        { title: 'View', href: '' },
    ],
};
