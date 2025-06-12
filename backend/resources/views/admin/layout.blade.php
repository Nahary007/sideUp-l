<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Administration') - Side-Up</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="w-64 bg-white shadow-lg">
            <div class="p-6">
                <h1 class="text-xl font-bold text-gray-800">Side-Up Admin</h1>
            </div>
            <nav class="mt-6">
                <a href="{{ route('admin.dashboard') }}" class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 {{ request()->routeIs('admin.dashboard') ? 'bg-blue-50 border-r-2 border-blue-500' : '' }}">
                    <i class="fas fa-chart-bar mr-3"></i>
                    Tableau de bord
                </a>
                <a href="{{ route('admin.reservations') }}" class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 {{ request()->routeIs('admin.reservations*') ? 'bg-blue-50 border-r-2 border-blue-500' : '' }}">
                    <i class="fas fa-calendar-alt mr-3"></i>
                    Réservations
                </a>
                <a href="{{ route('admin.messages') }}" class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 {{ request()->routeIs('admin.messages*') ? 'bg-blue-50 border-r-2 border-blue-500' : '' }}">
                    <i class="fas fa-envelope mr-3"></i>
                    Messages
                </a>
                <a href="{{ route('admin.pricing') }}" class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 {{ request()->routeIs('admin.pricing*') ? 'bg-blue-50 border-r-2 border-blue-500' : '' }}">
                    <i class="fas fa-euro-sign mr-3"></i>
                    Tarifs
                </a>
            </nav>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-hidden">
            <!-- Header -->
            <header class="bg-white shadow-sm border-b">
                <div class="flex items-center justify-between px-6 py-4">
                    <h2 class="text-xl font-semibold text-gray-800">@yield('page-title', 'Administration')</h2>
                    <div class="flex items-center space-x-4">
                        <span class="text-gray-600">Administrateur</span>
                        <a href="/" target="_blank" class="text-blue-600 hover:text-blue-800">
                            <i class="fas fa-external-link-alt"></i> Voir le site
                        </a>
                    </div>
                </div>
            </header>

            <!-- Content -->
            <main class="flex-1 overflow-y-auto p-6">
                @yield('content')
            </main>
        </div>
    </div>

    <script>
        // Configuration CSRF pour les requêtes AJAX
        window.axios = axios;
        window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        
        let token = document.head.querySelector('meta[name="csrf-token"]');
        if (token) {
            window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
        }
    </script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    @stack('scripts')
</body>
</html>