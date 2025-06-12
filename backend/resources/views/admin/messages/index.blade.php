@extends('admin.layout')

@section('title', 'Gestion des messages')
@section('page-title', 'Gestion des messages')

@section('content')
<div class="bg-white rounded-lg shadow">
    <div class="p-6 border-b">
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800">Messages de contact</h3>
            <div class="flex space-x-2">
                <select id="readFilter" class="border rounded px-3 py-1 text-sm">
                    <option value="">Tous les messages</option>
                    <option value="unread">Non lus</option>
                    <option value="read">Lus</option>
                </select>
            </div>
        </div>
    </div>

    <div class="overflow-x-auto">
        <table class="w-full">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @foreach($messages as $message)
                    <tr class="hover:bg-gray-50 {{ !$message->is_read ? 'bg-blue-50' : '' }}" 
                        data-read="{{ $message->is_read ? 'read' : 'unread' }}">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div>
                                <div class="flex items-center">
                                    <div class="text-sm font-medium text-gray-900">{{ $message->name }}</div>
                                    @if(!$message->is_read)
                                        <span class="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                                    @endif
                                </div>
                                <div class="text-sm text-gray-500">{{ $message->email }}</div>
                                @if($message->phone)
                                    <div class="text-sm text-gray-500">{{ $message->phone }}</div>
                                @endif
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ $message->service }}
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-900 max-w-xs truncate">
                                {{ Str::limit($message->message, 100) }}
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ $message->created_at->format('d/m/Y H:i') }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                {{ $message->is_read ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' }}">
                                {{ $message->is_read ? 'Lu' : 'Non lu' }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onclick="viewMessage({{ $message->id }})" 
                                    class="text-blue-600 hover:text-blue-900 mr-3">
                                <i class="fas fa-eye"></i> Voir
                            </button>
                            @if(!$message->is_read)
                                <button onclick="markAsRead({{ $message->id }})" 
                                        class="text-green-600 hover:text-green-900 mr-3">
                                    <i class="fas fa-check"></i> Marquer lu
                                </button>
                            @endif
                            <button onclick="deleteMessage({{ $message->id }})" 
                                    class="text-red-600 hover:text-red-900">
                                <i class="fas fa-trash"></i> Supprimer
                            </button>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="px-6 py-4 border-t">
        {{ $messages->links() }}
    </div>
</div>

<!-- Modal de visualisation du message -->
<div id="messageModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 hidden z-50">
    <div class="flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div class="p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Détails du message</h3>
                <div id="messageDetails"></div>
                <div class="flex justify-end space-x-3 mt-6">
                    <button onclick="closeMessageModal()" 
                            class="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50">
                        Fermer
                    </button>
                    <a id="replyButton" href="#" 
                       class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Répondre par email
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
// Filtrage par statut de lecture
document.getElementById('readFilter').addEventListener('change', function() {
    const selectedFilter = this.value;
    const rows = document.querySelectorAll('tbody tr[data-read]');
    
    rows.forEach(row => {
        if (selectedFilter === '' || row.dataset.read === selectedFilter) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Données des messages pour les modals
const messages = @json($messages->items());

function viewMessage(id) {
    const message = messages.find(m => m.id === id);
    if (message) {
        const details = `
            <div class="space-y-3">
                <div><strong>Nom:</strong> ${message.name}</div>
                <div><strong>Email:</strong> ${message.email}</div>
                ${message.phone ? `<div><strong>Téléphone:</strong> ${message.phone}</div>` : ''}
                <div><strong>Service:</strong> ${message.service}</div>
                <div><strong>Date:</strong> ${new Date(message.created_at).toLocaleDateString('fr-FR')} à ${new Date(message.created_at).toLocaleTimeString('fr-FR')}</div>
                <div><strong>Message:</strong></div>
                <div class="bg-gray-50 p-3 rounded border">${message.message}</div>
            </div>
        `;
        document.getElementById('messageDetails').innerHTML = details;
        document.getElementById('replyButton').href = `mailto:${message.email}?subject=Re: ${message.service}`;
        document.getElementById('messageModal').classList.remove('hidden');
        
        // Marquer comme lu automatiquement
        if (!message.is_read) {
            markAsRead(id);
        }
    }
}

function closeMessageModal() {
    document.getElementById('messageModal').classList.add('hidden');
}

function markAsRead(id) {
    axios.put(`/admin/messages/${id}/read`)
    .then(response => {
        if (response.data.success) {
            location.reload();
        }
    })
    .catch(error => {
        alert('Erreur lors de la mise à jour');
        console.error(error);
    });
}

function deleteMessage(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
        axios.delete(`/admin/messages/${id}`)
        .then(response => {
            if (response.data.success) {
                location.reload();
            }
        })
        .catch(error => {
            alert('Erreur lors de la suppression');
            console.error(error);
        });
    }
}
</script>
@endpush