<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function loginWithGoogle()
    {
        return Socialite::driver('google')->redirect()->getTargetUrl();
        // return Socialite::driver('google')->redirect();
    }

    public function callbackFromGoogle()
    {
        try {
            $user = Socialite::driver('google')->stateless()->user();

            // Check @yju.ac.kr
            if (explode('@', $user->getEmail())[1] != 'g.yju.ac.kr') {
                // throw new Exception('not school acount!');
                return response()->json([
                    'error' => 'Not school acount!',
                ], 403);
            }

            // Check Users Email If Already There
            $is_user = User::where('email', $user->getEmail())->first();
            if (!$is_user) {

                $saveUser = User::updateOrCreate([
                    'google_id' => $user->getId(),
                ], [
                    'name' => $user->getName(),
                    'email' => $user->getEmail(),
                    'position' => 'korean',
                    'password' => Hash::make($user->getName() . '@' . $user->getId())
                ]);
            } else {
                $saveUser = User::where('email',  $user->getEmail())->update([
                    'google_id' => $user->getId(),
                ]);
                $saveUser = User::where('email', $user->getEmail())->first();
            }

            Auth::login($saveUser);

            return response()->json([
                'user' => $saveUser,
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
