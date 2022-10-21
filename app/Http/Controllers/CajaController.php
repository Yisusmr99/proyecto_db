<?php

namespace App\Http\Controllers;

use App\Models\Caja;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class CajaController extends Controller
{
    public function index()
    {
        $cajas = Caja::with('usuario')->get();
        return Inertia::render('Caja/Index', [
            'cajas' =>  $cajas
        ]);
    }

    public function create()
    {
        $usuarios = User::all();
        return Inertia::render('Caja/Create', [
            'usuarios' => $usuarios
        ]);
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'nombre'        => ['required'],
            'usuario_id'    => ['required']
        ])->validate();

        Caja::create($request->all());

        return redirect()->route('caja.index');
    }

    public function edit($id)
    {
        $usuarios = User::all();
        $caja = Caja::find($id);
        return Inertia::render('Caja/Edit', [
            'usuarios' => $usuarios,
            'caja'  => $caja
        ]);
    }

    public function update($id, Request $request)
    {
        Validator::make($request->all(), [
            'nombre' => ['required'],
            'usuario_id'   => ['required']
        ])->validate();

        Caja::find($id)->update($request->all());
        return redirect()->route('caja.index');
    }

    public function destroy($id)
    {
        Caja::find($id)->delete();
        return redirect()->route('caja.index');
    }
}
