<?php

namespace App\Http\Controllers\API;

use App\Models\ActivityLogs;
use App\Models\Allowances;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AllowancesController extends Controller
{
    //

    public function AllowanceData (){

        $data = Allowances::orderBy('allowances_name','ASC')->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }
    public function AddAllowances (Request $request){

        $validate = Validator::make($request->all(), [
            "name_allowance"            =>          "required",
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"         =>          $validate->messages(),
            ]);
        }
        else{

            $allowances = new Allowances;
            $allowances->allowances_name = $request->name_allowance;
            $allowances->save();

            $logs = new ActivityLogs;
            $logs->description = "Allowances Added" ."". $request->name_allowances;
            $logs->user_fk = $request->user_fk;
            $logs->save();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function UpdateAllowanceData(Request $request){

        $data = Allowances::find($request->id);

        if($data) {
            $data->allowances_name = $request->allowances_name;
            $data->update();

            $logs = new ActivityLogs;
            $logs->description = "Update"." ".$request->allowance_name." "."to". $request->allowances_name;
            $logs->user_fk = $request->user_fk;
            $logs->save();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function RemoveAllowanceData ($id){

        $data = Allowances::find($id);

        if($data) {
            $data->delete();
            return response()->json([
                "status"            =>          200,
            ]);
        }
    }
}
