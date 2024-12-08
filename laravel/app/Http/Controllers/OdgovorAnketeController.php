<?php

namespace App\Http\Controllers;

use App\Models\OdgovorAnkete;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OdgovorAnketeController extends Controller
{
    public function index()
    {
        $odgovori = OdgovorAnkete::all();
        return response()->json($odgovori);
    }

    public function show($id)
    {
        $odgovor = OdgovorAnkete::findOrFail($id);
        return response()->json($odgovor);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'anketa_id' => 'required|integer',
            'korisnik_id' => 'required|integer',
            'pitanje_ankete_id' => 'required|integer',
            'odgovor' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $odgovor = OdgovorAnkete::create($validator->validated());
        return response()->json($odgovor, 201);
    }

    public function update(Request $request, $id)
    {
        $odgovor = OdgovorAnkete::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'anketa_id' => 'required|integer',
            'korisnik_id' => 'required|integer',
            'pitanje_ankete_id' => 'required|integer',
            'odgovor' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $odgovor->update($validator->validated());
        return response()->json($odgovor);
    }

    public function destroy($id)
    {
        $odgovor = OdgovorAnkete::findOrFail($id);
        $odgovor->delete();
        return response()->json(null, 204);
    }
}
