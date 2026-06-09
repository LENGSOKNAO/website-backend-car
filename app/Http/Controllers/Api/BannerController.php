<?php

namespace App\Http\Controllers\Api;

use App\Models\Banner;
use App\Models\Hero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BannerController extends ApiController
{
    public function index(Request $request)
    {
        $query = Banner::ordered()->active();

        if ($request->user('api') && $request->boolean('mine')) {
            $query->forUser($request->user('api')->id);
        }

        if ($request->type) {
            $query->byType($request->type);
        }

        if ($request->brand_slug) {
            $query->where('brand_slug', $request->brand_slug);
        }

        if ($request->page) {
            $query->where('page', $request->page);
        }

        $banners = $query->get()->load('user:id,full_name');

        return $this->success($banners);
    }

    public function show(string $id)
    {
        $banner = Banner::with('user:id,full_name')->findOrFail($id);

        return $this->success($banner);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'tagline' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'required|string',
            'link_url' => 'nullable|string',
            'button_text' => 'nullable|string|max:255',
            'button_url' => 'nullable|string',
            'badge_text' => 'nullable|string|max:255',
            'brand_slug' => 'nullable|string|max:100',
            'type' => 'required|string|in:slider,banner,boxTrips,boxone,boxLeft,boxRight,boxTen',
            'page' => 'nullable|string|max:100',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $data = $validator->validated();
        $user = $request->user('api');
        if (!$user) {
            abort(401, 'Not authenticated');
        }
        $data['user_id'] = $user->id;

        $banner = Banner::create($data);
        $banner->load('user:id,full_name');

        return $this->success($banner, 'Banner created', 201);
    }

    public function update(Request $request, string $id)
    {
        $banner = Banner::with('user:id,full_name')->findOrFail($id);

        if ($banner->user_id !== $request->user('api')->id) {
            abort(403, 'Forbidden');
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'tagline' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'sometimes|string',
            'link_url' => 'nullable|string',
            'button_text' => 'nullable|string|max:255',
            'button_url' => 'nullable|string',
            'badge_text' => 'nullable|string|max:255',
            'brand_slug' => 'nullable|string|max:100',
            'type' => 'sometimes|string|in:slider,banner,boxTrips,boxone,boxLeft,boxRight,boxTen',
            'page' => 'nullable|string|max:100',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $banner->update($validator->validated());

        return $this->success($banner->fresh()->load('user:id,full_name'), 'Banner updated');
    }

    public function destroy(Request $request, string $id)
    {
        $banner = Banner::findOrFail($id);

        if ($banner->user_id !== $request->user('api')->id) {
            abort(403, 'Forbidden');
        }

        $banner->delete();

        return $this->success(null, 'Banner deleted');
    }

    public function brand(string $slug)
    {
        $banners = Banner::ordered()->active()->where('brand_slug', $slug)->get();

        $sections = ['slider', 'boxTrips', 'boxone', 'boxTen', 'boxLeft', 'boxRight'];

        $result = [];
        foreach ($sections as $section) {
            $result[$section] = $banners->where('type', $section)->values()->map(function ($b) {
                return [
                    'name' => $b->title,
                    'tagline' => $b->tagline,
                    'description' => $b->description,
                    'image' => $b->image_url,
                    'to' => !is_null($b->button_url),
                    'button' => $b->button_url ? ['text' => $b->button_text, 'url' => $b->button_url] : null,
                    'button_2' => $b->button_url_2 ? ['text' => $b->button_text_2, 'url' => $b->button_url_2] : null,
                ];
            });
        }

        return $this->success($result);
    }

    public function hero()
    {
        $heroes = Hero::ordered()->active()->get();

        return $this->success($heroes);
    }

    public function sliders()
    {
        $sliders = Banner::ordered()->active()
            ->byType('slider')
            ->with('user')
            ->get()
            ->map(fn ($b) => [
                'id' => $b->id,
                'title' => $b->title,
                'subtitle' => $b->subtitle,
                'tagline' => $b->tagline,
                'description' => $b->description,
                'image' => $b->image_url,
                'badge' => $b->badge_text,
                'button_text' => $b->button_text,
                'button_url' => $b->button_url,
                'button_text_2' => $b->button_text_2,
                'button_url_2' => $b->button_url_2,
                'sort_order' => $b->sort_order,
                'user' => $b->user ? [
                    'id' => $b->user->id,
                    'name' => $b->user->full_name,
                    'email' => $b->user->email,
                    'phone' => $b->user->phone,
                    'avatar' => $b->user->avatar_url,
                    'location' => $b->user->location,
                    'dealer_name' => $b->user->dealer_name,
                    'type' => $b->user->type,
                    'is_verified' => $b->user->is_verified,
                    'is_dealer' => $b->user->is_dealer,
                    'created_at' => $b->user->created_at,
                ] : null,
            ]);

        return $this->success($sliders);
    }

    public function boxTrips()
    {
        $boxTrips = Banner::ordered()->active()
            ->byType('boxTrips')
            ->with('user')
            ->get()
            ->map(fn ($b) => [
                'id' => $b->id,
                'title' => $b->title,
                'subtitle' => $b->subtitle,
                'tagline' => $b->tagline,
                'description' => $b->description,
                'image' => $b->image_url,
                'badge' => $b->badge_text,
                'button_text' => $b->button_text,
                'button_url' => $b->button_url,
                'button_text_2' => $b->button_text_2,
                'button_url_2' => $b->button_url_2,
                'sort_order' => $b->sort_order,
                'user' => $b->user ? [
                    'id' => $b->user->id,
                    'name' => $b->user->full_name,
                    'email' => $b->user->email,
                    'phone' => $b->user->phone,
                    'avatar' => $b->user->avatar_url,
                    'location' => $b->user->location,
                    'dealer_name' => $b->user->dealer_name,
                    'type' => $b->user->type,
                    'is_verified' => $b->user->is_verified,
                    'is_dealer' => $b->user->is_dealer,
                    'created_at' => $b->user->created_at,
                ] : null,
            ]);

        return $this->success($boxTrips);
    }

    public function boxOne()
    {
        $boxOne = Banner::ordered()->active()
            ->byType('boxone')
            ->with('user')
            ->get()
            ->map(fn ($b) => [
                'id' => $b->id,
                'title' => $b->title,
                'subtitle' => $b->subtitle,
                'tagline' => $b->tagline,
                'description' => $b->description,
                'image' => $b->image_url,
                'badge' => $b->badge_text,
                'button_text' => $b->button_text,
                'button_url' => $b->button_url,
                'button_text_2' => $b->button_text_2,
                'button_url_2' => $b->button_url_2,
                'sort_order' => $b->sort_order,
                'user' => $b->user ? [
                    'id' => $b->user->id,
                    'name' => $b->user->full_name,
                    'email' => $b->user->email,
                    'phone' => $b->user->phone,
                    'avatar' => $b->user->avatar_url,
                    'location' => $b->user->location,
                    'dealer_name' => $b->user->dealer_name,
                    'type' => $b->user->type,
                    'is_verified' => $b->user->is_verified,
                    'is_dealer' => $b->user->is_dealer,
                    'created_at' => $b->user->created_at,
                ] : null,
            ]);

        return $this->success($boxOne);
    }

    public function boxRight()
    {
        $boxRight = Banner::ordered()->active()
            ->byType('boxRight')
            ->with('user')
            ->get()
            ->map(fn ($b) => [
                'id' => $b->id,
                'title' => $b->title,
                'subtitle' => $b->subtitle,
                'tagline' => $b->tagline,
                'description' => $b->description,
                'image' => $b->image_url,
                'badge' => $b->badge_text,
                'button_text' => $b->button_text,
                'button_url' => $b->button_url,
                'button_text_2' => $b->button_text_2,
                'button_url_2' => $b->button_url_2,
                'sort_order' => $b->sort_order,
                'user' => $b->user ? [
                    'id' => $b->user->id,
                    'name' => $b->user->full_name,
                    'email' => $b->user->email,
                    'phone' => $b->user->phone,
                    'avatar' => $b->user->avatar_url,
                    'location' => $b->user->location,
                    'dealer_name' => $b->user->dealer_name,
                    'type' => $b->user->type,
                    'is_verified' => $b->user->is_verified,
                    'is_dealer' => $b->user->is_dealer,
                    'created_at' => $b->user->created_at,
                ] : null,
            ]);

        return $this->success($boxRight);
    }

    public function boxLeft()
    {
        $boxLeft = Banner::ordered()->active()
            ->byType('boxLeft')
            ->with('user')
            ->get()
            ->map(fn ($b) => [
                'id' => $b->id,
                'title' => $b->title,
                'subtitle' => $b->subtitle,
                'tagline' => $b->tagline,
                'description' => $b->description,
                'image' => $b->image_url,
                'badge' => $b->badge_text,
                'button_text' => $b->button_text,
                'button_url' => $b->button_url,
                'button_text_2' => $b->button_text_2,
                'button_url_2' => $b->button_url_2,
                'sort_order' => $b->sort_order,
                'user' => $b->user ? [
                    'id' => $b->user->id,
                    'name' => $b->user->full_name,
                    'email' => $b->user->email,
                    'phone' => $b->user->phone,
                    'avatar' => $b->user->avatar_url,
                    'location' => $b->user->location,
                    'dealer_name' => $b->user->dealer_name,
                    'type' => $b->user->type,
                    'is_verified' => $b->user->is_verified,
                    'is_dealer' => $b->user->is_dealer,
                    'created_at' => $b->user->created_at,
                ] : null,
            ]);

        return $this->success($boxLeft);
    }

    public function boxTen()
    {
        $boxTen = Banner::ordered()->active()
            ->byType('boxTen')
            ->with('user')
            ->get()
            ->map(fn ($b) => [
                'id' => $b->id,
                'title' => $b->title,
                'subtitle' => $b->subtitle,
                'tagline' => $b->tagline,
                'description' => $b->description,
                'image' => $b->image_url,
                'badge' => $b->badge_text,
                'button_text' => $b->button_text,
                'button_url' => $b->button_url,
                'button_text_2' => $b->button_text_2,
                'button_url_2' => $b->button_url_2,
                'sort_order' => $b->sort_order,
                'user' => $b->user ? [
                    'id' => $b->user->id,
                    'name' => $b->user->full_name,
                    'email' => $b->user->email,
                    'phone' => $b->user->phone,
                    'avatar' => $b->user->avatar_url,
                    'location' => $b->user->location,
                    'dealer_name' => $b->user->dealer_name,
                    'type' => $b->user->type,
                    'is_verified' => $b->user->is_verified,
                    'is_dealer' => $b->user->is_dealer,
                    'created_at' => $b->user->created_at,
                ] : null,
            ]);

        return $this->success($boxTen);
    }
}
