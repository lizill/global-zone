<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
  public function foreigns()
  {
    $foreigns = User::whereIn('position', ['en', 'ja', 'ch'])->get();

    return $foreigns;
  }

  public function user(Request $request)
  {
    return $request->user();
  }
}
