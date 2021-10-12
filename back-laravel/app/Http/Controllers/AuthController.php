<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Throwable;

class AuthController extends Controller
{
    public function createForeignUser()
    {
    }

    public function login()
    {
    }

    public function logout()
    {
        Auth::guard('web')->logout();
    }
}
