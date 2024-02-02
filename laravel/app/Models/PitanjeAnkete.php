<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PitanjeAnkete extends Model  //svaka anketa ce imati vise pitanja
{
    use HasFactory;
    protected $fillable = [
        'anketa_id',
        'tekst',
    ];
    
    public function anketa()
    {
        return $this->belongsTo(Anketa::class, 'anketa_id');
    }
    public function odgovori()
    {
        return $this->hasMany(OdgovorAnkete::class );
    }
}
