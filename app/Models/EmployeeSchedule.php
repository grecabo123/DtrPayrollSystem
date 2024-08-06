<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeSchedule extends Model
{
    use HasFactory;

    protected $table = "tbl_schedule";
    protected $fillable = [
        "schedule_name",
        "user_fk",
        "monday_start",
        "monday_end",
        "tuesday_start",
        "tuesday_end",
        "wednesday_start",
        "wednesday_end",
        "thursday_start",
        "thursday_end",
        "friday_start",
        "friday_end",
        "saturday_start",
        "saturday_end",
        "sunday_start",
        "sunday_end",
        "lunch_start",
        "lunch_end",
    ];
}
