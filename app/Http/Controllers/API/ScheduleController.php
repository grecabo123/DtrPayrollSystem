<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\EmployeeSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ScheduleController extends Controller
{
    //

    public function CreateSchedule(Request $request){

        $validate = Validator::make($request->all(), [
            "schedule_name"         =>          "required|unique:tbl_schedule,schedule_name",
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"             =>          $validate->messages(),
            ]);
        }
        else{
            
            
        }

        $sched = new EmployeeSchedule;

        $sched->schedule_name = $request->schedule_name;
    }
}
