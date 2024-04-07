<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CompanyInfo;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    //

    public function CompanyDetails(){

        $data = CompanyInfo::find(1);

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }
}
