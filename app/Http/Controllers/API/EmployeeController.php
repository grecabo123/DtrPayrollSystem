<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ActivityLogs;
use App\Models\EmailSystem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    //
    public function PersonDetails ($id){

        $person_details = User::join('tbl_employee','tbl_employee.user_fk','=','users.id')
            ->join('tbl_department','tbl_department.id','=','tbl_employee.department_fk')
                ->join('tbl_person_details','tbl_person_details.user_fk','=','users.id')
                    ->join('tbl_company_info','tbl_company_info.id','=','tbl_employee.company_fk')
                        ->join('tbl_contribution','tbl_contribution.user_fk','=','users.id')
                            ->selectRaw('users.name,users.email,users.first_name,users.middle_name,users.last_name,
                                tbl_employee.employee_code,tbl_employee.specific_role,tbl_employee.monthly,tbl_employee.per_day,
                                tbl_contribution.sss,tbl_contribution.pagibig,tbl_contribution.philhealth,tbl_contribution.tin,
                                tbl_department.department,tbl_person_details.current_adr,tbl_person_details.perma_adr,tbl_person_details.contact,
                                tbl_person_details.birthdate,tbl_company_info.company_code,tbl_employee.image_capture')
                                    ->where('users.id',$id)
                                        ->first();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $person_details,
        ]);
    }


  
}
