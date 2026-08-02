<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query();

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->has('featured') && $request->featured === 'true') {
            $query->where('is_featured', true);
        }

        $projects = $query->latest()->get();

        return response()->json([
            'status' => 'success',
            'data' => $projects
        ]);
    }

    public function show($slug)
    {
        $project = Project::where('slug', $slug)->orWhere('id', $slug)->firstOrFail();
        return response()->json([
            'status' => 'success',
            'data' => $project
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'summary_ar' => 'required|string',
            'summary_en' => 'required|string',
            'description_ar' => 'required|string',
            'description_en' => 'required|string',
            'category' => 'required|string',
            'tech_stack' => 'nullable',
            'cover_image' => 'nullable|string',
            'architecture_diagram' => 'nullable|string',
            'live_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'is_featured' => 'nullable',
        ]);

        if (is_string($request->input('tech_stack'))) {
            $validated['tech_stack'] = array_map('trim', explode(',', $request->input('tech_stack')));
        } elseif (!is_array($request->input('tech_stack'))) {
            $validated['tech_stack'] = [];
        }

        if ($request->hasFile('cover_image_file')) {
            $request->validate(['cover_image_file' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096']);
            $file = $request->file('cover_image_file');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/projects'), $filename);
            $validated['cover_image'] = '/uploads/projects/' . $filename;
        }

        $validated['slug'] = Str::slug($validated['title_en']);

        $project = Project::create($validated);
        return response()->json(['status' => 'success', 'data' => $project], 201);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title_ar' => 'sometimes|string|max:255',
            'title_en' => 'sometimes|string|max:255',
            'summary_ar' => 'sometimes|string',
            'summary_en' => 'sometimes|string',
            'description_ar' => 'sometimes|string',
            'description_en' => 'sometimes|string',
            'category' => 'sometimes|string',
            'tech_stack' => 'nullable',
            'cover_image' => 'nullable|string',
            'architecture_diagram' => 'nullable|string',
            'live_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'is_featured' => 'nullable',
        ]);

        if ($request->has('tech_stack')) {
            if (is_string($request->input('tech_stack'))) {
                $validated['tech_stack'] = array_map('trim', explode(',', $request->input('tech_stack')));
            } elseif (!is_array($request->input('tech_stack'))) {
                $validated['tech_stack'] = [];
            }
        }

        if ($request->hasFile('cover_image_file')) {
            $request->validate(['cover_image_file' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096']);
            $file = $request->file('cover_image_file');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/projects'), $filename);
            $validated['cover_image'] = '/uploads/projects/' . $filename;
        }

        if (isset($validated['title_en'])) {
            $validated['slug'] = Str::slug($validated['title_en']);
        }

        $project->update($validated);
        return response()->json(['status' => 'success', 'data' => $project]);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(['status' => 'success', 'message' => 'Project deleted']);
    }
}
