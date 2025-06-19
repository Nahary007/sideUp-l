<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function index(): JsonResponse
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();
        return response()->json($messages);
    }


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

    public function markAsRead($id): JsonResponse
    {
        $message = ContactMessage::findOrFail($id);

        if ($message->status === 'new') {
            $message->status = 'read';
            $message->save();
        }

        return response()->json($message);
    }

    public function reply(Request $request, $id): JsonResponse
    {
        $message = ContactMessage::findOrFail($id);

        $validated = $request->validate([
            'reply' => 'required|string',
        ]);

        $message->reply = $validated['reply'];
        $message->status = 'replied';
        $message->replied_at = now();
        $message->save();

        return response()->json($message);
    }


}

