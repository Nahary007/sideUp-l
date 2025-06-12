<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => 'nullable|string|max:50',
            'service' => 'required|string|max:100',
            'message' => 'required|string',
        ]);

        $message = ContactMessage::create($data);

        return response()->json([
            'success'  => true,
            'message'  => 'Merci pour votre message ! Nous vous contacterons très prochainement.',
            'data'     => $message,
        ], 201);
    }
}

