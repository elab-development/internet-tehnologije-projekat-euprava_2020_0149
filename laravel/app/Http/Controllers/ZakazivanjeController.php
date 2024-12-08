<?php
namespace App\Http\Controllers;

use App\Models\Zakazivanje;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ZakazivanjeController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $zakazivanja = Zakazivanje::where('korisnik_id', $userId)->get();
        return response()->json($zakazivanja);
    }

    public function show($id)
    {
        $userId = auth()->id();
        $zakazivanje = Zakazivanje::where('id', $id)->where('korisnik_id', $userId)->firstOrFail();
        return response()->json($zakazivanje);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'datum_vreme' => 'required|date',
            'tip_pregleda' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'napomena' => 'sometimes|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $userId = auth()->id();
        $validatedData = $validator->validated();
        $validatedData['korisnik_id'] = $userId;

        // Provera postojanja istog zahteva
        $existingZakazivanje = Zakazivanje::where('korisnik_id', $userId)
            ->where('datum_vreme', $validatedData['datum_vreme'])
            ->where('tip_pregleda', $validatedData['tip_pregleda'])
            ->where('status', $validatedData['status'])
            ->first();

        if ($existingZakazivanje) {
            return response()->json(['error' => 'Već imate zakazivanje sa istim atributima.'], 400);
        }

        $zakazivanje = Zakazivanje::create($validatedData);
        return response()->json($zakazivanje, 201);
    }

    public function update(Request $request, $id)
    {
        $userId = auth()->id();
        $zakazivanje = Zakazivanje::where('id', $id)->where('korisnik_id', $userId)->firstOrFail();

        $validator = Validator::make($request->all(), [
            'datum_vreme' => 'required|date',
            'tip_pregleda' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'napomena' => 'sometimes|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $validatedData = $validator->validated();
        $validatedData['korisnik_id'] = auth()->id();

        $zakazivanje->update($validatedData);
        return response()->json($zakazivanje);
    }

    public function destroy($id)
    {
        $userId = auth()->id();
        $zakazivanje = Zakazivanje::where('id', $id)->where('korisnik_id', $userId)->firstOrFail();
        $zakazivanje->delete();
        return response()->json(null, 204);
    }

    public function search(Request $request)
    {
        $userId = auth()->id();
        $query = Zakazivanje::where('korisnik_id', $userId);

        if ($request->has('datum_vreme')) {
            $query->where('datum_vreme', $request->input('datum_vreme'));
        }

        if ($request->has('tip_pregleda')) {
            $query->where('tip_pregleda', $request->input('tip_pregleda'));
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->has('napomena')) {
            $query->where('napomena', 'like', '%' . $request->input('napomena') . '%');
        }

        $zakazivanja = $query->get();
        return response()->json($zakazivanja);
    }
}
