<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeType extends Model
{
    use HasFactory;

    protected $table = "tbl_employee_type";
    protected $fillable = [
        "employee_type",
        "status",
    ];
}
