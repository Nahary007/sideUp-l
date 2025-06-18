<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type'); // coaching, sophrologie, etc.
            $table->integer('duration'); // minutes
            $table->decimal('price', 8, 2); // en euros
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_package')->default(false);
            $table->json('package_details')->nullable(); // {"sessions": 5, "pricePerSession": 20}
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
