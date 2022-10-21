<?php

namespace App\Http\Controllers;

use App\Models\Laboratorio;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class LaboratorioController extends Controller
{
    public function index()
    {
        $laboratorios = Laboratorio::all();
        return Inertia::render('Laboratorio/Index', [
            'laboratorios' => $laboratorios
        ]);
    }

    public function create()
    {
        return Inertia::render('Laboratorio/Create');
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'nombre' => ['required'],
            'monto'  => ['required']
        ])->validate();

        Laboratorio::create($request->all());

        return redirect()->route('laboratorio.index');
    }

    public function edit(Laboratorio $laboratorio)
    {
        return Inertia::render('Laboratorio/Edit', [
            'laboratorio' => $laboratorio
        ]);
    }

    public function update(Request $request, Laboratorio $laboratorio)
    {
        Validator::make($request->all(), [
            'nombre' => ['required'],
            'monto' => ['required']
        ])->validate();

        Laboratorio::find($laboratorio->id)->update($request->all());
        return redirect()->route('laboratorio.index');
    }

    public function destroy(Laboratorio $laboratorio)
    {
        Laboratorio::find($laboratorio->id)->delete();
        return redirect()->route('laboratorio.index');
    }
}
