<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class FacturaController extends Controller
{
    public function index()
    {
        $facturas = Factura::with(['cita' => function($query){
            $query->with('cliente');
        }])->get();
        return Inertia::render('Facturacion/Index', [
            'facturas' =>  $facturas
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Factura $factura)
    {
        //
    }

    public function edit($id)
    {
        $factura = Factura::with(['cita' => function($query){
            $query->with('cliente', 'laboratorio');
            $query->with(['doctor' => function($query){
                $query->with('especialidad');
            }]);
        }])->find($id);
        $monto = $factura->cita->laboratorio->monto + $factura->cita->doctor->especialidad->monto;
        return Inertia::render('Facturacion/Edit', [
            'factura'   => $factura,
            'monto'     => $monto
        ]);
    }

    public function update(Request $request, $id)
    {
        Validator::make($request->all(), [
            'razon_social'  => ['required'],
            'nit'           => ['required'],
            'monto'         => ['required']
        ])->validate();

        $factura = Factura::find($id);
        $factura->razon_social = $request->razon_social;
        $factura->nit = $request->nit;
        $factura->monto = $request->monto;
        $factura->estado = 2;
        $factura->save();
        return redirect()->route('facturacion.index');;
    }

    public function destroy(Factura $factura)
    {
        //
    }
}
