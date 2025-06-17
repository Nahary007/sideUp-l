<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->string('status_reservations')->nullable()->after('duration'); // Exemple d'ajout
            // Ou simplement :
            // $table->string('nouvelle_colonne')->nullable(); // Ajout sans spécifier la position
        });
    }

    /**
     * Reverse the migrations.
     */
    // public function down(): void
    // {
    //     Schema::table('votre_table', function (Blueprint $table) {
    //         $table->dropColumn('nouvelle_colonne');
    //     });
    // }
};