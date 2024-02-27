<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalaryPeriod extends Model
{
    use HasFactory;

    protected $table = "tbl_salary_period";

    protected $fillable = [
        "salary_period",
        "end_date",
        "from_date",
    ];
}
