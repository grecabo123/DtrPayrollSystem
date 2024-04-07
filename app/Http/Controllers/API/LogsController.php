<?php

namespace App\Http\Controllers\API;

use App\Models\EmailSystem;
use App\Models\ActivityLogs;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Events\NotificationCountUpdated;

class LogsController extends Controller
{
    //
    public function Logs($id){

        $logs = ActivityLogs::where('user_fk',$id)->orderBy('created_at','DESC')->get();
        $count = EmailSystem::selectRaw('count(user_fk_to) as total')->where('user_fk_to',$id)->get();
        event(new NotificationCountUpdated($count));
        // event(new )

        return response()->json([
            "status"            =>          200,
            "data"              =>          $logs,
            // "count"             =>          $count,
        ]);
    }
}
