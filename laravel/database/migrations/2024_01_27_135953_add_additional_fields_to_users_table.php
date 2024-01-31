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
        Schema::table('users', function (Blueprint $table) {
            $table->date('datum_rodjenja')->nullable();
            $table->enum('pol', ['muški', 'ženski', 'drugo'])->nullable();
            $table->string('adresa')->nullable();
            $table->string('grad')->nullable();
            $table->string('drzava')->nullable();
            $table->string('telefon')->nullable();
            $table->string('JMBG')->nullable();
            $table->string('broj_licne_karte')->nullable();
            $table->enum('status', ['aktivan', 'neaktivan', 'suspendovan'])->nullable();
          //  $table->enum('uloga', ['korisnik', 'admin', 'moderator'])->nullable();
            $table->string('slika_profila')->nullable();
            $table->dateTime('poslednje_prijavljivanje')->nullable();
            $table->string('role')->default('korisnik');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'datum_rodjenja',
                'pol',
                'adresa',
                'grad',
                'drzava',
                'telefon',
                'JMBG',
                'broj_licne_karte',
                'status',
                'uloga',
                'slika_profila',
                'poslednje_prijavljivanje',
            ]);
        });
    }
};
