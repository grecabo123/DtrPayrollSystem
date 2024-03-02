<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\EmailSystem;
use App\Models\ActivityLogs;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class EmailController extends Controller
{
    public function SendEmail (Request $request){

        $validate = Validator::make($request->all(), [
            "email"             =>          "required|email",
            "subject"             =>         "required",
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"             =>              $validate->messages(),
            ]);
        }
        else{

            $user = User::where('email',$request->email)->first();

            if($user) {
                $email = new EmailSystem;
                $email->message_code = md5(time()."".$user->id);
                $email->subject = $request->subject;
                $email->text = $request->text_;
                $email->user_fk_to = $user->id;
                $email->user_fk_from = $request->user_fk;
                $email->save();

                $logs = new ActivityLogs;
                $logs->description = "Send Resignation Letter to" .$request->email;
                $logs->user_fk = $request->user_fk;
                $logs->save();

                return response()->json([
                    "status"            =>          200,
                ]);
            }
            else{
                return response()->json([
                    "status"                =>          504,
                    "error"                 =>          "Email Does Exist",
                ]);
            }
        }
    }

    public function FetchMessage($id){
    
        $data = EmailSystem::where('user_fk_to',$id)->orderBy('created_at','DESC')->get();

        return response()->json([
            "status"            =>          200,
            "inbox"              =>          $data,
        ]);
    }
}
