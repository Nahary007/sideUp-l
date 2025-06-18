<?php

use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/contact', [ContactController::class, 'store']);

Route::post('/reserver', [ReservationController::class, 'store']);

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Routes protégées par authentification
Route::middleware('auth')->group(function () {
    Route::get('/admin/check-auth', function () {
        return response()->json(['authenticated' => true]);
    });
    
    Route::get('/reservations', [ReservationController::class, 'show_all']);
    Route::patch('/reservations/{id}/status', [ReservationController::class, 'updateStatus']);
});