<?php
namespace App\Http\Controllers;

use App\Models\Zahtev;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ZahtevController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $zahtevi = Zahtev::where('korisnik_id', $userId)->get();
        return response()->json($zahtevi);
    }

    public function show($id)
    {
        $userId = auth()->id();
        $zahtev = Zahtev::where('id', $id)->where('korisnik_id', $userId)->firstOrFail();
        return response()->json($zahtev);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tip_zahteva' => 'required|string|max:255',
            'opis' => 'required|string', 
            'datum_podnosenja' => 'required|date',
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $validatedData = $validator->validated();
        $validatedData['korisnik_id'] = auth()->id();
        $validatedData['status'] ="podnet";

        $zahtev = Zahtev::create($validatedData);
        return response()->json($zahtev, 201);
    }

    public function update(Request $request, $id)
    {
        $userId = auth()->id();
        $zahtev = Zahtev::where('id', $id)->where('korisnik_id', $userId)->firstOrFail();

        $validator = Validator::make($request->all(), [
            'tip_zahteva' => 'required|string|max:255',
            'opis' => 'required|string',
            'status' => 'required|string|max:255',
            'datum_podnosenja' => 'required|date',
            'odgovor' => 'sometimes|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $validatedData = $validator->validated();
        $validatedData['korisnik_id'] = auth()->id();

        $zahtev->update($validatedData);
        return response()->json($zahtev);
    }

    public function destroy($id)
    {
        $userId = auth()->id();
        $zahtev = Zahtev::where('id', $id)->where('korisnik_id', $userId)->firstOrFail();
        $zahtev->delete();
        return response()->json(null, 204);
    }
}
