<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
  public function foreigns()
  {
    $foreigns = User::whereIn('position', ['american', 'japanese', 'chinese'])->get();

    return $foreigns;
  }
}
