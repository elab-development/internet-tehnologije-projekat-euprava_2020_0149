<?php

namespace App\Http\Controllers;

use App\Models\Anketa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AnketaController extends Controller
{
    public function index()
    {
        $ankete = Anketa::all();
        return response()->json($ankete);
    }

    public function show($id)
    {
        $anketa = Anketa::findOrFail($id);
        return response()->json($anketa);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naslov' => 'required|string|max:255',
            'opis' => 'required|string',
            'datum_pocetka' => 'required|date',
            'datum_kraja' => 'required|date',
            'status' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $anketa = Anketa::create($validator->validated());
        return response()->json($anketa, 201);
    }

    public function update(Request $request, $id)
    {
        $anketa = Anketa::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naslov' => 'required|string|max:255',
            'opis' => 'required|string',
            'datum_pocetka' => 'required|date',
            'datum_kraja' => 'required|date',
            'status' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $anketa->update($validator->validated());
        return response()->json($anketa);
    }

    public function destroy($id)
    {
        $anketa = Anketa::findOrFail($id);
        $anketa->delete();
        return response()->json(null, 204);
    }
}
