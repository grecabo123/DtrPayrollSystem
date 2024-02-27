<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SSSData extends Model
{
    use HasFactory;

    protected $table = "tbl_sss";

    protected $fillable = [
        "rangefrom",
        "rangeto",
        "ER",
        "EE",
        "total",
    ];
}
