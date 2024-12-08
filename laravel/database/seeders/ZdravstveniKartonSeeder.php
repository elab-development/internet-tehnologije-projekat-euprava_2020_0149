<?php
namespace Database\Seeders;

use App\Models\User;
use App\Models\ZdravstveniKarton;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ZdravstveniKartonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $korisnici = User::whereIn('id', [1, 2])->get();

    
        foreach ($korisnici as $korisnik) {
            ZdravstveniKarton::create([
                'korisnik_id' => $korisnik->id,
                'istorija_bolesti' => 'Pacijent nema ozbiljnih bolesti u prošlosti.',
                'alergije' => 'Nema poznatih alergija.',
                'prethodni_pregledi' => 'Pacijent je imao redovne preglede kod svog lekara.',
            ]);
        }
    }
}
