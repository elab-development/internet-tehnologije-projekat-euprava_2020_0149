<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zahtev extends Model
{
    use HasFactory;
    protected $fillable = [
        'korisnik_id',
        'tip_zahteva',
        'opis',
        'status',
        'datum_podnosenja',
        'odgovor',
    ];
}
