<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'imePrezime',
        'email',
        'password',
        'datum_rodjenja',
        'pol',
        'adresa',
        'grad',
        'drzava',
        'telefon',
        'JMBG',
        'broj_licne_karte',
        'status',
        'uloga',
        'slika_profila',
        'poslednje_prijavljivanje',
        'role' //admin ili korisnik ili neulogovani
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function zakazivanja()
    {
        return $this->hasMany(Zakazivanje::class, 'korisnik_id');
    }
    public function zdravstveniKarton()
    {
        return $this->hasOne(ZdravstveniKarton::class, 'korisnik_id'); ////hasOne se koristi u modelu koji ima strani ključ. Ova veza označava da model "ima jedan" drugi model.
    }
    public function zahtevi()
    {
        return $this->hasMany(Zahtev::class, 'korisnik_id'); 
    }
    public function odgovoriNaAnkete()
    {
        return $this->hasMany(OdgovorAnkete::class, 'korisnik_id');
    }
}
