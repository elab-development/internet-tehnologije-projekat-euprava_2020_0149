<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $role)
    {
        // Provera da li je korisnik autentifikovan i da li ima odgovarajuću ulogu
        if (!Auth::check() || Auth::user()->role !== $role) {
            // Ako korisnik nije autentifikovan ili nema odgovarajuću ulogu, vrati ga nazad ili prikaži grešku
            return redirect('/')->with('error', 'Nemate pristup ovoj stranici!');
        }

        return $next($request);
    }
}
