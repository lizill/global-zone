<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class UsersController extends Controller
{
  // get foreign list
  public function foreign()
  {
    $foreignList = User::whereIn('position', ['en', 'ja', 'ch'])
      ->orderBy('email', 'desc')
      ->get();

    return $foreignList;
  }

  // get user info
  public function user(Request $request)
  {
    return $request->user();
  }
}
