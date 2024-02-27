<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ActivityLogs;
use App\Models\Pagibig;
use Illuminate\Http\Request;

class PagibigController extends Controller
{
    //

   

    public function PagIbigRegister(Request $request){
        $pagibig = new Pagibig;
        
        $pagibig->from = $request->rangefrom;
        $pagibig->to = $request->rangeto;
        $pagibig->employee_share = $request->eedata;
        $pagibig->employers_share = $request->erdata;
        $pagibig->save();

        $logs = new ActivityLogs;
        $logs->description = "Pagibig Contribution Added"." ".$request->from." - ".$request->to;
        $logs->user_fk = $request->user_fk;
        $logs->save();

        return response()->json([
            "status"            =>          200,
        ]);
    }

    public function PagIbigContribution () {
        $data = Pagibig::orderBy('from','ASC')->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function PagIbigContributionUpdate (Request $request){

        $data = Pagibig::find($request->id);

        if($data) {
            $data->from = $request->from;
            $data->to = $request->to;
            $data->employee_share = $request->ee;
            $data->employers_share = $request->er;
            $data->update();

            $logs = new ActivityLogs;
            $logs->description = "Pagibig Contribution Update";
            $logs->user_fk = $request->user_fk;
            $logs->save();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function PagIbigContributionRemove ($id){

        $data = Pagibig::find($id);

        if($data) {
            $data->delete();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }
}
