<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ReservationController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/contact', [ContactController::class, 'store']);
Route::post('/reserver', [ReservationController::class, 'store']);

Route::middleware('auth')->group(function () {
    Route::get('/admin/check-auth', fn () => response()->json(['authenticated' => true]));
    Route::get('/reservations', [ReservationController::class, 'show_all']);
    Route::patch('/reservations/{id}/status', [ReservationController::class, 'updateStatus']);

    // Services
    Route::get('/services', [ServiceController::class, 'index']);
    Route::post('/services', [ServiceController::class, 'store']);
    Route::patch('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
});
