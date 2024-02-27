<?php

namespace App\Http\Controllers\API;

use App\Models\ActivityLogs;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LogsController extends Controller
{
    //
    public function Logs($id){

        $logs = ActivityLogs::where('user_fk',$id)->orderBy('created_at','DESC')->get();
        
        return response()->json([
            "status"            =>          200,
            "data"              =>          $logs,
        ]);
    }
}
