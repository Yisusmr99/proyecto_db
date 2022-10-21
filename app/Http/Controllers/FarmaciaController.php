<?php

namespace App\Http\Controllers;

use App\Models\Farmacia;
use App\Models\Sede;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class FarmaciaController extends Controller
{
    public function index()
    {
        $farmacias = Farmacia::with('sede')->get();
        return Inertia::render('Farmacia/Index', [
            'farmacias' =>  $farmacias
        ]);
    }

    public function create()
    {
        $sedes = Sede::all();
        return Inertia::render('Farmacia/Create', [
            'sedes' => $sedes
        ]);
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'nombre'    => ['required'],
            'sede_id'   => ['required']
        ])->validate();

        Farmacia::create($request->all());

        return redirect()->route('farmacia.index');
    }

    public function edit($id)
    {
        $sedes = Sede::all();
        $farmacia = Farmacia::find($id);
        return Inertia::render('Farmacia/Edit', [
            'sedes' => $sedes,
            'farmacia'  => $farmacia
        ]);
    }

    public function update($id, Request $request)
    {
        Validator::make($request->all(), [
            'nombre' => ['required'],
            'sede_id'   => ['required']
        ])->validate();

        Farmacia::find($id)->update($request->all());
        return redirect()->route('farmacia.index');
    }

    public function destroy($id)
    {
        Farmacia::find($id)->delete();
        return redirect()->route('farmacia.index');
    }
}
