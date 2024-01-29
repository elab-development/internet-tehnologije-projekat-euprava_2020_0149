<?php

use App\Http\Controllers\AnketaController;
use App\Http\Controllers\ZahtevController;
use App\Http\Controllers\ZakazivanjeController;
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
Route::get('/zakazivanja/search', [ZakazivanjeController::class, 'search']);
Route::resource('zahtevi', ZahtevController::class);
Route::resource('ankete', AnketaController::class);
Route::resource('zakazivanja', ZakazivanjeController::class);





