<?php

namespace App\Http\Controllers;

use App\Models\StoredFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        try {
            $v = Validator::make($request->all(), [
                'file' => 'required|file|max:5120',
            ]);
            if ($v->fails()) {
                return response()->json([
                    'errors' => $v->errors()->all(),
                    'request' => $request->all(),
                    'hasFile' => $request->hasFile('file'),
                    'file' => $request->file('file') ? [
                        'name' => $request->file('file')->getClientOriginalName(),
                        'size' => $request->file('file')->getSize(),
                        'mime' => $request->file('file')->getMimeType(),
                        'realPath' => $request->file('file')->getRealPath(),
                    ] : null,
                ], 422);
            }

            $file = $request->file('file');
            if (!$file) {
                return response()->json(['errors' => ['file' => ['No file found in request']]], 422);
            }

            $data = file_get_contents($file->getRealPath());
            $fileName = $file->getClientOriginalName();
            $mimeType = $file->getMimeType() ?: 'application/octet-stream';

            // Upload to Vercel Blob Storage (store is private)
            $blobToken = env('BLOB_READ_WRITE_TOKEN');
            if (!$blobToken) {
                return response()->json(['errors' => ['Blob storage not configured']], 500);
            }

            $pathname = Str::uuid() . '/' . $fileName;

            // Extract store ID from token
            $parts = explode('_', $blobToken);
            $storeId = $parts[3] ?? '';

            $blobResponse = Http::withToken($blobToken)
                ->withHeaders([
                    'x-api-version' => '12',
                    'x-vercel-blob-store-id' => $storeId,
                    'x-vercel-blob-access' => 'private',
                ])
                ->withBody($data, $mimeType)
                ->put('https://vercel.com/api/blob/?pathname=' . urlencode($pathname));

            if ($blobResponse->failed()) {
                Log::error('Vercel Blob upload failed: ' . $blobResponse->body());
                return response()->json(['errors' => ['Failed to upload to blob storage']], 500);
            }

            $blobResult = $blobResponse->json();
            $blobUrl = $blobResult['url'] ?? null;

            if (!$blobUrl) {
                return response()->json(['errors' => ['Invalid response from blob storage']], 500);
            }

            // Store reference in database
            $id = (string) Str::uuid();
            DB::insert('insert into stored_files (id, original_name, mime_type, size, data) values (?, ?, ?, ?, ?)', [
                $id,
                $fileName,
                $mimeType,
                strlen($data),
                $blobUrl
            ]);

            $stored = StoredFile::find($id);

            return response()->json([
                'url' => '/api/files/' . $id,
                'id' => $stored->id,
                'blob_url' => $blobUrl,
                'blob_pathname' => $blobResult['pathname'] ?? $pathname,
            ]);
        } catch (\Exception $e) {
            Log::error('File upload error: ' . $e->getMessage());
            return response()->json(['errors' => ['Upload failed: ' . $e->getMessage()]], 500);
        }
    }

    public function show(string $id)
    {
        $file = StoredFile::findOrFail($id);

        $data = $file->data;
        if (is_resource($data)) {
            $data = stream_get_contents($data);
        }

        // If we stored a blob URL, fetch it directly with auth
        if (filter_var($data, FILTER_VALIDATE_URL)) {
            $blobToken = env('BLOB_READ_WRITE_TOKEN');
            if (!$blobToken) {
                abort(500, 'Blob storage not configured');
            }

            $blobResponse = Http::withToken($blobToken)
                ->timeout(10)
                ->get($data);

            if ($blobResponse->successful()) {
                return response($blobResponse->body(), 200)
                    ->header('Content-Type', $file->mime_type)
                    ->header('Content-Length', $file->size)
                    ->header('Cache-Control', 'public, s-maxage=86400, max-age=31536000, immutable')
                    ->header('Vercel-CDN-Cache-Control', 'public, max-age=86400');
            }

            abort(404);
        }

        // Fallback to original database storage for backward compatibility
        return response($data, 200)
            ->header('Content-Type', $file->mime_type)
            ->header('Content-Length', $file->size)
            ->header('Cache-Control', 'public, s-maxage=86400, max-age=31536000, immutable')
            ->header('Vercel-CDN-Cache-Control', 'public, max-age=86400');
    }
}
