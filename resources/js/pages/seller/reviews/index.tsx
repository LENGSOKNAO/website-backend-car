import { Head } from '@inertiajs/react';
import { Star, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import seller from '@/routes/seller';

interface Review {
    id: string;
    reviewer: { id: string; full_name: string; avatar_url?: string | null };
    listing: { id: string; make: { name: string }; model: { name: string } } | null;
    rating: number;
    communication_rating: number | null;
    accuracy_rating: number | null;
    comment: string | null;
    is_verified_purchase: boolean;
    created_at: string;
}

interface RatingBreakdown {
    [key: string]: { rating: number; count: number };
}

export default function SellerReviews({
    reviews,
    stats,
    rating_breakdown,
}: {
    reviews: any;
    stats: { total_reviews: number; avg_rating: number; avg_communication: number; avg_accuracy: number };
    rating_breakdown: RatingBreakdown;
}) {
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`size-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
        ));
    };

    return (
        <>
            <Head title="Reviews & Ratings" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Reviews & Ratings</h1>
                        <p className="text-sm text-muted-foreground">See what buyers are saying about you</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold">{stats.avg_rating}</span>
                                <span className="text-muted-foreground">/ 5</span>
                            </div>
                            <div className="flex mt-1">{renderStars(Math.round(stats.avg_rating))}</div>
                            <p className="text-xs text-muted-foreground mt-1">{stats.total_reviews} reviews</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Communication</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold">{stats.avg_communication || '-'}</span>
                                <span className="text-muted-foreground">/ 5</span>
                            </div>
                            <div className="flex mt-1">{renderStars(Math.round(stats.avg_communication || 0))}</div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold">{stats.avg_accuracy || '-'}</span>
                                <span className="text-muted-foreground">/ 5</span>
                            </div>
                            <div className="flex mt-1">{renderStars(Math.round(stats.avg_accuracy || 0))}</div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{stats.total_reviews}</div>
                            <p className="text-xs text-muted-foreground mt-1">Verified feedback</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Rating Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const item = rating_breakdown[star];
                            const count = item?.count ?? 0;
                            const pct = stats.total_reviews > 0 ? (count / stats.total_reviews) * 100 : 0;

                            return (
                                <div key={star} className="flex items-center gap-2">
                                    <span className="w-12 text-sm">{star} stars</span>
                                    <div className="flex-1 h-2 rounded-full bg-muted">
                                        <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                                    </div>
                                    <span className="w-8 text-right text-sm text-muted-foreground">{count}</span>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">All Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Reviewer</TableHead>
                                    <TableHead>Listing</TableHead>
                                    <TableHead>Rating</TableHead>
                                    <TableHead>Comment</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reviews.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            <MessageSquare className="mx-auto mb-2 size-8 opacity-50" />
                                            No reviews yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    reviews.data.map((review: Review) => (
                                        <TableRow key={review.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="size-7">
                                                        <AvatarImage src={review.reviewer.avatar_url ?? undefined} />
                                                        <AvatarFallback className="text-xs">
                                                            {review.reviewer.full_name.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-medium">{review.reviewer.full_name}</span>
                                                    {review.is_verified_purchase && (
                                                        <Badge variant="outline" className="text-[10px] px-1 py-0">Verified</Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {review.listing ? `${review.listing.make.name} ${review.listing.model.name}` : '-'}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex">{renderStars(review.rating)}</div>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                                                {review.comment ?? '-'}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(review.created_at).toLocaleDateString()}
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

SellerReviews.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Reviews', href: seller.reviews.index() },
    ],
};
