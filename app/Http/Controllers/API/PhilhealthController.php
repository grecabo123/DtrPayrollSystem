<?php

namespace App\Http\Controllers\API;

use App\Models\Philhealth;
use App\Models\ActivityLogs;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PhilhealthController extends Controller
{
    //
    public function PhilhealthRegister (Request $request){

        $pagibig = new Philhealth;
                    
        $pagibig->from = $request->rangefrom;
        $pagibig->to = $request->rangeto;
        $pagibig->premium_rate = $request->eedata;
        $pagibig->save();

        $logs = new ActivityLogs;
        $logs->description = "Philhealth Contribution Added"." ".$request->from." - ".$request->to;
        $logs->user_fk = $request->user_fk;
        $logs->save();

        return response()->json([
            "status"            =>          200,
        ]);
        
    }

    public function PhilhealthContribution (){
        $data = Philhealth::orderBy('from','ASC')->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function PhilhealthContributionUpdate (Request $request){
        $data = Philhealth::find($request->id);
    
        if($data) {
            $data->from = $request->from;
            $data->to = $request->to;
            $data->premium_rate = $request->ee;
            $data->update();

            $logs = new ActivityLogs;
            $logs->description = "Philhealth Data Updated";
            $logs->user_fk = $request->user_fk;            
            $logs->save();

            return response()->json([
                "status"                =>          200,
            ]);
        }
    }

    public function PhilhealthContributionRemove ($id){
        $data = Philhealth::find($id);
        if($data) {
            $data->delete();
            return response()->json([
                "status"                =>          200,
            ]);
        }
    }
}
