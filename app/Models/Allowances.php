<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Allowances extends Model
{
    use HasFactory;

    protected $table = "tbl_allowances";

    protected $fillable = [
        "allowances_name"
    ];
}
