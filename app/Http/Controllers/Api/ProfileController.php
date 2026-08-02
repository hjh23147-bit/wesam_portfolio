<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    private function defaultProfileData()
    {
        return [
            'name_ar' => 'وسام وليد النظاري',
            'name_en' => 'Wesam Waleed Al-Nathari',
            'title_ar' => 'مهندس أنظمة، مطور واجهات ومطوّر حلول ذكية',
            'title_en' => 'Systems Architect, Frontend & AI Solutions Engineer',
            'bio_ar' => 'متخصص في بناء منصات الويب الحديثة عالية الأداء، تصميم معمارية الأنظمة الموزعة، دمج حلول الذكاء الاصطناعي، وتأمين البنى التحتية البرمجية.',
            'bio_en' => 'Specialized in building high-performance modern web platforms, designing resilient distributed architectures, integrating AI solutions, and hardening enterprise applications.',
            'email' => 'wesam@alnathari.tech',
            'phone' => '+967 770 000 000',
            'location_ar' => 'الجمهورية اليمنية',
            'location_en' => 'Yemen',
            'avatar' => null,
            'github_url' => 'https://github.com/wesam',
            'linkedin_url' => 'https://linkedin.com/in/wesam',
            'twitter_url' => 'https://twitter.com/wesam',
            'whatsapp_url' => 'https://wa.me/967770000000',
            'facebook_url' => 'https://facebook.com/wesam',
            'cv_url' => '/CV_Wesam_Alnathari.pdf',
        ];
    }

    public function show()
    {
        $profile = Profile::first();

        if (!$profile) {
            $profile = Profile::create($this->defaultProfileData());
        }

        return response()->json([
            'status' => 'success',
            'data' => $profile
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name_ar' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'bio_ar' => 'required|string',
            'bio_en' => 'required|string',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:255',
            'location_ar' => 'nullable|string|max:255',
            'location_en' => 'nullable|string|max:255',
            'avatar' => 'nullable',
            'github_url' => 'nullable|string|max:255',
            'linkedin_url' => 'nullable|string|max:255',
            'twitter_url' => 'nullable|string|max:255',
            'whatsapp_url' => 'nullable|string|max:255',
            'facebook_url' => 'nullable|string|max:255',
            'cv_url' => 'nullable|string|max:255',
        ]);

        $profile = Profile::first();
        if (!$profile) {
            $profile = new Profile();
        }

        // Handle File Upload if avatar is uploaded as file
        if ($request->hasFile('avatar_file')) {
            $request->validate(['avatar_file' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096']);
            $file = $request->file('avatar_file');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/profile'), $filename);
            $validated['avatar'] = '/uploads/profile/' . $filename;
        }

        $profile->fill($validated);
        $profile->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully',
            'data' => $profile
        ]);
    }
}
