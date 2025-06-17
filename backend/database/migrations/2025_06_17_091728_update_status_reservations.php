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
        // Exemple 1 : Définir une valeur statique pour tous les enregistrements
        // VotreModele::whereNull('nouvelle_colonne')->update(['nouvelle_colonne' => 'valeur_par_defaut']);

        // Exemple 2 : Définir une valeur basée sur d'autres colonnes ou une logique plus complexe
        Reservation::chunk(100, function ($enregistrements) { // Utilisation de chunk pour les grandes tables
            foreach ($enregistrements as $enregistrement) {
                if (is_null($enregistrement->status_reservations)) { // Vérifier si la colonne est nulle
                    $enregistrement->status_reservations = 'attente' . $enregistrement->id; // Exemple
                    $enregistrement->save();
                }
            }
        });
    }

};