<?php
namespace Database\Factories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'imePrezime' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'datum_rodjenja' => $this->faker->date(),
            'pol' => $this->faker->randomElement(['Muški', 'Ženski']),
            'adresa' => $this->faker->address,
            'grad' => $this->faker->city,
            'drzava' => $this->faker->country,
            'telefon' => $this->faker->phoneNumber,
            'JMBG' => $this->faker->unique()->numerify('##############'), // 13 cifara
            'broj_licne_karte' => $this->faker->unique()->numerify('########'), // 8 cifara
            'status' => $this->faker->randomElement(['Aktivan', 'Neaktivan']),
            'uloga' =>  'korisnik',
            'slika_profila' => 'default.jpg',  
            'poslednje_prijavljivanje' => now(),
        ];
    }
}
