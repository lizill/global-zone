<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\SchedulesController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ReservationsController;
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

Route::middleware(['guest', 'cors'])->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login']); // POST /auth/login

    Route::get('/google/login', [GoogleController::class, 'loginWithGoogle'])->name('login'); // GET /google/login
    Route::get('/google/callback', [GoogleController::class, 'callbackFromGoogle'])->name('callback');
});

Route::middleware(['auth:sanctum'])->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']); // POST /auth/logout

    // Schedules
    Route::get('/schedules', [SchedulesController::class, 'schedules']); // GET /schedules
    Route::get('/schedule/{schedule}', [SchedulesController::class, 'schedule']); // GET /schedule
    Route::patch('/schedule/enter', [SchedulesController::class, 'enter']); // PATCH /schedule/enter
    Route::get('/schedules/foreign', [SchedulesController::class, 'foreign']); // GET /schedules/foreign
    Route::delete('/schedule/{schedule}', [SchedulesController::class, 'delete']); // DELETE /schedule/22

    // Users
    Route::get('/user', [UsersController::class, 'user']); // GET /user

    // Reservation
    Route::post('/reservation', [ReservationsController::class, 'reservation']); // POST /reservation
    Route::get('/reservations', [ReservationsController::class, 'reservations']); // GET /reservations
    Route::delete('/reservation/{reservation}', [ReservationsController::class, 'delete']); // DELETE /reservation/22
    Route::get('/reservations/{schedule}', [ReservationsController::class, 'reservationUsers']); // GET /reservations/22
    Route::patch('/reservation', [ReservationsController::class, 'accept']); // PATCH /reservation
    Route::patch('/reservation/check', [ReservationsController::class, 'check']); // PATCH /reservation/check

    // -----admin-----
    // Auth
    Route::post('/auth/register', [AuthController::class, 'createForeignUser']); // POST /auth/register

    // Schedules
    Route::post('/schedule', [SchedulesController::class, 'updateOrCreate']); // POST /schedule

    // Users
    Route::get('/users/foreign', [UsersController::class, 'foreign']); // GET /users/foreign
});
