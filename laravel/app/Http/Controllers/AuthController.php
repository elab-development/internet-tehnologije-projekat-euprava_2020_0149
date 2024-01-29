<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'imePrezime' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6',
            'datum_rodjenja' => 'required|date',
            'pol' => 'required|string|max:255',
            'adresa' => 'required|string|max:255',
            'grad' => 'required|string|max:255',
            'drzava' => 'required|string|max:255',
            'telefon' => 'required|string|max:255',
            'JMBG' => 'required|string|max:255|unique:users,JMBG',
            'broj_licne_karte' => 'required|string|max:255|unique:users,broj_licne_karte',
            'status' => 'required|string|max:255',
            'uloga' => 'required|string|max:255',
            'slika_profila' => 'nullable|string|max:255',
            
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        $user = \App\Models\User::create([
            'imePrezime' => $request->input('imePrezime'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'datum_rodjenja' => $request->input('datum_rodjenja'),
            'pol' => $request->input('pol'),
            'adresa' => $request->input('adresa'),
            'grad' => $request->input('grad'),
            'drzava' => $request->input('drzava'),
            'telefon' => $request->input('telefon'),
            'JMBG' => $request->input('JMBG'),
            'broj_licne_karte' => $request->input('broj_licne_karte'),
            'status' => $request->input('status'),
            'uloga' => $request->input('uloga'),
            'slika_profila' => $request->input('slika_profila'),
           
        ]);
    
        return response()->json(['message' => 'Registration successful'], 201);
    }
    

    /**
     * Log in a user and issue a token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $token = Auth::user()->createToken('auth-token')->plainTextToken;
            return response()->json(['token' => $token]);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    /**
     * Log out the authenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }
}
