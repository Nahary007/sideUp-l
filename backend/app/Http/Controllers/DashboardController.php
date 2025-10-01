<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\ContactMessage;
use App\Models\Service; 
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function getStats()
    {
        return response()->json([
            'totalReservations' => Reservation::count(),

            // en attente
            'pendingReservations' => Reservation::where('status_reservations', 'pending')->count(),

            // confirmées
            'confirmedReservations' => Reservation::where('status_reservations', 'confirmed')->count(),

            // messages non lus
            'newMessages' => ContactMessage::where('status', 'en attente')->count(),

            // sessions complétées
            'completedSessions' => Reservation::where('status_reservations', 'completed')->count(),

            // formules confirmées
            'activeFormulas' => Service::where('is_active', true)
                                    ->where('is_package', true)
                                    ->count(),
        ]);
    }

    public function getRecentReservations()
    {
        return response()->json(
            Reservation::latest('created_at')
                ->take(5)
                ->get()
                ->map(function ($r) {
                    return [
                        'id'         => $r->id,
                        'clientName' => $r->client_name,
                        'service'    => $r->service,
                        'date'       => $r->date->format('d/m/Y'),
                        'time'       => $r->time,
                        'duration'   => $r->duration,
                        'location'   => $r->location,
                        'status'     => $r->status_reservations,
                    ];
                })
        );
    }

    public function getServiceOverview()
    {
        $monthStart = Carbon::now()->startOfMonth();
        $monthEnd   = Carbon::now()->endOfMonth();
        $services   = ['coaching', 'sophrologie', 'massage', 'formule'];

        $overview = collect($services)->map(function ($svc) use ($monthStart, $monthEnd) {
            $count = Reservation::where('service', $svc)
                        ->whereBetween('date', [$monthStart, $monthEnd])
                        ->whereIn('status_reservations', ['confirmed', 'completed'])
                        ->count();

            return [
                'name'  => ucfirst($svc),
                'slug'  => $svc,
                'count' => $count,
            ];
        });

        return response()->json($overview);
    }
}
