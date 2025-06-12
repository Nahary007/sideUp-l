<?php

use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::post('/reserver', [ReservationController::class, 'store']);
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);