<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anketa extends Model
{
    use HasFactory;
    protected $fillable = [
        'naslov',
        'opis',
        'datum_pocetka',
        'datum_kraja',
        'status',
    ];
    public function odgovori()
    {
        return $this->hasMany(OdgovorAnkete::class, 'anketa_id');
    }
}
