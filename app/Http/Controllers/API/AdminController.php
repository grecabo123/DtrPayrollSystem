<?php

namespace App\Http\Controllers\API;

use App\Models\Department;
use App\Models\ActivityLogs;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    //
    public function FetchData(){
        $data = Department::orderBy('department','ASC')->get();

        return response()->json([
            "status"                =>          200,
            "data"                  =>          $data,
        ]);
    }
    public function FetchDataStatus(){
        $data = Department::where('status',1)->orderBy('department','ASC')->get();

        return response()->json([
            "status"                =>          200,
            "data"                  =>          $data,
        ]);
    }
    

    public function AddDepartment (Request $request) {

        $validate  = Validator::make($request->all(), [
            "department"            =>          "required",
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"             =>          $validate->messages(),
            ]);
        }
        else{
            $dept = new Department;
            $dept->department = $request->department;
            $dept->status = 1;
            $dept->save();

            $logs = new ActivityLogs;

            $logs->description = $request->department." "."Created";
            $logs->user_fk = $request->id;
            $logs->save();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function UpdateStatus(Request $request){

        $data = Department::where('id',$request->id)->first();

        if($data) {
            $data->status = $request->status;
            $data->update();
            $logs = new ActivityLogs;
            $logs->description = $data->department . " Change Status into " . ($data->status == 1 ? "Active" : "Deactive");
            $logs->user_fk = $request->user_fk;
            $logs->save();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }
}
