<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    use HasFactory;

    protected $fillable = [
        'cita_id',
        'nit',
        'razon_social',
        'estado',
    ];
    public function cita()
    {
        return $this->hasOne(Cita::class, 'id', 'cita_id');
    }
}
