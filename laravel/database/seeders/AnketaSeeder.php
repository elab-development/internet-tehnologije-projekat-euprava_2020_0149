<?php 
namespace Database\Seeders;

use App\Models\Anketa;
use App\Models\PitanjeAnkete;

use Illuminate\Database\Seeder;
class AnketaSeeder extends Seeder
{
    public function run()
    {
        // Kreirajte prvu anketu
        $anketa1 = Anketa::create([
            'naslov' => 'Anketa o javnom mnenju',
            'opis' => 'Ova anketa ima za cilj ispitivanje javnog mnenja o aktuelnim pitanjima.',
            'datum_pocetka' => now(),
            'datum_kraja' => now()->addDays(7),
            'status' => 'otvoreno',
        ]);

        // Dodajte pitanja prvoj anketi
        $anketa1->pitanja()->createMany([
            ['tekst' => 'Kako ocenjujete rad lokalne samouprave?'],
            ['tekst' => 'Da li podržavate mere za zaštitu životne sredine?'],
            ['tekst' => 'Koje su vaše glavne brige u vezi sa infrastrukturom?'],
        ]);

        // Kreirajte drugu anketu
        $anketa2 = Anketa::create([
            'naslov' => 'Anketa o političkim stavovima',
            'opis' => 'Ova anketa ima za cilj istraživanje političkih stavova građana.',
            'datum_pocetka' => now()->addDays(1),
            'datum_kraja' => now()->addDays(10),
            'status' => 'otvoreno',
        ]);

        // Dodajte pitanja drugoj anketi
        $anketa2->pitanja()->createMany([
            ['tekst' => 'Koja politička stranka ima vašu podršku?'],
            ['tekst' => 'Da li verujete u ishod predstojećih izbora?'],
            ['tekst' => 'Kako ocenjujete trenutno političko stanje u zemlji?'],
        ]);
    }
}
