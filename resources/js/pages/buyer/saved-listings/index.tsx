import { BlurImage } from '@/components/blur-image';
import { Head, Link, router } from '@inertiajs/react';
import { Heart, Trash2, Car } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import buyer from '@/routes/buyer';

interface SavedListing {
    id: string;
    listing: {
        id: string;
        make: { name: string };
        model: { name: string };
        category?: { name: string };
        year?: number;
        price: string;
        mileage?: number;
        fuel_type?: string;
        transmission?: string;
        image_url?: string | null;
    };
    saved_at: string;
}

export default function BuyerSavedListings({ listings }: { listings: any }) {
    const handleRemove = (listingId: string) => {
        if (confirm('Remove this listing from your saved list?')) {
            router.delete(buyer.savedListings.destroy(listingId).url);
        }
    };

    return (
        <>
            <Head title="Saved Listings" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Saved Listings</h1>
                        <p className="text-sm text-muted-foreground">Cars you're interested in</p>
                    </div>
                </div>

                {listings.data.length === 0 ? (
                    <Card className="shadow-sm">
                        <CardContent className="py-12 text-center">
                            <Heart className="mx-auto mb-3 size-12 text-muted-foreground opacity-50" />
                            <h3 className="text-lg font-medium">No saved listings</h3>
                            <p className="text-sm text-muted-foreground mt-1">Browse cars and save the ones you like.</p>
                            <Button className="mt-4" asChild>
                                <Link href="/">Browse Listings</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {listings.data.map((item: SavedListing) => (
                            <Card key={item.id} className="shadow-sm overflow-hidden group">
                                <div className="aspect-video bg-muted relative">
                                    {item.listing.image_url ? (
                                        <BlurImage
                                            src={item.listing.image_url}
                                            alt={`${item.listing.make.name} ${item.listing.model.name}`}
                                            containerClassName="h-full w-full"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <Car className="size-12 text-muted-foreground/50" />
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold">
                                                {item.listing.make.name} {item.listing.model.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">{item.listing.year}</p>
                                        </div>
                                        <Badge variant="secondary">
                                            ${Number(item.listing.price).toLocaleString()}
                                        </Badge>
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                                        {item.listing.mileage && <span>{Number(item.listing.mileage).toLocaleString()} mi</span>}
                                        {item.listing.fuel_type && <span>{item.listing.fuel_type}</span>}
                                        {item.listing.transmission && <span>{item.listing.transmission}</span>}
                                    </div>
                                    <div className="mt-3 flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1" asChild>
                                            <Link href={`/listings/${item.listing.id}`}>View</Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleRemove(item.listing.id)}>
                                            <Trash2 className="size-4 text-destructive" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

BuyerSavedListings.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Saved Listings', href: buyer.savedListings.index() },
    ],
};
