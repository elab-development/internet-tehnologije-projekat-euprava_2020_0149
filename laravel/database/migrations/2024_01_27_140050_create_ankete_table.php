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
        Schema::create('anketas', function (Blueprint $table) {
            $table->id();
            $table->string('naslov');
            $table->text('opis')->nullable();
            $table->dateTime('datum_pocetka');
            $table->dateTime('datum_kraja');
            $table->enum('status', ['otvoreno', 'zatvoreno']);
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
        Schema::dropIfExists('anketas');
    }
};
