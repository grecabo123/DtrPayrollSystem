<?php

namespace App\Http\Controllers\API;

use App\Models\CompanyInfo;
use App\Models\Contribution;
use App\Models\Employee;
use App\Models\PersonDetails;
use App\Models\User;
use App\Models\Department;
use App\Models\NumberDays;
use App\Models\ActivityLogs;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{

    public function AdminDashboard (){

        $employee = User::join('tbl_employee','tbl_employee.user_fk','=','users.id')
                ->join('tbl_company_info','tbl_company_info.id','=','tbl_employee.company_fk')
                ->selectRaw('users.first_name,users.id,users.name,users.email,tbl_employee.specific_role,
                users.role,users.status,users.created_at,tbl_company_info.company_code,tbl_employee.employee_code')
            ->orderBy('users.first_name')->where('users.role',"!=",1)->get();

        return response()->json([
            "status"            =>          200,
            "employee"          =>          $employee,
        ]);
    }

    //
    public function FetchData(){
        $data = Department::orderBy('department','ASC')->get();

        return response()->json([
            "status"                =>          200,
            "data"                  =>          $data,
        ]);
    }
    public function FetchDataStatus(){
        $data = Department::where('status',1)->orderBy('department','ASC')->get();
        $total_days = NumberDays::first();

        return response()->json([
            "status"                =>          200,
            "data"                  =>          $data,
            "days"                  =>          $total_days,
        ]);
    }
    

    public function AddDepartment (Request $request) {

        $validate  = Validator::make($request->all(), [
            "department"            =>          "required",
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"             =>          $validate->messages(),
            ]);
        }
        else{
            $dept = new Department;
            $dept->department = $request->department;
            $dept->status = 1;
            $dept->save();

            $logs = new ActivityLogs;

            $logs->description = $request->department." "."Created";
            $logs->user_fk = $request->id;
            $logs->save();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function UpdateStatus(Request $request){

        $data = Department::where('id',$request->id)->first();

        if($data) {
            $data->status = $request->status;
            $data->update();
            $logs = new ActivityLogs;
            $logs->description = $data->department . " Change Status into " . ($data->status == 1 ? "Active" : "Deactive");
            $logs->user_fk = $request->user_fk;
            $logs->save();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }
    public function Days(){
        $days = NumberDays::all();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $days,
        ]);
    }

    public function UpdateDays(Request $request){

        $data = NumberDays::find($request->id);

        if($data) {
            $data->days = $request->days;
            $data->update();

            $logs = new ActivityLogs;
            $logs->description = "Number of Days in System has been updated";
            $logs->user_fk = $request->user_fk;
            $logs->save();

            return response()->json([
                "status"        =>          200,
            ]);
        }
    }

    public function AddDays (Request $request){

        $count = NumberDays::all();

        if($count->count() > 0){
            return response()->json([
                "status"            =>          204,
            ]);
        }
        else{
            $days = new NumberDays;
    
            $days->days = $request->days;
            $days->save();
    
            $logs = new ActivityLogs;
            $logs->description = $request->days." "."Registered in System";
            $logs->user_fk = $request->user_fk;
            $logs->save();
    
            return response()->json([
                "status"            =>          200,
            ]);

        }

    }

    public function DeleteDepartment($id){
        $data = Department::find($id);

        if($data) {
            $data->delete();
            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function RegisterEmployee(Request $request){

        $validate = Validator::make($request->all(), [
            ""
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"         =>          $validate->messages(),
            ]);
        }
        else{

            $company_code = CompanyInfo::first();

            $user = new User;
            $user->name = $request->fname." ".$request->mname." ".$request->lname;
            $user->first_name = $request->fname;
            $user->middle_name = $request->mname;
            $user->last_name = $request->lname;
            $user->email = $request->email;
            $user->role = 4;
            $user->status = 1;
            $user->password = Hash::make($request->lname);
            $user->secretkey = $request->lname;
            $user->save();

            $person = new PersonDetails;
            $person->current_adr = $request->current_adr;
            $person->perma_adr = $request->perma_adr;
            $person->contact = $request->contact;
            $person->birthdate = $request->birthdate;
            $person->user_fk = $user->id;
            $person->save();

            $employee = new Employee;
            $employee->employee_code = $request->year.'-'.'00'.$user->id;
            $employee->department_fk = $request->department;
            $employee->specific_role = $request->specific_role;
            $employee->monthly = $request->monthly;
            $employee->per_day = $request->salary;
            $employee->company_fk = $company_code->id;
            $employee->user_fk = $user->id;
            $employee->save();

            $contribution = new Contribution;
            $contribution->sss = $request->sss;
            $contribution->philhealth = $request->philhealth;
            $contribution->pagibig = $request->pagibig;
            $contribution->tin = $request->tin;
            $contribution->user_fk = $user->id;
            $contribution->save();

            $logs = new ActivityLogs;
            $logs->description = "Registered"." ".$request->fname." ".$request->mname." ".$request->lname;
            $logs->user_fk = $request->user_fk;
            $logs->save();

            return response()->json([
                "status"            =>          200,
            ]);

        }

    }

    public function CompanyInfo(){

        $data = CompanyInfo::first();
        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function RegisterCompanyInfo(Request $request){

        $company = new CompanyInfo;
        $company->company_logo = $request->company_logo;
        $company->company_color = $request->company_color;
        $company->company_name = $request->company_name;
        $company->company_code = $request->company_code;
        $company->company_tagline = $request->company_tagline;
        $company->save();

        $logs = new ActivityLogs;
        $logs->description = "Registered Comapny Details";
        $logs->user_fk = $request->user_fk;
        $logs->save();


        return response()->json([
            "status"            =>          200,
        ]);
    }

    public function UpdateInfo(Request $request){
        
        $data = CompanyInfo::find($request->id);

        if($data){
            $data->company_name = $request->company_name;
            $data->company_code = $request->company_code;
            $data->company_tagline = $request->company_tagline;
            $data->update();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }
}
