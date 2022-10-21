<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Especialidad;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class DoctorController extends Controller
{
    public function index()
    {
        $doctores = Doctor::with('especialidad')->get();
        return Inertia::render('Doctor/Index', [
            'doctores' =>  $doctores
        ]);
    }

    public function create()
    {
        $especialidades = Especialidad::all();
        return Inertia::render('Doctor/Create', [
            'especialidades' => $especialidades
        ]);
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'nombres'           => ['required'],
            'apellidos'         => ['required'],
            'especialidad_id'   => ['required']
        ])->validate();

        Doctor::create($request->all());

        return redirect()->route('doctor.index');
    }

    public function edit($id)
    {
        $especialidades = Especialidad::all();
        $doctor = Doctor::find($id);
        return Inertia::render('Doctor/Edit', [
            'especialidades' => $especialidades,
            'doctor'  => $doctor
        ]);
    }

    public function update($id, Request $request)
    {
        Validator::make($request->all(), [
            'nombres'           => ['required'],
            'apellidos'         => ['required'],
            'especialidad_id'   => ['required']
        ])->validate();

        Doctor::find($id)->update($request->all());
        return redirect()->route('doctor.index');
    }

    public function destroy($id)
    {
        Doctor::find($id)->delete();
        return redirect()->route('doctor.index');
    }
}
