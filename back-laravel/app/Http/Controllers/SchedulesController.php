<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SchedulesController extends Controller
{
    public function schedule(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|max:255',
            'date' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        // Schedule::create([
        //     'user_id' => $request->foreign_id,
        //     'date' => $request->start_date,
        //     'password' => random_int(100000, 999999),
        // ]);
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
}
