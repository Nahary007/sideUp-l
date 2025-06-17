<?php
return [
    'paths' => ['api/*', '/login', '/logout', '/register','/reservations', '/reserver', '/sanctum/csrf-cookie', '/contact', '/admin/check-auth'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];