<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ActivityLogs;
use App\Models\SalaryPeriod;
use Illuminate\Http\Request;

class SalaryPeriodController extends Controller
{
    //

    public function CreateSalary (Request $request) {

        $salary = new SalaryPeriod;

        $salary->salary_period = $request->text_sal;
        $salary->from_date = $request->from;
        $salary->end_date = $request->to;
        $salary->save();

        $logs = new ActivityLogs;
        $logs->description = "Created ".$request->text_sal;
        $logs->user_fk = $request->user_fk;
        $logs->save();

        return response()->json([
            "status"            =>          200,
        ]);
    }

    public function FetchSalary (){
        $data = SalaryPeriod::orderBy('from_date','ASC')->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function SalaryUpdate (Request $request){

        $data = SalaryPeriod::find($request->id);

        if($data) {
            $data->salary_period = $request->salary_text;
            $data->from_date = $request->from;
            $data->end_date = $request->to;
            $data->save();
    
            $logs = new ActivityLogs;
            $logs->description = "Updated Salary Period ".$request->text_sal;
            $logs->user_fk = $request->user_fk;
            $logs->save();

            return response()->json([
                "status"            =>          200,

            ]);
        }
    }

    public function SalaryRemove ($id){

        $data = SalaryPeriod::find($id);

        if($data) {
            $data->delete();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }
}
