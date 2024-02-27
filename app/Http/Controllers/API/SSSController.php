<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ActivityLogs;
use App\Models\SSSData;
use Illuminate\Http\Request;

class SSSController extends Controller
{
    //

    public function SSSRegister(Request $request){

        $sss = new SSSData;

        $sss->rangefrom = $request->rangefrom;
        $sss->rangeto = $request->rangeto;
        $sss->ER = $request->erdata;
        $sss->EE = $request->eedata;
        $sss->total = $request->total_;
        $sss->save();

        $logs = new ActivityLogs;
        $logs->description = "SSS Contribution Added"." ".$request->rangefrom." - ".$request->rangeto;
        $logs->user_fk = $request->user_fk;
        $logs->save();

        return response()->json([
            "status"                =>              200,
        ]);
    }

    public function SSSContribution(){
        $data = SSSData::orderBy('rangefrom','ASC')->get();

        return response()->json([
            "status"                =>              200,
            "data"                  =>              $data,
        ]);
    }

    public function SSSContributionUpdate(Request $request){
        $data = SSSData::find($request->id);

        if($data){
            $data->rangefrom = $request->from;
            $data->rangeto = $request->to;
            $data->ER = $request->er;
            $data->EE = $request->ee;
            $data->total = $request->er + $request->ee;
            $data->update();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function SSSContributionRemove($id){

        $data = SSSData::find($id);
        
        if($data) {
            $data->delete();
            return response()->json([
                "status"            =>          200,
            ]);
        }
    }
}
