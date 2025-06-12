@extends('admin.layout')

@section('title', 'Gestion des réservations')
@section('page-title', 'Gestion des réservations')

@section('content')
<div class="bg-white rounded-lg shadow">
    <div class="p-6 border-b">
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800">Liste des réservations</h3>
            <div class="flex space-x-2">
                <select id="statusFilter" class="border rounded px-3 py-1 text-sm">
                    <option value="">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmées</option>
                    <option value="cancelled">Annulées</option>
                </select>
            </div>
        </div>
    </div>

    <div class="overflow-x-auto">
        <table class="w-full">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Heure</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @foreach($reservations as $reservation)
                    <tr class="hover:bg-gray-50" data-status="{{ $reservation->status }}">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div>
                                <div class="text-sm font-medium text-gray-900">
                                    {{ $reservation->first_name }} {{ $reservation->last_name }}
                                </div>
                                <div class="text-sm text-gray-500">{{ $reservation->email }}</div>
                                <div class="text-sm text-gray-500">{{ $reservation->phone }}</div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ $reservation->service }}</div>
                            @if($reservation->duration)
                                <div class="text-sm text-gray-500">{{ $reservation->duration }}</div>
                            @endif
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ \Carbon\Carbon::parse($reservation->date)->format('d/m/Y') }}</div>
                            <div class="text-sm text-gray-500">{{ $reservation->time }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ $reservation->location }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                {{ $reservation->status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                   ($reservation->status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800') }}">
                                {{ ucfirst($reservation->status) }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onclick="openReservationModal({{ $reservation->id }})" 
                                    class="text-blue-600 hover:text-blue-900 mr-3">
                                <i class="fas fa-edit"></i> Gérer
                            </button>
                            <button onclick="viewReservationDetails({{ $reservation->id }})" 
                                    class="text-gray-600 hover:text-gray-900">
                                <i class="fas fa-eye"></i> Voir
                            </button>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="px-6 py-4 border-t">
        {{ $reservations->links() }}
    </div>
</div>

<!-- Modal de gestion de réservation -->
<div id="reservationModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 hidden z-50">
    <div class="flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div class="p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Gérer la réservation</h3>
                <form id="reservationForm">
                    <input type="hidden" id="reservationId">
                    
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                        <select id="reservationStatus" class="w-full border rounded px-3 py-2">
                            <option value="pending">En attente</option>
                            <option value="confirmed">Confirmée</option>
                            <option value="cancelled">Annulée</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Notes administratives</label>
                        <textarea id="adminNotes" rows="3" class="w-full border rounded px-3 py-2" 
                                  placeholder="Notes internes (optionnel)"></textarea>
                    </div>

                    <div class="flex justify-end space-x-3">
                        <button type="button" onclick="closeReservationModal()" 
                                class="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50">
                            Annuler
                        </button>
                        <button type="submit" 
                                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Modal de détails de réservation -->
<div id="detailsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 hidden z-50">
    <div class="flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div class="p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Détails de la réservation</h3>
                <div id="reservationDetails"></div>
                <div class="flex justify-end mt-6">
                    <button onclick="closeDetailsModal()" 
                            class="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50">
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
// Filtrage par statut
document.getElementById('statusFilter').addEventListener('change', function() {
    const selectedStatus = this.value;
    const rows = document.querySelectorAll('tbody tr[data-status]');
    
    rows.forEach(row => {
        if (selectedStatus === '' || row.dataset.status === selectedStatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Données des réservations pour les modals
const reservations = @json($reservations->items());

function openReservationModal(id) {
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
        document.getElementById('reservationId').value = id;
        document.getElementById('reservationStatus').value = reservation.status;
        document.getElementById('adminNotes').value = reservation.admin_notes || '';
        document.getElementById('reservationModal').classList.remove('hidden');
    }
}

function closeReservationModal() {
    document.getElementById('reservationModal').classList.add('hidden');
}

function viewReservationDetails(id) {
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
        const details = `
            <div class="space-y-3">
                <div><strong>Client:</strong> ${reservation.first_name} ${reservation.last_name}</div>
                <div><strong>Email:</strong> ${reservation.email}</div>
                <div><strong>Téléphone:</strong> ${reservation.phone}</div>
                <div><strong>Service:</strong> ${reservation.service}</div>
                <div><strong>Date:</strong> ${new Date(reservation.date).toLocaleDateString('fr-FR')}</div>
                <div><strong>Heure:</strong> ${reservation.time}</div>
                <div><strong>Durée:</strong> ${reservation.duration || 'Non spécifiée'}</div>
                <div><strong>Lieu:</strong> ${reservation.location}</div>
                <div><strong>Statut:</strong> <span class="px-2 py-1 text-xs rounded-full ${
                    reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                    (reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800')
                }">${reservation.status}</span></div>
                ${reservation.message ? `<div><strong>Message:</strong> ${reservation.message}</div>` : ''}
                ${reservation.admin_notes ? `<div><strong>Notes admin:</strong> ${reservation.admin_notes}</div>` : ''}
                <div><strong>Créée le:</strong> ${new Date(reservation.created_at).toLocaleDateString('fr-FR')} à ${new Date(reservation.created_at).toLocaleTimeString('fr-FR')}</div>
            </div>
        `;
        document.getElementById('reservationDetails').innerHTML = details;
        document.getElementById('detailsModal').classList.remove('hidden');
    }
}

function closeDetailsModal() {
    document.getElementById('detailsModal').classList.add('hidden');
}

// Soumission du formulaire de gestion
document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = document.getElementById('reservationId').value;
    const status = document.getElementById('reservationStatus').value;
    const adminNotes = document.getElementById('adminNotes').value;
    
    axios.put(`/admin/reservations/${id}/status`, {
        status: status,
        admin_notes: adminNotes
    })
    .then(response => {
        if (response.data.success) {
            location.reload();
        }
    })
    .catch(error => {
        alert('Erreur lors de la mise à jour');
        console.error(error);
    });
});
</script>
@endpush