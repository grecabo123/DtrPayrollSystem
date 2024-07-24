<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeRecord extends Model
{
    use HasFactory;

    protected $table  = "tbl_time_record";

    protected $fillable = [
        "user_fk",
        "time_in",
        "lunch_break_in",
        "lunch_break_out",
        "time_out",
        "is_holiday",
        "is_rest_day",
    ];
}
