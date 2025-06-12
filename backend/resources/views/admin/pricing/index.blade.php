@extends('admin.layout')

@section('title', 'Gestion des tarifs')
@section('page-title', 'Gestion des tarifs')

@section('content')
<div class="space-y-6">
    <!-- Coaching -->
    <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
            <h3 class="text-lg font-semibold text-gray-800">Coaching</h3>
        </div>
        <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="border rounded-lg p-4">
                    <h4 class="font-medium mb-2">Coaching Découverte</h4>
                    <div class="text-2xl font-bold text-blue-600 mb-2">50 €</div>
                    <p class="text-sm text-gray-600 mb-4">Séance d'1h pour faire le point</p>
                    <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Modifier
                    </button>
                </div>
                <div class="border rounded-lg p-4">
                    <h4 class="font-medium mb-2">Coaching Intensif</h4>
                    <div class="text-2xl font-bold text-blue-600 mb-2">500 €</div>
                    <p class="text-sm text-gray-600 mb-4">5 séances personnalisées</p>
                    <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Modifier
                    </button>
                </div>
                <div class="border rounded-lg p-4">
                    <h4 class="font-medium mb-2">Coaching Premium</h4>
                    <div class="text-2xl font-bold text-blue-600 mb-2">900 €</div>
                    <p class="text-sm text-gray-600 mb-4">10 séances personnalisées</p>
                    <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Sophrologie -->
    <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
            <h3 class="text-lg font-semibold text-gray-800">Sophrologie</h3>
        </div>
        <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="border rounded-lg p-4">
                    <h4 class="font-medium mb-2">Séance Découverte</h4>
                    <div class="text-2xl font-bold text-teal-600 mb-2">60 €</div>
                    <p class="text-sm text-gray-600 mb-4">Initiation à la sophrologie</p>
                    <button class="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
                        Modifier
                    </button>
                </div>
                <div class="border rounded-lg p-4">
                    <h4 class="font-medium mb-2">Programme de Relaxation</h4>
                    <div class="text-2xl font-bold text-teal-600 mb-2">360 €</div>
                    <p class="text-sm text-gray-600 mb-4">6 séances de relaxation</p>
                    <button class="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
                        Modifier
                    </button>
                </div>
                <div class="border rounded-lg p-4">
                    <h4 class="font-medium mb-2">Coaching Sophrologique</h4>
                    <div class="text-2xl font-bold text-teal-600 mb-2">550 €</div>
                    <p class="text-sm text-gray-600 mb-4">10 séances adaptées</p>
                    <button class="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Massage -->
    <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
            <h3 class="text-lg font-semibold text-gray-800">Massage Bien-Être</h3>
        </div>
        <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="border rounded-lg p-4">
                    <h4 class="font-medium mb-2">Massage des 5 Continents</h4>
                    <div class="text-2xl font-bold text-orange-600 mb-2">95 €</div>
                    <p class="text-sm text-gray-600 mb-4">Séance de 1h15</p>
                    <button class="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Formules Combinées -->
    <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
            <h3 class="text-lg font-semibold text-gray-800">Formules Combinées</h3>
        </div>
        <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="border rounded-lg p-4">
                    <h4 class="font-medium mb-2">Équilibre & Performance</h4>
                    <div class="text-2xl font-bold text-purple-600 mb-2">750 €</div>
                    <p class="text-sm text-gray-600 mb-4">5 séances sophrologie + coaching</p>
                    <button class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                        Modifier
                    </button>
                </div>
                <div class="border rounded-lg p-4">
                    <h4 class="font-medium mb-2">Coaching + Sophrologie Intensif</h4>
                    <div class="text-2xl font-bold text-purple-600 mb-2">1500 €</div>
                    <p class="text-sm text-gray-600 mb-4">10 séances complètes</p>
                    <button class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Tarifs supplémentaires -->
    <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
            <h3 class="text-lg font-semibold text-gray-800">Tarifs supplémentaires</h3>
        </div>
        <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="border rounded-lg p-4">
                    <h4 class="font-medium mb-2">Déplacement à domicile</h4>
                    <div class="text-2xl font-bold text-gray-600 mb-2">+20 €</div>
                    <p class="text-sm text-gray-600 mb-4">Supplément pour les séances à domicile</p>
                    <button class="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
                        Modifier
                    </button>
                </div>
                <div class="border rounded-lg p-4">
                    <h4 class="font-medium mb-2">Location bureau (heure)</h4>
                    <div class="text-2xl font-bold text-gray-600 mb-2">15 €</div>
                    <p class="text-sm text-gray-600 mb-4">Location d'espace de 12m²</p>
                    <button class="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Note d'information -->
<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
    <div class="flex">
        <div class="flex-shrink-0">
            <i class="fas fa-info-circle text-blue-400"></i>
        </div>
        <div class="ml-3">
            <h3 class="text-sm font-medium text-blue-800">Information</h3>
            <div class="mt-2 text-sm text-blue-700">
                <p>Cette section permet de visualiser les tarifs actuels. Pour modifier les tarifs, vous pouvez soit :</p>
                <ul class="list-disc list-inside mt-2">
                    <li>Modifier directement le code source du frontend</li>
                    <li>Implémenter un système de gestion des tarifs en base de données</li>
                </ul>
            </div>
        </div>
    </div>
</div>
@endsection