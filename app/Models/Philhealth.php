<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Philhealth extends Model
{
    use HasFactory;

    protected $table = "tbl_philhealth";

    protected $fillable = [
        "from",
        "to",
        "premium_rate",
    ];
}
