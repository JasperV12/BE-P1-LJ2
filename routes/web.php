<?php

use App\Http\Controllers\MagazijnController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/magazijn', [MagazijnController::class, 'index'])->name('magazijn.index');
    Route::get('/magazijn/leveringsinfo/{productId}', [MagazijnController::class, 'leveringsInfo'])->name('magazijn.leveringsinfo');
    Route::get('/magazijn/allergeeninfo/{productId}', [MagazijnController::class, 'allergeenInfo'])->name('magazijn.allergeeninfo');
});

require __DIR__.'/auth.php';

