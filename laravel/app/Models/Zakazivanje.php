<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zakazivanje extends Model
{
    use HasFactory;
    protected $fillable = [
        'korisnik_id',
        'datum_vreme',
        'tip_pregleda',
        'status',
        'napomena',
    ];
    public function korisnik()
    {
        return $this->belongsTo(User::class, 'korisnik_id');
    }
}
