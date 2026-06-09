<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\SellerReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $sellerId = auth()->id();

        $reviews = SellerReview::with(['reviewer', 'listing.make', 'listing.model'])
            ->where('seller_id', $sellerId)
            ->latest()
            ->paginate(15);

        $stats = SellerReview::where('seller_id', $sellerId)
            ->selectRaw('
                COUNT(*) as total_reviews,
                AVG(rating) as avg_rating,
                AVG(communication_rating) as avg_communication,
                AVG(accuracy_rating) as avg_accuracy
            ')
            ->first();

        $ratingBreakdown = SellerReview::where('seller_id', $sellerId)
            ->select('rating', DB::raw('COUNT(*) as count'))
            ->groupBy('rating')
            ->orderBy('rating', 'desc')
            ->get()
            ->keyBy('rating');

        return Inertia::render('seller/reviews/index', [
            'reviews' => $reviews,
            'stats' => [
                'total_reviews' => (int) ($stats->total_reviews ?? 0),
                'avg_rating' => round((float) ($stats->avg_rating ?? 0), 1),
                'avg_communication' => round((float) ($stats->avg_communication ?? 0), 1),
                'avg_accuracy' => round((float) ($stats->avg_accuracy ?? 0), 1),
            ],
            'rating_breakdown' => $ratingBreakdown,
        ]);
    }
}
