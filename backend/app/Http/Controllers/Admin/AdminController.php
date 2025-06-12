<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationStatusUpdate;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_reservations' => Reservation::count(),
            'pending_reservations' => Reservation::where('status', 'pending')->count(),
            'confirmed_reservations' => Reservation::where('status', 'confirmed')->count(),
            'total_messages' => ContactMessage::count(),
            'unread_messages' => ContactMessage::where('is_read', false)->count(),
        ];

        $recent_reservations = Reservation::latest()->take(5)->get();
        $recent_messages = ContactMessage::latest()->take(5)->get();

        return view('admin.dashboard', compact('stats', 'recent_reservations', 'recent_messages'));
    }

    public function reservations()
    {
        $reservations = Reservation::latest()->paginate(20);
        return view('admin.reservations.index', compact('reservations'));
    }

    public function updateReservationStatus(Request $request, Reservation $reservation)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
            'admin_notes' => 'nullable|string'
        ]);

        $oldStatus = $reservation->status;
        $reservation->update([
            'status' => $request->status,
            'admin_notes' => $request->admin_notes
        ]);

        // Envoyer un email si le statut a changé
        if ($oldStatus !== $request->status) {
            Mail::to($reservation->email)->send(new ReservationStatusUpdate($reservation));
        }

        return response()->json([
            'success' => true,
            'message' => 'Statut de la réservation mis à jour avec succès.'
        ]);
    }

    public function messages()
    {
        $messages = ContactMessage::latest()->paginate(20);
        return view('admin.messages.index', compact('messages'));
    }

    public function markMessageAsRead(ContactMessage $message)
    {
        $message->update(['is_read' => true]);
        
        return response()->json([
            'success' => true,
            'message' => 'Message marqué comme lu.'
        ]);
    }

    public function deleteMessage(ContactMessage $message)
    {
        $message->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Message supprimé avec succès.'
        ]);
    }

    public function pricing()
    {
        // Pour l'instant, on retourne une vue statique
        // Plus tard, on pourra créer un modèle pour gérer les tarifs en base
        return view('admin.pricing.index');
    }
}