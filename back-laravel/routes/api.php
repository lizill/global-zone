<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\SchedulesController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('guest')->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login']); // POST /auth/login

    Route::get('/google/login', [GoogleController::class, 'loginWithGoogle'])->name('login'); // GET /google/login
    Route::any('/google/callback', [GoogleController::class, 'callbackFromGoogle'])->name('callback');
});

Route::middleware(['auth:sanctum'])->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']); // POST /auth/logout

    // Schedules
    Route::get('/schedules', [SchedulesController::class, 'schedules']); // GET /schedules
    Route::get('/schedule/{schedule}', [SchedulesController::class, 'schedule']); // GET /schedule

    // Users
    Route::get('/user', [UsersController::class, 'user']); // GET /user

    // -----admin-----
    // Auth
    Route::post('/auth/register', [AuthController::class, 'createForeignUser']); // POST /auth/register

    // Schedules
    Route::post('/schedule', [SchedulesController::class, 'updateOrCreate']); // POST /schedule

    // Users
    Route::get('/users/foreign', [UsersController::class, 'foreigns']); // GET /users/foreign
});
