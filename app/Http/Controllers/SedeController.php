<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Sede;

class SedeController extends Controller
{
    public function index()
    {
        $sedes = Sede::all();
        return Inertia::render('Sede/Index', ['sedes' => $sedes]);
    }

    public function create()
    {
        return Inertia::render('Sede/Create');
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'nombre' => ['required']
        ])->validate();
        Sede::create($request->all());

        return redirect()->route('sede.index');
    }

    public function edit(Sede $sede)
    {
        return Inertia::render('Sede/Edit', [
            'sede' => $sede
        ]);
    }

    public function update($id, Request $request)
    {
        Validator::make($request->all(), [
            'nombre' => ['required']
        ])->validate();

        Sede::find($id)->update($request->all());
        return redirect()->route('sede.index');
    }

    public function destroy($id)
    {
        Sede::find($id)->delete();
        return redirect()->route('sede.index');
    }
}
