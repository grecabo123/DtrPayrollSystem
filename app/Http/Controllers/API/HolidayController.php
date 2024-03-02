<?php

namespace App\Http\Controllers\API;

use App\Models\Holidays;
use Illuminate\Http\Request;
use App\Models\CalendarEvents;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class HolidayController extends Controller
{

    public function AddHoliday (Request $request){

        $validate = Validator::make($request->all(), [
            "holiday"           =>          "required",
            "rate"              =>          "required",
            "date_"             =>          "required",
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"             =>          $validate->messages(),
            ]);
        }
        else{
            $holiday = new Holidays;
            $holiday->holiday_name = $request->holiday;
            $holiday->rate_day = $request->rate;
            $holiday->holiday_date = $request->date_;
            $holiday->type_holiday = $request->type == 1 ? 1 : 2;
            $holiday->save();

            $event = new CalendarEvents;
            $event->date_event = $request->date_;
            $event->event_title = $request->holiday;
            $event->type_event = $request->type == 1 ? "Legal Holiday" : "Special Holiday";
            $event->save();

            return response()->json([
                "status"                =>          200,
            ]);
        }
    }

    public function LegalHoliday (){
        $data = Holidays::where('type_holiday',1)->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function SpecialHoliday (){
        $data = Holidays::where('type_holiday',2)->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function UpdateHoliday (Request $request){
        $data = Holidays::find($request->id);

        if($data) {
            $data->holiday_name = $request->name;
            $data->rate_day = $request->rate;
            $data->holiday_date = $request->new_date;

            $data->update();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function RemoveHoliday ($id){
        $data = Holidays::find($id);

        if($data) {
            $data->delete();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }
}
