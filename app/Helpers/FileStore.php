<?php

namespace App\Helpers;

use App\Models\StoredFile;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileStore
{
    private static function blobToken(): ?string
    {
        $token = env('BLOB_READ_WRITE_TOKEN');
        return $token ?: null;
    }

    private static function blobStoreId(): ?string
    {
        $token = self::blobToken();
        if (!$token) return null;
        $parts = explode('_', $token);
        return $parts[3] ?? null;
    }

    private static function useBlob(): bool
    {
        $token = self::blobToken();
        return $token !== null && $token !== '';
    }

    public static function store(string $directory, UploadedFile $file): string
    {
        if (self::useBlob()) {
            return self::storeBlob($directory, $file);
        }
        return self::storePublic($directory, $file);
    }

    public static function storeReturningPath(string $directory, UploadedFile $file): string
    {
        return self::store($directory, $file);
    }

    public static function storePublic(string $directory, UploadedFile $file): string
    {
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $path = $directory . '/' . $filename;

        Storage::disk('public')->put($path, file_get_contents($file->getRealPath()));

        return $path;
    }

    private static function storeBlob(string $directory, UploadedFile $file): string
    {
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $path = $directory . '/' . $filename;

        $response = Http::withToken(self::blobToken())
            ->withHeaders([
                'x-api-version' => '12',
                'x-vercel-blob-store-id' => self::blobStoreId(),
                'x-vercel-blob-access' => 'private',
            ])
            ->withBody(
                file_get_contents($file->getRealPath()),
                $file->getMimeType() ?: 'application/octet-stream'
            )
            ->put('https://vercel.com/api/blob/?pathname=' . urlencode($path));

        if (!$response->successful()) {
            throw new \RuntimeException('Vercel Blob upload failed: ' . $response->body());
        }

        $result = $response->json();
        $blobUrl = $result['url'];

        $stored = StoredFile::create([
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType() ?: 'application/octet-stream',
            'size' => $file->getSize(),
            'data' => $blobUrl,
        ]);

        return '/api/files/' . $stored->id;
    }

    private static function storeDatabase(UploadedFile $file): string
    {
        $stored = StoredFile::create([
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType() ?: 'application/octet-stream',
            'size' => $file->getSize(),
            'data' => file_get_contents($file->getRealPath()),
        ]);

        return '/api/files/' . $stored->id;
    }
}
