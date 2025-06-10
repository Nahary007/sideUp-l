<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;

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

        // Mapping des noms de champs JS → Laravel
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

        return response()->json(['message' => 'Réservation enregistrée avec succès.'], 201);
    }
}

