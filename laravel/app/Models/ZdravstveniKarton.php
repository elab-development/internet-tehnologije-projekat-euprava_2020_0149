<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ZdravstveniKarton extends Model
{
    use HasFactory;
    protected $fillable = [
        'korisnik_id',
        'istorija_bolesti',
        'alergije',
        'prethodni_pregledi',
    ];
    public function korisnik()
    {
        return $this->belongsTo(User::class, 'korisnik_id');
    }
}
