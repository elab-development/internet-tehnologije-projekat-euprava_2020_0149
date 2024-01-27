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
        Schema::create('odgovori_anketas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('anketa_id');
            $table->unsignedBigInteger('korisnik_id');
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
        Schema::dropIfExists('odgovori_anketas');
    }
};
