<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserControl;
use Illuminate\Http\Request;

class AccessController extends Controller
{
    //

    public function UpdateAccess($id){

        $control = User::join('tbl_user_control','tbl_user_control.user_fk','=','users.id')
            ->selectRaw('users.status,tbl_user_control.task_access,tbl_user_control.task_monitor,tbl_user_control.create_announcement,
            tbl_user_control.create_meeting,users.id')
        ->where('users.id',$id)->first();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $control,
        ]);
    }


    public function EditAccess(Request $request){

        $user = User::find($request->user_fk);
        $access = UserControl::where('user_fk',$request->user_fk)->first();

        if($user && $access){
            $user->status = $request->lock_status == true ? 0 : 1;
            $user->update();

            $access->task_access = $request->task == 1 ? 0 : 1;
            $access->task_monitor = $request->monitor == 1 ? 0 : ($request->monitor === null ? 0 : 1);
            $access->create_announcement = $request->announce == false ? 0 : 1;
            $access->create_meeting = $request->meeting == false ? 0 : 1;

            $access->update();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }
}
