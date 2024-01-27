<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OdgovorAnkete extends Model
{
    use HasFactory;
    protected $fillable = [
        'anketa_id',
        'korisnik_id',
        'odgovor',
    ];
    public function anketa()
    {
        return $this->belongsTo(Anketa::class, 'anketa_id');
    }

    public function korisnik()
    {
        return $this->belongsTo(User::class, 'korisnik_id');
    }


}
