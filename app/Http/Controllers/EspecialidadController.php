<?php

namespace App\Http\Controllers;

use App\Models\Especialidad;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class EspecialidadController extends Controller
{
    
    public function index()
    {
        $especialidades = Especialidad::all();
        return Inertia::render('Especialidad/Index', [
            'especialidades' => $especialidades
        ]);
    }

    public function create()
    {
        return Inertia::render('Especialidad/Create');
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'nombre' => ['required'],
            'monto'  => ['required']
        ])->validate();

        Especialidad::create($request->all());

        return redirect()->route('especialidad.index');
    }

    public function edit(Especialidad $especialidad)
    {
        return Inertia::render('Especialidad/Edit', [
            'especialidad' => $especialidad
        ]);
    }

    public function update(Request $request, Especialidad $especialidad)
    {
        Validator::make($request->all(), [
            'nombre' => ['required'],
            'monto' => ['required']
        ])->validate();

        Especialidad::find($especialidad->id)->update($request->all());
        return redirect()->route('especialidad.index');
    }

    public function destroy(Especialidad $especialidad)
    {
        Especialidad::find($especialidad->id)->delete();
        return redirect()->route('especialidad.index');
    }
}
