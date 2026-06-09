import { Head, router } from '@inertiajs/react';
import { Tag } from 'lucide-react';
import { TableActions } from '@/components/table-actions';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import seller from '@/routes/seller';

interface Offer {
    id: string;
    buyer: { id: string; full_name: string };
    listing: { id: string; make: { name: string }; model: { name: string } };
    offered_price: string;
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

export default function SellerOffers({ offers, filters }: { offers: any; filters: { status?: string } }) {
    const handleStatusFilter = (value: string) => {
        router.get(seller.offers.index().url, { ...filters, status: value }, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="Offers" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Offers</h1>
                        <p className="text-sm text-muted-foreground">Offers from buyers on your listings</p>
                    </div>
                </div>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>All Offers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex gap-2">
                            <Select value={filters.status ?? ''} onValueChange={handleStatusFilter}>
                                <SelectTrigger className="w-[160px]">
                                    <SelectValue placeholder="All statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value=" ">All</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="accepted">Accepted</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                    <SelectItem value="countered">Countered</SelectItem>
                                    <SelectItem value="expired">Expired</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Buyer</TableHead>
                                    <TableHead>Listing</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {offers.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            <Tag className="mx-auto mb-2 size-8 opacity-50" />
                                            No offers yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    offers.data.map((offer: Offer) => (
                                        <TableRow key={offer.id}>
                                            <TableCell className="font-medium">{offer.buyer.full_name}</TableCell>
                                            <TableCell className="text-sm">
                                                {offer.listing.make.name} {offer.listing.model.name}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                ${Number(offer.offered_price).toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={statusVariant[offer.status] ?? 'secondary'} className="capitalize">
                                                    {offer.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {offer.created_at ? new Date(offer.created_at).toLocaleDateString() : '-'}
                                            </TableCell>
                                            <TableCell>
                                                <TableActions
                                                    actions={[
                                                        { label: 'View', href: seller.offers.show(offer.id) },
                                                    ]}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

SellerOffers.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Offers', href: seller.offers.index() },
    ],
};
