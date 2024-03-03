<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeAllowances extends Model
{
    use HasFactory;

    protected $table = "tbl_employee_allowances";

    protected $fillable = [
        "amount",
        "allowance_fk",
    ];
}
