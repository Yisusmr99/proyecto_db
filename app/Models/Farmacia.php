<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Farmacia extends Model
{
  use HasFactory;

  protected $fillable = [
    'sede_id', 'nombre'
  ];

  public function sede()
  {
    // return $this->hasOne('App\Models\Sede', 'id', 'sede_id');
    return $this->hasOne(Sede::class, 'id', 'sede_id');
  }

}
