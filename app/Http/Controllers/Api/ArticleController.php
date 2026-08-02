<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::where('is_published', true);

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title_ar', 'like', "%{$search}%")
                  ->orWhere('title_en', 'like', "%{$search}%")
                  ->orWhere('summary_ar', 'like', "%{$search}%")
                  ->orWhere('summary_en', 'like', "%{$search}%");
            });
        }

        $articles = $query->latest('published_at')->get();

        return response()->json([
            'status' => 'success',
            'data' => $articles
        ]);
    }

    public function show($slug)
    {
        $article = Article::where('slug', $slug)->orWhere('id', $slug)->firstOrFail();
        return response()->json([
            'status' => 'success',
            'data' => $article
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'summary_ar' => 'required|string',
            'summary_en' => 'required|string',
            'content_ar' => 'required|string',
            'content_en' => 'required|string',
            'category' => 'required|string',
            'cover_image' => 'nullable|string',
            'read_time_minutes' => 'nullable|integer',
            'is_published' => 'nullable',
        ]);

        if ($request->hasFile('cover_image_file')) {
            $request->validate(['cover_image_file' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096']);
            $file = $request->file('cover_image_file');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/articles'), $filename);
            $validated['cover_image'] = '/uploads/articles/' . $filename;
        }

        $validated['slug'] = Str::slug($validated['title_en']);
        $validated['published_at'] = now();

        $article = Article::create($validated);
        return response()->json(['status' => 'success', 'data' => $article], 201);
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title_ar' => 'sometimes|string|max:255',
            'title_en' => 'sometimes|string|max:255',
            'summary_ar' => 'sometimes|string',
            'summary_en' => 'sometimes|string',
            'content_ar' => 'sometimes|string',
            'content_en' => 'sometimes|string',
            'category' => 'sometimes|string',
            'cover_image' => 'nullable|string',
            'read_time_minutes' => 'nullable|integer',
            'is_published' => 'nullable',
        ]);

        if ($request->hasFile('cover_image_file')) {
            $request->validate(['cover_image_file' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096']);
            $file = $request->file('cover_image_file');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/articles'), $filename);
            $validated['cover_image'] = '/uploads/articles/' . $filename;
        }

        if (isset($validated['title_en'])) {
            $validated['slug'] = Str::slug($validated['title_en']);
        }

        $article->update($validated);
        return response()->json(['status' => 'success', 'data' => $article]);
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(['status' => 'success', 'message' => 'Article deleted']);
    }
}
