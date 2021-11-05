<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class UsersController extends Controller
{
  public function foreign()
  {
    $foreignList = User::whereIn('position', ['en', 'ja', 'ch'])->get();

    return $foreignList;
  }

  public function user(Request $request)
  {
    return $request->user();
  }
}
