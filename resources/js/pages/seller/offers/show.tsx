import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Check, X, User, DollarSign, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import seller from '@/routes/seller';

interface OfferListing {
    id: string;
    make: { name: string };
    model: { name: string };
    year: number;
    price: string;
    status: string;
    image_url?: string | null;
}

interface OfferBuyer {
    id: string;
    full_name: string;
    email: string;
    phone?: string | null;
}

interface Offer {
    id: string;
    listing: OfferListing;
    buyer: OfferBuyer;
    offered_price: string;
    message: string | null;
    status: string;
    expires_at: string | null;
    created_at: string;
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    pending: 'default',
    accepted: 'default',
    rejected: 'destructive',
    countered: 'secondary',
    expired: 'outline',
};

export default function SellerOfferShow({ offer }: { offer: Offer }) {
    const handleAccept = () => {
        if (confirm('Accept this offer? This will create an order and mark the listing as sold.')) {
            router.post(seller.offers.accept(offer.id).url);
        }
    };

    const handleReject = () => {
        if (confirm('Reject this offer?')) {
            router.post(seller.offers.reject(offer.id).url);
        }
    };

    const formatCurrency = (amount: number | string) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(Number(amount));

    return (
        <>
            <Head title="Offer Details" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={seller.offers.index()}>
                            <ArrowLeft className="size-4" /> Back
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Offer Details</h1>
                        <p className="text-sm text-muted-foreground">
                            From {offer.buyer.full_name} on {offer.listing.make.name} {offer.listing.model.name}
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-4">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <DollarSign className="size-4" /> Offer Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-baseline justify-between">
                                    <span className="text-sm text-muted-foreground">Offered Price</span>
                                    <span className="text-3xl font-bold">{formatCurrency(offer.offered_price)}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-2 text-sm">
                                    <Badge variant={statusVariant[offer.status] ?? 'secondary'} className="capitalize">{offer.status}</Badge>
                                    {offer.expires_at && (
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="size-3" /> Expires {new Date(offer.expires_at).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                                {offer.message && (
                                    <>
                                        <Separator />
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Buyer's Note:</p>
                                            <p className="text-sm whitespace-pre-wrap">{offer.message}</p>
                                        </div>
                                    </>
                                )}

                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <User className="size-4" /> Buyer Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-1 text-sm">
                                <p><span className="text-muted-foreground">Name:</span> {offer.buyer.full_name}</p>
                                <p><span className="text-muted-foreground">Email:</span> {offer.buyer.email}</p>
                                {offer.buyer.phone && <p><span className="text-muted-foreground">Phone:</span> {offer.buyer.phone}</p>}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        {offer.status === 'pending' && (
                            <Card className="shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-base">Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Button className="w-full" size="sm" onClick={handleAccept}>
                                        <Check className="size-4" /> Accept Offer
                                    </Button>
                                    <Button variant="destructive" className="w-full" size="sm" onClick={handleReject}>
                                        <X className="size-4" /> Reject Offer
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base">Listed Vehicle</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-medium text-sm">
                                    {offer.listing.make.name} {offer.listing.model.name} ({offer.listing.year})
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Listed: ${Number(offer.listing.price).toLocaleString()}
                                    {Number(offer.listing.price) > Number(offer.offered_price) && (
                                        <Badge variant="secondary" className="ml-2 text-xs">
                                            {Math.round((1 - Number(offer.offered_price) / Number(offer.listing.price)) * 100)}% below asking
                                        </Badge>
                                    )}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">Status: {offer.listing.status}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

SellerOfferShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Offers', href: seller.offers.index() },
        { title: 'Offer Details', href: '' },
    ],
};
