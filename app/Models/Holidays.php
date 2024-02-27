<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Holidays extends Model
{
    use HasFactory;

    protected $table = "tbl_holidays";

    protected $fillable = [
        "holiday_name",
        "rate_day",
        "holiday_date",
        "type_holiday",
    ];
}
