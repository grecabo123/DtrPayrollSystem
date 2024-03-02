<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ActivityLogs;
use App\Models\TimePeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TimePeriodController extends Controller
{
    //

    public function TimePeriodData(){

        $data = TimePeriod::orderBy('time_period_name','ASC')->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function AddTimePeriod (Request $request){

        $validate = Validator::make($request->all(), [
            "time_name"         =>          "required",
            "time_num"         =>          "required",
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"             =>          $validate->messages(),
            ]);
        }
        else{

            $time = new TimePeriod;
            $time->time_period_name = $request->time_name;
            $time->time_mins = $request->time_num;
            $time->save();

            $logs = new ActivityLogs;
            $logs->description = "Time Period"."".$request->time_name." "."has been added";
            $logs->user_fk = $request->user_fk;
            $logs->save();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function UpdateTimeData(Request $request){

        $data = TimePeriod::find($request->id);

        if($data) {
            $data->time_period_name = $request->time_name;
            $data->time_mins = $request->time_num;
            $data->update();

            $logs = new ActivityLogs;
            $logs->description = "Time Period Update from".$data->time_period_name. "to".$request->time_name;
            $logs->user_fk = $request->user_fk;
            $logs->save();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function RemoveTimeData($id){

        $data = TimePeriod::find($id);
        
        if($data) {
            $data->delete();
            return response()->json([
                "status"            =>          200,
            ]);
        }
    }


}
