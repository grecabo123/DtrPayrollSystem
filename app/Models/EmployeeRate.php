<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeRate extends Model
{
    use HasFactory;

    protected $table = "tbl_employee_rate";

    protected $fillable = [
        "core_id",
        "user_employee_fk",
        "user_employeer_fk",
        "comments",
    ];
}
