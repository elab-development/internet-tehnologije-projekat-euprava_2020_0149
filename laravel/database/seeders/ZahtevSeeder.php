<?php

namespace Database\Seeders;

use App\Models\Zahtev;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ZahtevSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $zahtevi = [
            [
                'korisnik_id' => 1,
                'tip_zahteva' => 'Obnova lične karte',
                'opis' => 'Molim za obnovu lične karte jer je istekla.',
                'status' => 'Otvoren',
                'datum_podnosenja' => now(),
                'odgovor' => null,
            ],
            [
                'korisnik_id' => 2,
                'tip_zahteva' => 'Registracija vozila',
                'opis' => 'Želim da registrujem svoje vozilo na portalu e-uprave.',
                'status' => 'Otvoren',
                'datum_podnosenja' => now(),
                'odgovor' => null,
            ],
            [
                'korisnik_id' => 3,
                'tip_zahteva' => 'Promena adrese stanovanja',
                'opis' => 'Želim da promenim adresu stanovanja na svojoj ličnoj karti.',
                'status' => 'Otvoren',
                'datum_podnosenja' => now(),
                'odgovor' => null,
            ],
            [
                'korisnik_id' => 4,
                'tip_zahteva' => 'Izdavanje radne dozvole',
                'opis' => 'Molim za izdavanje radne dozvole za rad u inostranstvu.',
                'status' => 'Otvoren',
                'datum_podnosenja' => now(),
                'odgovor' => null,
            ],
            [
                'korisnik_id' => 5,
                'tip_zahteva' => 'Prijavljivanje deteta za vrtić',
                'opis' => 'Želim da prijavim svoje dete za upis u vrtić.',
                'status' => 'Otvoren',
                'datum_podnosenja' => now(),
                'odgovor' => null,
            ],
        ];

        foreach ($zahtevi as $zahtev) {
            Zahtev::create($zahtev);
        }
    }
}
