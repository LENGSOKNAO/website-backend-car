import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Mail, MessageSquare, Phone, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import seller from '@/routes/seller';

interface InquiryListing {
    id: string;
    make: { name: string };
    model: { name: string };
    year: number;
    price: string;
    image_url?: string | null;
}

interface InquiryBuyer {
    id: string;
    full_name: string;
    email: string;
    phone?: string | null;
}

interface Inquiry {
    id: string;
    listing: InquiryListing;
    buyer: InquiryBuyer;
    message: string;
    phone_number?: string | null;
    preferred_contact?: string | null;
    status: string;
    sent_at: string | null;
}

export default function SellerInquiryShow({ inquiry }: { inquiry: Inquiry }) {
    const handleStatusUpdate = (status: string) => {
        router.put(seller.inquiries.update(inquiry.id).url, { status }, { preserveState: true });
    };

    return (
        <>
            <Head title="Inquiry Details" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={seller.inquiries.index()}>
                            <ArrowLeft className="size-4" /> Back
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Inquiry Details</h1>
                        <p className="text-sm text-muted-foreground">
                            From {inquiry.buyer.full_name} about {inquiry.listing.make.name} {inquiry.listing.model.name}
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-4">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <MessageSquare className="size-4" /> Message
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="whitespace-pre-wrap text-sm">{inquiry.message}</p>
                                <Separator className="my-4" />
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">Sent {inquiry.sent_at ? new Date(inquiry.sent_at).toLocaleString() : '-'}</span>
                                    <Badge variant="outline" className="capitalize">{inquiry.status}</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <User className="size-4" /> Buyer Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="size-4 text-muted-foreground" />
                                    <span>{inquiry.buyer.full_name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="size-4 text-muted-foreground" />
                                    <span>{inquiry.buyer.email}</span>
                                </div>
                                {(inquiry.buyer.phone || inquiry.phone_number) && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="size-4 text-muted-foreground" />
                                        <span>{inquiry.phone_number ?? inquiry.buyer.phone}</span>
                                    </div>
                                )}
                                {inquiry.preferred_contact && (
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Prefers contact via: <span className="capitalize font-medium">{inquiry.preferred_contact}</span>
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {inquiry.status !== 'replied' && (
                                    <Button className="w-full" size="sm" onClick={() => handleStatusUpdate('replied')}>
                                        <MessageSquare className="size-4" /> Mark as Replied
                                    </Button>
                                )}
                                {inquiry.status !== 'archived' && (
                                    <Button variant="outline" className="w-full" size="sm" onClick={() => handleStatusUpdate('archived')}>
                                        Archive
                                    </Button>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base">Listed Vehicle</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-medium text-sm">
                                    {inquiry.listing.make.name} {inquiry.listing.model.name} ({inquiry.listing.year})
                                </p>
                                <p className="text-sm text-muted-foreground">${Number(inquiry.listing.price).toLocaleString()}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

SellerInquiryShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Inquiries', href: seller.inquiries.index() },
        { title: 'Inquiry Details', href: '' },
    ],
};
