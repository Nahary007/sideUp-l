<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Reservation;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Mettre à jour les réservations existantes avec un statut par défaut
        Reservation::whereNull('status_reservations')
            ->orWhere('status_reservations', '')
            ->update(['status_reservations' => 'pending']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Optionnel: remettre les statuts à null si nécessaire
        // Reservation::update(['status_reservations' => null]);
    }
};