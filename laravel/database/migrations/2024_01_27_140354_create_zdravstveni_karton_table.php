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
        Schema::create('zdravstveni_kartons', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('korisnik_id');
            $table->text('istorija_bolesti');
            $table->text('alergije')->nullable();
            $table->text('prethodni_pregledi');
            $table->timestamps();

            $table->foreign('korisnik_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('zdravstveni_karton');
    }
};
