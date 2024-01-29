<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use AnketaSeeder;
use App\Models\User;
use App\Models\Zakazivanje;
use Database\Seeders\AnketaSeeder as SeedersAnketaSeeder;
use Illuminate\Database\Seeder;
 

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         User::factory(10)->create();

         Zakazivanje::factory()->count(5)->create();
         $this->call(ZdravstveniKartonSeeder::class);
         $this->call(SeedersAnketaSeeder::class);
    }
}
