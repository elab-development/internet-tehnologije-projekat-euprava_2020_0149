<?php

namespace App\Http\Controllers;

use App\Models\Zakazivanje;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ZakazivanjeController extends Controller
{
    public function index()
    {
        $zakazivanja = Zakazivanje::all();
        return response()->json($zakazivanja);
    }

    public function show($id)
    {
        $zakazivanje = Zakazivanje::findOrFail($id);
        return response()->json($zakazivanje);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'korisnik_id' => 'required|integer',
            'datum_vreme' => 'required|date',
            'tip_pregleda' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'napomena' => 'sometimes|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $zakazivanje = Zakazivanje::create($validator->validated());
        return response()->json($zakazivanje, 201);
    }

    public function update(Request $request, $id)
    {
        $zakazivanje = Zakazivanje::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'korisnik_id' => 'required|integer',
            'datum_vreme' => 'required|date',
            'tip_pregleda' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'napomena' => 'sometimes|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $zakazivanje->update($validator->validated());
        return response()->json($zakazivanje);
    }

    public function destroy($id)
    {
        $zakazivanje = Zakazivanje::findOrFail($id);
        $zakazivanje->delete();
        return response()->json(null, 204);
    }
}
