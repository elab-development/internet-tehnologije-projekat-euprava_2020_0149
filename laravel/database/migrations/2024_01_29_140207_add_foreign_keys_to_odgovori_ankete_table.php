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
        Schema::table('odgovor_anketes', function (Blueprint $table) {
            $table->foreign('anketa_id')->references('id')->on('anketas');
            $table->foreign('korisnik_id')->references('id')->on('users');
            $table->foreign('pitanje_ankete_id')->references('id')->on('pitanje_anketes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('odgovor_anketes', function (Blueprint $table) {
            $table->dropForeign(['anketa_id']);
            $table->dropForeign(['korisnik_id']);
        });
    }
};
