<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\EvaluationCore;
use Illuminate\Http\Request;

class EvaluationController extends Controller
{
    //

    public function EvaluationForm(){

        $eval = EvaluationCore::orderBy('id','ASC')->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $eval,
        ]);
    }
}
