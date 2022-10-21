<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class ClienteController extends Controller
{
    public function index()
    {
        $clientes = Cliente::all();
        return Inertia::render('Cliente/Index', [
            'clientes' => $clientes
        ]);
    }

    public function create()
    {
        return Inertia::render('Cliente/Create');
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'nombres'   => ['required'],
            'apellidos' => ['required'],
            'edad'      => ['required']
        ])->validate();

        Cliente::create($request->all());

        return redirect()->route('cliente.index');
    }

    public function edit(Cliente $cliente)
    {
        return Inertia::render('Cliente/Edit', [
            'cliente' => $cliente
        ]);
    }

    public function update(Request $request, Cliente $cliente)
    {
        Validator::make($request->all(), [
            'nombres'   => ['required'],
            'apellidos' => ['required'],
            'edad'      => ['required']
        ])->validate();

        Cliente::find($cliente->id)->update($request->all());
        return redirect()->route('cliente.index');
    }

    public function destroy(Cliente $cliente)
    {
        Cliente::find($cliente->id)->delete();
        return redirect()->route('cliente.index');
    }
}
