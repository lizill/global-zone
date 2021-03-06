<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class SchedulesController extends Controller
{
    // create or update schedule
    public function updateOrCreate(Request $request)
    {
        // 관리자인지 확인
        if ($request->user()->can('create')) {
            abort(403);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|max:255',
            'date' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        // 이전 스케줄 삭제 후 새롭게 생성
        if ($request->id) {
            Schedule::find($request->id)->delete();
        }

        $schedule = Schedule::create([
            'user_id' => $request->user_id,
            'date' => $request->date,
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
            ->orderBy('date')
            ->with('user', 'reservations')
            ->get();

        return $schedules;
    }

    // read schedule
    public function schedule(Request $request, Schedule $schedule)
    {
        return $schedule->fresh('user', 'reservations');
    }

    // update password
    public function enter(Request $request)
    {
        $addedTime = Carbon::now()->addMinutes(10)->format('YmdHi');
        $schedule = Schedule::find($request->id);

        // 10분전 부터 입장
        if ($schedule->date > $addedTime) {
            return response()->json('10분전 부터 입장할 수 있습니다.', 403);
        }

        // 비밀번호가 있으면 반환, 없으면 생성 후 반환
        if (!$schedule->password) {
            $schedule->password = Str::random(8) . '_' . $schedule->date;
            $schedule->save();
        }

        // 비밀번호가 저장된 스케줄 전송 후 해당 방으로 입장
        return $schedule;
    }

    // get foreign schedules
    public function foreign()
    {
        // 오늘 이후의 내 스케줄 리스트
        $today = Carbon::now()->format('Ymd');
        $schedules = Schedule::where('date', '>=', $today)
            ->where('user_id', Auth::user()->id)
            ->orderBy('date')
            ->with('user', 'reservations')
            ->get();

        return $schedules;
    }

    // delete schedule
    public function delete(Request $request, Schedule $schedule)
    {
        // 관리자인지 확인
        if ($request->user()->can('delete')) {
            abort(403);
        }

        $schedule->delete();

        return response()->json([
            'message' => 'delete success!'
        ]);
    }
}
