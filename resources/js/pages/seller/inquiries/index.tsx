import { Head, router } from '@inertiajs/react';
import { MessageSquare, Search } from 'lucide-react';
import { TableActions } from '@/components/table-actions';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

interface Inquiry {
    id: string;
    buyer: { id: string; full_name: string };
    listing: { id: string; make: { name: string }; model: { name: string } };
    message: string;
    status: string;
    sent_at: string | null;
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    new: 'default',
    read: 'secondary',
    replied: 'outline',
    archived: 'secondary',
};

export default function SellerInquiries({ inquiries, filters }: { inquiries: any; filters: { search?: string; status?: string } }) {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get(seller.inquiries.index().url, { ...filters, search: e.target.value }, { preserveState: true, replace: true });
    };

    const handleStatusFilter = (value: string) => {
        router.get(seller.inquiries.index().url, { ...filters, status: value }, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="Inquiries" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Inquiries</h1>
                        <p className="text-sm text-muted-foreground">Questions from buyers about your listings</p>
                    </div>
                </div>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>All Inquiries</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex gap-2">
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search buyer or listing..."
                                    defaultValue={filters.search ?? ''}
                                    onChange={handleSearch}
                                    className="pl-8"
                                />
                            </div>
                            <Select value={filters.status ?? ''} onValueChange={handleStatusFilter}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="All statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value=" ">All</SelectItem>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="read">Read</SelectItem>
                                    <SelectItem value="replied">Replied</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Buyer</TableHead>
                                    <TableHead>Listing</TableHead>
                                    <TableHead>Message</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inquiries.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            <MessageSquare className="mx-auto mb-2 size-8 opacity-50" />
                                            No inquiries yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    inquiries.data.map((inquiry: Inquiry) => (
                                        <TableRow key={inquiry.id}>
                                            <TableCell className="font-medium">{inquiry.buyer.full_name}</TableCell>
                                            <TableCell className="text-sm">
                                                {inquiry.listing.make.name} {inquiry.listing.model.name}
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                                                {inquiry.message}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={statusVariant[inquiry.status] ?? 'secondary'} className="capitalize">
                                                    {inquiry.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {inquiry.sent_at ? new Date(inquiry.sent_at).toLocaleDateString() : '-'}
                                            </TableCell>
                                            <TableCell>
                                                <TableActions
                                                    actions={[
                                                        { label: 'View', href: seller.inquiries.show(inquiry.id) },
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

SellerInquiries.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Inquiries', href: seller.inquiries.index() },
    ],
};
