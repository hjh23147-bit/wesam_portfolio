<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
            'recaptcha_token' => 'nullable|string',
        ]);

        // Google reCAPTCHA Verification (if secret key configured)
        $recaptchaSecret = env('RECAPTCHA_SECRET_KEY');
        if (!empty($recaptchaSecret) && !empty($request->recaptcha_token)) {
            $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret' => $recaptchaSecret,
                'response' => $request->recaptcha_token,
                'remoteip' => $request->ip(),
            ]);

            if (!$response->json('success')) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'reCAPTCHA verification failed. Please try again.'
                ], 422);
            }
        }

        $contact = Contact::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'] ?? 'General Inquiry',
            'message' => $validated['message'],
            'ip_address' => $request->ip(),
            'is_read' => false,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Message sent successfully!',
            'data' => $contact
        ], 201);
    }

    public function index()
    {
        $messages = Contact::latest()->get();
        return response()->json([
            'status' => 'success',
            'data' => $messages
        ]);
    }

    public function markAsRead(Contact $contact)
    {
        $contact->update(['is_read' => true]);
        return response()->json(['status' => 'success', 'data' => $contact]);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return response()->json(['status' => 'success', 'message' => 'Message deleted']);
    }
}
