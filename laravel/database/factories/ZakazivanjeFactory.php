<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Zakazivanje;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Zakazivanje>
 */
class ZakazivanjeFactory extends Factory
{
    protected $model = Zakazivanje::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $korisnik = User::inRandomOrder()->first();

        return [
            'korisnik_id' => $korisnik->id,
            'datum_vreme' => Carbon::now()->addDays(rand(1, 30))->addHours(rand(8, 17))->format('Y-m-d H:i:s'),
            'tip_pregleda' => 'Opšti pregled',
            'status' => 'Zakazano',
            'napomena' => 'Molim za zakazivanje opšteg pregleda.',
        ];
    }
}
