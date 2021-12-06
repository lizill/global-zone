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
        // 신청한 사람이 4명 이상이면 신청 불가
        $whoBookedThisSchedule = Reservation::where('schedule_id', $request->scheduleId)->get();
        if (count($whoBookedThisSchedule) >= 4) {
            return response()->json('예약 가능한 인원을 초과하였습니다.', 403);
        }

        // 내가 신청한 예약들 시간대와 같은 시간대가 있으면 신청 불가
        $myReservationsDate = Reservation::join('schedules', 'reservations.schedule_id', '=', 'schedules.id')
            ->where('reservations.user_id', Auth::user()->id)
            ->where('schedules.date', $request->scheduleDate)
            ->get();

        if (count($myReservationsDate) != 0) {
            return response()->json('이미 예약된 시간대 입니다.', 403);
        }

        $reservation = new Reservation;
        $reservation->user_id = Auth::user()->id;
        $reservation->schedule_id = $request->scheduleId;
        $reservation->save();

        return $reservation;
    }

    // 예약 신청내역
    public function reservations(Request $request)
    {
        $myReservations = Reservation::with(array('schedule' => function ($query) {
            $query->orderBy('date');
        }))->get();

        return $myReservations;
    }

    public function delete(Request $request, Reservation $reservation)
    {
        $reservation->delete();

        return response()->json([
            'message' => 'delete success!'
        ]);
    }

    // 해당 스케줄 예약한 사람 리스트
    public function reservationUsers(Request $request, Schedule $schedule)
    {
        $reservationUsers = Reservation::with('user')
            ->where('reservations.schedule_id', $schedule->id)
            ->get();

        return $reservationUsers;
    }

    // 예약신청 수락
    public function accept(Request $request)
    {
        $reservation = Reservation::find($request->id);
        $reservation->confirmed = true;
        $reservation->save();

        return response()->json([
            'message' => 'accept success!'
        ]);
    }

    // 출석 체크
    public function check(Request $request)
    {
        $reservation = Reservation::find($request->id);
        $reservation->finished = !$reservation->finished;
        $reservation->save();

        return response(200);
    }
}
