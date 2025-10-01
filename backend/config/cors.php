<?php
return [
    'paths' => ['api/*', '/login', '/logout', '/register', '/reserver', '/reservations','reservations/*/status',
     '/sanctum/csrf-cookie', '/contact', '/admin/check-auth', '/services', 'services/*', 'services/*/toggle-status',
    '/messages', '/messages/*/read', '/messages/*/reply', '/dashboard-stats', '/recent-reservations', '/service-overview',
    ],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];