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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/google/login', [GoogleController::class, 'loginWithGoogle'])->name('login');
Route::any('/google/callback', [GoogleController::class, 'callbackFromGoogle'])->name('callback');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // admin
    Route::post('/auth/register', [AuthController::class, 'createForeignUser']);

    Route::post('/schedule', [SchedulesController::class, 'schedule']);

    Route::get('/users/foreign', [UsersController::class, 'foreigns']);
});
