<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EvaluationCore extends Model
{
    use HasFactory;
    protected $table = "tbl_core";
    protected $fillable = [
        "CoreName",
        "description",
    ];
}
