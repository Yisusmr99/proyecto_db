<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
  use HasFactory;

  protected $fillable = [
    'nombres', 'apellidos',
    'especialidad_id'
  ];

  protected $table = 'doctores';

  public function especialidad()
  {
    return $this->hasOne(Especialidad::class, 'id', 'especialidad_id');
  }
}
