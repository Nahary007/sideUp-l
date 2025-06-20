<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ReservationController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use App\Http\Controllers\DashboardController;

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/contact', [ContactController::class, 'store']);
Route::post('/reserver', [ReservationController::class, 'store']);

Route::middleware('auth')->group(function () {

    //checker si l'utilsateur est connecté
    Route::get('/admin/check-auth', fn () => response()->json(['authenticated' => true]));

    //route pour le dashboard
    Route::get('/dashboard-stats', [DashboardController::class, 'getStats']);
    Route::get('/recent-reservations', [DashboardController::class, 'getRecentReservations']);
    Route::get('/service-overview', [DashboardController::class, 'getServiceOverview']);
    
    //route pour l'affichage des reservation
    Route::get('/reservations', [ReservationController::class, 'show_all']);
    Route::patch('/reservations/{id}/status', [ReservationController::class, 'updateStatus']);

    // Services CRUD
    Route::get('/services', [ServiceController::class, 'index']);
    Route::post('/services', [ServiceController::class, 'store']);
    Route::get('/services/{id}', [ServiceController::class, 'show']);
    Route::patch('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
    Route::patch('/services/{id}/toggle-status', [ServiceController::class, 'toggleStatus']);

    //route pour la gestion des messages envoyées par les utilisateurs
    Route::get('/messages', [ContactController::class, 'index']);
    Route::patch('/messages/{id}/read', [ContactController::class, 'markAsRead']);
    Route::patch('/messages/{id}/reply', [ContactController::class, 'reply']);

});