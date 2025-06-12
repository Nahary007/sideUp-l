<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending')->after('accept_terms');
            $table->text('admin_notes')->nullable()->after('status');
        });
    }

    public function down()
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropColumn(['status', 'admin_notes']);
        });
    }
};