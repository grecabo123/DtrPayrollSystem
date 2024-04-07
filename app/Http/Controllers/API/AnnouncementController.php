<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AnnouncementController extends Controller
{
    //

    public function CreateAnnounement (Request $request){

          // Memo
          if($request->type_annoucement == 1) {
                $validate = Validator::make($request->all(), [
                    "title"                     =>          "required",
                    "description"               =>          "required",
                    "type_annoucement"          =>          "required",
                    "address_to"                =>          "required",
                    "file_upload"               =>          "required|mimes:png,pdf,jpg",
                ]);

                if($validate->fails()) {
                    return response()->json([
                        "error"                 =>          $validate->messages(),
                    ]);
                }
          }
          // Meeting Link
          else{
                $validate = Validator::make($request->all(), [
                    "title"                     =>          "required",
                    "description"               =>          "required",
                    "meeting_link"          =>          "required",
                    "address_to"                =>          "required",

                ]);

                if($validate->fails()) {
                    return response()->json([
                        "error"                 =>          $validate->messages(),
                    ]);
                }
          }

      

        

    }
}
