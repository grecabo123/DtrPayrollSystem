<?php

namespace App\Http\Controllers\API;

use App\Models\EmployeeType;
use App\Models\User;
use App\Models\Employee;
use App\Models\Department;
use App\Models\NumberDays;
use App\Models\CompanyInfo;
use App\Models\ActivityLogs;
use App\Models\Contribution;
use App\Models\UserControl;
use Illuminate\Http\Request;
use App\Models\PersonDetails;
use App\Models\EvaluationCore;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{

    public function AdminDashboard (){

        $employee = User::join('tbl_employee','tbl_employee.user_fk','=','users.id')
                ->join('tbl_company_info','tbl_company_info.id','=','tbl_employee.company_fk')
                ->selectRaw('users.first_name,users.id,users.name,users.email,tbl_employee.specific_role,
                users.role,users.status,users.created_at,tbl_company_info.company_code,tbl_employee.employee_code,tbl_employee.image_capture')
            ->orderBy('users.first_name')->where('users.role',"!=",1)->get();

        return response()->json([
            "status"            =>          200,
            "employee"          =>          $employee,
        ]);
    }

    //
    public function FetchDataAll(){
        $data = Department::orderBy('department','ASC')->get();
        $users = User::join('tbl_employee','tbl_employee.user_fk','=','users.id')->where('users.status', 1)
            ->selectRaw('users.id,users.name,tbl_employee.image_capture')
                ->whereIn('users.role', [2, 3, 4])
                    ->orderBy('users.name','ASC')
                        ->get();


        return response()->json([
            "status"                =>          200,
            "data"                  =>          $data,
            "users"                 =>          $users,
        ]);
    }
    public function FetchDataStatus(){
        $data = Department::where('status',1)->orderBy('department','ASC')->get();
        $total_days = NumberDays::first();
        $employee = EmployeeType::where('status',1)->orderBy('employee_type','ASC')->get();

        return response()->json([
            "status"                =>          200,
            "data"                  =>          $data,
            "days"                  =>          $total_days,
            "employee"              =>          $employee,
        ]);
    }
    

    public function AddDepartment (Request $request) {

        $validate  = Validator::make($request->all(), [
            "department"            =>          "required|unique:tbl_department,department",
        ]);

        if($validate->fails()) {
            return response()->json([
                "status"            =>          404,
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
            "fname"                 =>          "required",
            "lname"                 =>          "required",
            "current_adr"           =>          "required",
            "perma_adr"             =>          "required",
            "contact"               =>          "required",
            "birthdate"             =>          "required",
            "email"                 =>          "required|email|unique:users,email",
            "department"            =>          "required",
            "specific_role"         =>          "required",
            "salary"                =>          "required",
            "employee_type"         =>          "required",
        ],[
            "fname.required"            =>          "First Name field is required",
            "lname.required"            =>          "Last Name field is required",
            "current_adr.required"      =>          "Current Address feild is required",
            "perma_adr.required"        =>          "Permanent Address feild is required",
            "contact.required"          =>          "Contact feild is required",
            "birthdate.required"        =>          "Birthdate field is required",
            "department.required"       =>          "Departemnt field is required",
            "specific_role.required"    =>      "Specific Role field is required",
            "salary.required"           =>          "Salary field is required",
            "employee_type.required"    =>      "Employee Type field is required",
            
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
            $employee->image_capture = $request->capture;
            $employee->department_fk = $request->department;
            $employee->specific_role = $request->specific_role;
            $employee->monthly = $request->monthly;
            $employee->per_day = $request->salary;
            $employee->company_fk = $company_code->id;
            $employee->user_fk = $user->id;
            $employee->employee_type_fk = $request->employee_type;
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

            $user_control = new UserControl;
            $user_control->user_fk = $user->id;
            $user_control->save();

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
            if($request->hasFile('company_logo')){

                $path = $data->company_logo;
                if(File::exists($path)){
                    File::delete($path);
                }

                $file = $request->file('company_logo');
                $extension = $file->getClientOriginalExtension();
                $filename = $data->company_name.".".$extension;
                $file->move('Uploads/Logo/',$filename);
                $data->company_logo = "Uploads/Logo/".$filename;
            }
            $data->update();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }


    public function AllUsers (){

        $users = User::where('status', 1)->whereIn('role', [2, 3, 4])->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $users,
        ]);
    }

    public function AddCore(Request $request){

        $validate = Validator::make($request->all(), [
            "core"                  =>          "required",
            "description"           =>          "required",
        ]);

        if($validate->fails()) {
            return response()->json([
                "error"         =>          $validate->messages(),
            ]);
        }
        else{

            $core = new EvaluationCore;
            $core->CoreName = $request->core;
            $core->description = $request->description;
            $core->save();

            $logs = new ActivityLogs;
            $logs->description = "Registered Core Name"." ".$request->core;
            $logs->user_fk = $request->user_fk;
            $logs->save();
            return response()->json([
                "status"            =>          200,
            ]);
        }
    }
    public function CoreData(){
        $data = EvaluationCore::orderBy('CoreName','ASC')->get();

        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);
    }

    public function UpdateCore(Request $request){

        $data = EvaluationCore::find($request->id);

        if($data) {

            $data->CoreName = $request->corename;
            $data->description = $request->description;
            $data->update();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function RemoveCore($id){
        $data = EvaluationCore::find($id);
        if($data) {
            $data->delete();
            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function AddEmployeeType(Request $request){

        $validate = Validator::make($request->all(), [
            "employee_type"             =>          "required|unique:tbl_employee_type,employee_type",
        ]);
        if($validate->fails()) {
            return response()->json([
                "error"             =>          $validate->messages(),
            ]);
        }
        else{
            $employee_type = new EmployeeType;
            $employee_type->employee_type = $request->employee_type;
            $employee_type->status = 1;
            $employee_type->save();

            $logs = new ActivityLogs;
            $logs->description = "Employee Type" . $request->employee_type . "Added";
            $logs->user_fk = $request->user_fk;
            $logs->save();

            return response()->json([
                "status"            =>          200,
            ]);
        }
    }

    public function EmployeeTypeList(){

        $data = EmployeeType::orderBy('employee_type','ASC')->get();
        return response()->json([
            "status"            =>          200,
            "data"              =>          $data,
        ]);

    }
}
