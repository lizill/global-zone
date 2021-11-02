<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class SchedulesController extends Controller
{
    // create or update schedule
    public function updateOrCreate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|max:255',
            'date' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        // 같은 사람의 같은 시간이 있을 경우 업데이트
        $schedule = Schedule::updateOrCreate([
            'user_id' => $request->user_id,
            'date' => $request->date,
        ], [
            'password' => random_int(100000, 999999)
        ]);

        return response()->json([
            'message' => 'create schedule success',
            'schedule' => $schedule,
        ]);
    }

    // read schedules list
    public function schedules()
    {
        // 다음날부터 일주일간 정보 불러오기
        $nextDate = Carbon::now()->addDay()->format('Ymd');
        $schedules = Schedule::where('date', '>=', $nextDate)
        ->with('user', 'reservations')
        ->get();

        return $schedules;
    }

    // read schedule
    public function schedule(Request $request, Schedule $schedule)
    {
        return $schedule->fresh('user', 'reservations');
    }
}
