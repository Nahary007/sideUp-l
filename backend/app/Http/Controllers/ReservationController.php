<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationConfirmation;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'service' => 'required|string',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|string',
            'duration' => 'nullable|string',
            'location' => 'required|string',
            'message' => 'nullable|string',
            'acceptTerms' => 'required|boolean|in:1,true',
        ]);


        $existingReservation = Reservation::where('date', $validated['date'])
        ->where('time', $validated['time'])
       ->first();

        if ($existingReservation) {
            return response()->json([
                'message' => 'Cette heure est déjà prise.',
                'error' => 'time_slot_taken'
            ], 409); // 409 Conflict
        }

        // Enregistrer la réservation en base
        $reservation = Reservation::create([
            'first_name' => $validated['firstName'],
            'last_name' => $validated['lastName'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'service' => $validated['service'],
            'date' => $validated['date'],
            'time' => $validated['time'],
            'duration' => $validated['duration'] ?? null,
            'location' => $validated['location'],
            'message' => $validated['message'] ?? null,
            'accept_terms' => true,
        ]);

        // Envoyer l'e-mail de confirmation
        Mail::to($validated['email'])->send(new ReservationConfirmation($validated));

        return response()->json(['message' => 'Réservation enregistrée avec succès et email envoyé.'], 201);
    }
}
