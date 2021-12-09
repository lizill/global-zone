<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function createForeignUser(Request $request)
    {
        // 관리자인지 확인
        if ($request->user()->can('create')) {
            abort(403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8|max:255',
            'position' => 'required|string|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 422);
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

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|max:255',
            'password' => 'required|string|min:8|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $is_user = User::where('email', $request->email)->first();
        if ($is_user) {
            Auth::login($is_user);
            return response()->json(['message' => 'login success!']);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function logout()
    {
        Auth::guard('web')->logout();
    }
}
