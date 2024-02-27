<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pagibig extends Model
{
    use HasFactory;

    protected $table = "tbl_pagibig";
    protected $fillable = [
        "from",
        "to",
        "employee_share",
        "employers_share",
    ];
}
