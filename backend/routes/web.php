<?php

use App\Http\Controllers\ReservationController;
use App\Http\Controllers\Admin\AdminController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use App\Http\Controllers\ContactController;

Route::post('/contact', [ContactController::class, 'store']);
Route::post('/reserver', [ReservationController::class, 'store']);
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

// Routes d'administration
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    
    // Gestion des réservations
    Route::get('/reservations', [AdminController::class, 'reservations'])->name('reservations');
    Route::put('/reservations/{reservation}/status', [AdminController::class, 'updateReservationStatus'])->name('reservations.update-status');
    
    // Gestion des messages
    Route::get('/messages', [AdminController::class, 'messages'])->name('messages');
    Route::put('/messages/{message}/read', [AdminController::class, 'markMessageAsRead'])->name('messages.mark-read');
    Route::delete('/messages/{message}', [AdminController::class, 'deleteMessage'])->name('messages.delete');
    
    // Gestion des tarifs
    Route::get('/pricing', [AdminController::class, 'pricing'])->name('pricing');
});