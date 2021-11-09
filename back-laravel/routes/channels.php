<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// 로그인한 사용자
Broadcast::channel('chat.{roomId}', function ($user, $roomId) {
    // 로그인 한 사용자가 이 채널을 구독할 수 있는지 여부를
    // true, false로 리턴하면 된다.
    if (Auth::check()) { // 로그인한 사용자인지 다시 체크
        return true;
    }
});
