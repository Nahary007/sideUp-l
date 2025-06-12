@extends('admin.layout')

@section('title', 'Tableau de bord')
@section('page-title', 'Tableau de bord')

@section('content')
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Stats Cards -->
    <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
                <i class="fas fa-calendar-alt text-xl"></i>
            </div>
            <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-800">{{ $stats['total_reservations'] }}</h3>
                <p class="text-gray-600">Total réservations</p>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <i class="fas fa-clock text-xl"></i>
            </div>
            <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-800">{{ $stats['pending_reservations'] }}</h3>
                <p class="text-gray-600">En attente</p>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600">
                <i class="fas fa-check text-xl"></i>
            </div>
            <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-800">{{ $stats['confirmed_reservations'] }}</h3>
                <p class="text-gray-600">Confirmées</p>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 text-purple-600">
                <i class="fas fa-envelope text-xl"></i>
            </div>
            <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-800">{{ $stats['unread_messages'] }}</h3>
                <p class="text-gray-600">Messages non lus</p>
            </div>
        </div>
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Recent Reservations -->
    <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
            <h3 class="text-lg font-semibold text-gray-800">Réservations récentes</h3>
        </div>
        <div class="p-6">
            @if($recent_reservations->count() > 0)
                <div class="space-y-4">
                    @foreach($recent_reservations as $reservation)
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                                <p class="font-medium">{{ $reservation->first_name }} {{ $reservation->last_name }}</p>
                                <p class="text-sm text-gray-600">{{ $reservation->service }} - {{ $reservation->date }} à {{ $reservation->time }}</p>
                            </div>
                            <span class="px-2 py-1 text-xs rounded-full 
                                {{ $reservation->status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                   ($reservation->status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800') }}">
                                {{ ucfirst($reservation->status) }}
                            </span>
                        </div>
                    @endforeach
                </div>
                <div class="mt-4">
                    <a href="{{ route('admin.reservations') }}" class="text-blue-600 hover:text-blue-800">Voir toutes les réservations →</a>
                </div>
            @else
                <p class="text-gray-500">Aucune réservation récente</p>
            @endif
        </div>
    </div>

    <!-- Recent Messages -->
    <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
            <h3 class="text-lg font-semibold text-gray-800">Messages récents</h3>
        </div>
        <div class="p-6">
            @if($recent_messages->count() > 0)
                <div class="space-y-4">
                    @foreach($recent_messages as $message)
                        <div class="flex items-start justify-between p-3 bg-gray-50 rounded">
                            <div class="flex-1">
                                <div class="flex items-center">
                                    <p class="font-medium">{{ $message->name }}</p>
                                    @if(!$message->is_read)
                                        <span class="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                                    @endif
                                </div>
                                <p class="text-sm text-gray-600">{{ $message->service }}</p>
                                <p class="text-sm text-gray-500 mt-1">{{ Str::limit($message->message, 50) }}</p>
                            </div>
                            <span class="text-xs text-gray-400">{{ $message->created_at->diffForHumans() }}</span>
                        </div>
                    @endforeach
                </div>
                <div class="mt-4">
                    <a href="{{ route('admin.messages') }}" class="text-blue-600 hover:text-blue-800">Voir tous les messages →</a>
                </div>
            @else
                <p class="text-gray-500">Aucun message récent</p>
            @endif
        </div>
    </div>
</div>
@endsection