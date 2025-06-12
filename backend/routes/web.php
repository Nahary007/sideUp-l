<?php

use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use App\Http\Controllers\ContactController;

Route::post('/contact', [ContactController::class, 'store']);


Route::post('/reserver', [ReservationController::class, 'store']);
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);