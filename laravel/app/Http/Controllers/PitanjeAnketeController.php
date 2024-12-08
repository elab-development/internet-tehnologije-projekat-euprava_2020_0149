<?php

namespace App\Http\Controllers;

use App\Models\PitanjeAnkete;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PitanjeAnketeController extends Controller
{
    public function index()
    {
        $pitanja = PitanjeAnkete::all();
        return response()->json($pitanja);
    }

    public function show($id)
    {
        $pitanje = PitanjeAnkete::findOrFail($id);
        return response()->json($pitanje);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'anketa_id' => 'required|integer',
            'tekst' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $pitanje = PitanjeAnkete::create($validator->validated());
        return response()->json($pitanje, 201);
    }

    public function update(Request $request, $id)
    {
        $pitanje = PitanjeAnkete::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'anketa_id' => 'required|integer',
            'tekst' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $pitanje->update($validator->validated());
        return response()->json($pitanje);
    }

    public function destroy($id)
    {
        $pitanje = PitanjeAnkete::findOrFail($id);
        $pitanje->delete();
        return response()->json(null, 204);
    }
}
