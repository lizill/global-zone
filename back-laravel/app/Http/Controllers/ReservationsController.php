<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ReservationsController extends Controller
{
    // 예약 신청
    public function reservation(Request $request)
    {
        // 내 예약중에서 같은 시간대의 예약 불가능
//         $myReservations = Reservation::where('user_id', Auth::user()->id)->with('schedule')->get();

        $reservation = new Reservation;
        $reservation->user_id = Auth::user()->id;
        $reservation->schedule_id = $request->scheduleId;
        $reservation->save();

        return $reservation;
    }

    // 예약 신청내역
    public function reservations(Request $request)
    {
        $myReservations = Reservation::with('schedule.user')
        ->where('user_id', Auth::user()->id)
        ->where('finished', false)
        ->get();

        return $myReservations;
    }

    public function delete(Request $request, Reservation $reservation)
    {
        $reservation->delete();

        return response()->json([
            'message' => 'delete success!'
        ]);
    }
}
