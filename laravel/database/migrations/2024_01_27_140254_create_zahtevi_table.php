<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('zahtevs', function (Blueprint $table) {
            $table->id();
          
            $table->unsignedBigInteger('korisnik_id');
            $table->string('tip_zahteva');
            $table->text('opis');
            $table->enum('status', ['podnet', 'u obradi', 'završen']);
            $table->dateTime('datum_podnosenja');
            $table->text('odgovor')->nullable();
            $table->foreign('korisnik_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('zahtevi');
    }
};
