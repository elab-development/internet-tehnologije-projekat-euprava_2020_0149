<?php

namespace App\Http\Controllers;

use App\Models\Zahtev;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ZahtevController extends Controller
{
    public function index()
    {
        $zahtevi = Zahtev::all();
        return response()->json($zahtevi);
    }

    public function show($id)
    {
        $zahtev = Zahtev::findOrFail($id);
        return response()->json($zahtev);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'korisnik_id' => 'required|integer',
            'tip_zahteva' => 'required|string|max:255',
            'opis' => 'required|string',
            'status' => 'required|string|max:255',
            'datum_podnosenja' => 'required|date',
            'odgovor' => 'sometimes|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $zahtev = Zahtev::create($validator->validated());
        return response()->json($zahtev, 201);
    }

    public function update(Request $request, $id)
    {
        $zahtev = Zahtev::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'korisnik_id' => 'required|integer',
            'tip_zahteva' => 'required|string|max:255',
            'opis' => 'required|string',
            'status' => 'required|string|max:255',
            'datum_podnosenja' => 'required|date',
            'odgovor' => 'sometimes|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $zahtev->update($validator->validated());
        return response()->json($zahtev);
    }

    public function destroy($id)
    {
        $zahtev = Zahtev::findOrFail($id);
        $zahtev->delete();
        return response()->json(null, 204);
    }
}
