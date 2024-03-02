<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimePeriod extends Model
{
    use HasFactory;

    protected $table = "tbl_time_period";

    protected $fillable = [
        "time_period_name",
        "time_mins",
    ];
}
