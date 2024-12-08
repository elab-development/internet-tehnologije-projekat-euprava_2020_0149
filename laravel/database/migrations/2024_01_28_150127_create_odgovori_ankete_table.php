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
        Schema::create('odgovor_anketes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('anketa_id');
            $table->unsignedBigInteger('korisnik_id');
            $table->unsignedBigInteger('pitanje_ankete_id');
            $table->text('odgovor');
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
        Schema::dropIfExists('odgovor_anketes');
    }
};
