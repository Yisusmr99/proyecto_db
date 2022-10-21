<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SedeController;
use App\Http\Controllers\EspecialidadController;
use App\Http\Controllers\LaboratorioController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\FarmaciaController;
use App\Http\Controllers\CajaController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\CitaController;

Route::resource('sede', SedeController::class);
Route::resource('especialidad', EspecialidadController::class);
Route::resource('laboratorio', LaboratorioController::class);
Route::resource('cliente', ClienteController::class);
Route::resource('farmacia', FarmaciaController::class);
Route::resource('caja', CajaController::class);
Route::resource('doctor', DoctorController::class);
Route::resource('cita', CitasController::class);

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
