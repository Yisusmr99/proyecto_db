<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use App\Models\Doctor;
use App\Models\Cliente;
use App\Models\Laboratorio;
use App\Models\Factura;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CitaController extends Controller
{
    public function index()
    {
        $citas = Cita::with('cliente', 'doctor', 'laboratorio')->where('estado', '!=', 3)->get();
        return Inertia::render('Cita/Index', [
            'citas' =>  $citas
        ]);
    }

    public function create()
    {
        $clientes = Cliente::all();
        $doctores = Doctor::all();
        return Inertia::render('Cita/Create', [
            'clientes' => $clientes,
            'doctores' => $doctores
        ]);
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'fecha'         => ['required'],
            'estado'        => ['required'],
            'cliente_id'    => ['required'],
            'doctor_id'     => ['required']
        ])->validate();

        Cita::create([
            'fecha' => $request->fecha,
            'estado' => $request->estado,
            'cliente_id' => $request->cliente_id,
            'doctor_id' => $request->doctor_id,
        ]);

        return redirect()->route('cita.index');
    }

    public function edit($id)
    {
        $clientes = Cliente::all();
        $doctores = Doctor::all();;
        $cita = Cita::find($id);
        return Inertia::render('Cita/Edit', [
            'clientes' => $clientes,
            'doctores' => $doctores,
            'cita'  => $cita
        ]);
    }

    public function update($id, Request $request)
    {
        Validator::make($request->all(), [
            'fecha'         => ['required'],
            'estado'        => ['required'],
            'cliente_id'    => ['required'],
            'doctor_id'     => ['required']
        ])->validate();

        if($request->estado == '3'){
            Factura::create([
                'cita_id'   => $id,
                'estado'    => 1
            ]);
        }

        Cita::find($id)->update($request->all());
        return redirect()->route('cita.index');
    }

    public function destroy(Cita $cita)
    {
        //
    }

    public function asignarLaboratorio($id)
    {
        $cita = Cita::find($id);
        $laboratorios = Laboratorio::all();
        return Inertia::render('Cita/AsignarLaboratorio', [
            'laboratorios' => $laboratorios,
            'cita'  => $cita
        ]);
    }

    public function crearAsignacionLaboratorio(Request $request)
    {
        Validator::make($request->all(), [
            'laboratorio_id'    => ['required'],
            'cita_id'           => ['required'],
        ])->validate();

        $cita = Cita::find($request->cita_id);
        $cita->laboratorio_id = $request->laboratorio_id;
        $cita->save();
        return redirect()->route('cita.index');
    }
}
