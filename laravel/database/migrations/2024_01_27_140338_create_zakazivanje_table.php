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
        Schema::create('zakazivanjes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('korisnik_id');
            $table->unsignedBigInteger('doktor_id');
            $table->dateTime('datum_vreme');
            $table->string('tip_pregleda');
            $table->enum('status', ['zakazano', 'otkazano', 'obavljeno']);
            $table->text('napomena')->nullable();
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
        Schema::dropIfExists('zakazivanje');
    }
};
