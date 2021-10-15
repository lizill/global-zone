<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Throwable;

class AuthController extends Controller
{
    public function createForeignUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8|max:255',
            'position' => 'required|string|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'position' => $request->position
        ]);

        return response()->json([
            'message' => 'sign up success',
        ]);
    }

    public function login()
    {
        // $token = $user->createToken();
        // return $this->respondWithToken($token);
    }

    public function logout()
    {
        Auth::guard('web')->logout();
    }
}
