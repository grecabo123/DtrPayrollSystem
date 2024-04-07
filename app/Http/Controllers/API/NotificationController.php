<?php

namespace App\Http\Controllers\API;

use App\Models\EmailSystem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Events\NotificationCountUpdated;

class NotificationController extends Controller
{
    //

    public function CountMessage($id){
        $count = EmailSystem::selectRaw('count(user_from_fk) as total')->where('user_from_fk',$id)->get();
        event(new NotificationCountUpdated($count));
        return response()->json([
            "status"            =>          200,
            "data"              =>          $count,
        ]);


        
    }
}
