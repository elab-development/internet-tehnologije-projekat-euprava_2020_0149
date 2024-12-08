<?php

use App\Http\Controllers\AnketaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OdgovorAnketeController;
use App\Http\Controllers\PitanjeAnketeController;
use App\Http\Controllers\ZahtevController;
use App\Http\Controllers\ZakazivanjeController;
use App\Models\PitanjeAnkete;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/ankete/export/{id}', [AnketaController::class, 'exportAnketaToCsv']);
Route::get('/ankete/{id}/pitanjaodgovori', [AnketaController::class, 'getAnketaWithPitanjaIOdgovori']);
Route::get('/zakazivanja/search', [ZakazivanjeController::class, 'search']);  /// GET http://127.0.0.1:8000/api/zakazivanja/search?korisnik_id=1&status=zakazano




Route::resource('pitanja', PitanjeAnketeController::class);
Route::resource('odgovori', OdgovorAnketeController::class);
Route::resource('ankete', AnketaController::class);



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware(['auth:sanctum'])->group(function () {
    // Dodajte ovu rutu za dobijanje podataka o ulogovanom korisniku
    Route::get('user-profile', [AuthController::class, 'userProfile']);
    Route::resource('zahtevi', ZahtevController::class);
    Route::resource('zakazivanja', ZakazivanjeController::class);
    Route::get('adminZahtevi', [ZahtevController::class, 'indexAdmin']);
    
    Route::patch('zahtevi/{id}', [ZahtevController::class, 'update']);
   
});

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);