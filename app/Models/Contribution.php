<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contribution extends Model
{
    use HasFactory;

    protected $table = "tbl_contribution";

    protected $fillable = [
        "sss",
        "pagibig",
        "philhealth",
        "tin",
        "user_fk",
    ];
}
