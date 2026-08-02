<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::orderBy('sort_order', 'asc')->get();
        return response()->json([
            'status' => 'success',
            'data' => $skills
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name_ar' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'category' => 'required|string',
            'proficiency' => 'required|integer|min:0|max:100',
            'icon' => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);

        $skill = Skill::create($validated);
        return response()->json(['status' => 'success', 'data' => $skill], 201);
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name_ar' => 'sometimes|string|max:255',
            'name_en' => 'sometimes|string|max:255',
            'category' => 'sometimes|string',
            'proficiency' => 'sometimes|integer|min:0|max:100',
            'icon' => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);

        $skill->update($validated);
        return response()->json(['status' => 'success', 'data' => $skill]);
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return response()->json(['status' => 'success', 'message' => 'Skill deleted']);
    }
}
