<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CalendarEvents;
use Illuminate\Http\Request;

class EventController extends Controller
{

    public function AllEvent (){

        $data = CalendarEvents::all();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }
    //
}
