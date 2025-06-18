<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationConfirmation;
use App\Mail\ReservationConfirmed;
use App\Mail\ReservationCancelled;

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
            ], 409);
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
            'status_reservations' => 'pending', // Statut par défaut
        ]);

        // Envoyer l'e-mail de confirmation
        try {
            Mail::to($validated['email'])->send(new ReservationConfirmation($validated));
        } catch (\Exception $e) {
            \Log::error('Erreur envoi email: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Réservation enregistrée avec succès.',
            'reservation' => $reservation
        ], 201);
    }

    public function show_all() 
    {
        try {
            $reservations = Reservation::orderBy('created_at', 'desc')->get();
            return response()->json($reservations);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des réservations.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateStatus(Request $request, $id) 
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled,completed',
        ]);

        try {
            $reservation = Reservation::findOrFail($id);
            $reservation->status_reservations = $request->status;
            $reservation->save();

            // Envoyer des emails selon le statut
            try {
                if ($request->status === 'confirmed') {
                    Mail::to($reservation->email)->send(new ReservationConfirmed($reservation));
                }

                if ($request->status === 'cancelled') {
                    Mail::to($reservation->email)->send(new ReservationCancelled($reservation));
                }
            } catch (\Exception $e) {
                \Log::error('Erreur envoi email statut: ' . $e->getMessage());
            }

            return response()->json([
                'message' => 'Statut mis à jour avec succès.',
                'reservation' => $reservation
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du statut.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}