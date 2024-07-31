<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $table = "tbl_employee";

    protected $fillable = [
        "department_fk",
        "specific_role",
        "monthly",
        "employee_code",
        "per_day",
        "user_fk",
        "employee_type_fk",
    ];
}
