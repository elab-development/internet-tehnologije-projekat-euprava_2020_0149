<?php

namespace App\Http\Controllers;

use App\Models\Anketa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;
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

    public function getAnketaWithPitanjaIOdgovori($id)
    {
        // Pronađi anketu sa datim ID-om i učitaj pitanja i odgovore
        $anketa = Anketa::with(['pitanja', 'pitanja.odgovori'])
            ->findOrFail($id);

        return response()->json($anketa);
    }
    public function exportAnketaToCsv($id)
    {
        $anketa = Anketa::with(['pitanja', 'pitanja.odgovori'])->findOrFail($id);

        $csvData = [];
        // Dodavanje podataka ankete u zaglavlje
        $csvData[] = [
            'ID Ankete', $anketa->id,
            'Naslov', $anketa->naslov,
            'Opis', $anketa->opis,
            'Datum Početka', $anketa->datum_pocetka,
            'Datum Kraja', $anketa->datum_kraja,
            'Status', $anketa->status
        ];
    
        // Dodavanje prazne linije između zaglavlja i pitanja
        $csvData[] = [];
    
        // Dodavanje naslova za pitanja i odgovore
        $csvData[] = ['ID Pitanja', 'Tekst Pitanja', 'ID Odgovora', 'Odgovor'];
    
        foreach ($anketa->pitanja as $pitanje) {
            if (count($pitanje->odgovori) > 0) {
                foreach ($pitanje->odgovori as $odgovor) {
                    $csvData[] = [
                        $pitanje->id,
                        $pitanje->tekst,
                        $odgovor->id,
                        $odgovor->odgovor,
                    ];
                }
            } else {
                $csvData[] = [
                    $pitanje->id,
                    $pitanje->tekst,
                    '', // ID odgovora
                    '', // Odgovor
                ];
            }
        } 
        $fileName = 'anketa_' . $anketa->id . '.csv';
        $filePath = storage_path('/app/public/ankete_csv/' . $fileName);
        $directory = dirname($filePath);
        if (!is_dir($directory)) {
            mkdir($directory, 0777, true);
        }
    
        $file = fopen($filePath, 'w');
       
        foreach ($csvData as $row) {
            fputcsv($file, $row);
        }
        fclose($file);
    
        
        return response()->json(['message' => 'CSV file saved', 'path' => $filePath]);
    }
}
