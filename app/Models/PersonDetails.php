<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonDetails extends Model
{
    use HasFactory;

    protected $table = "tbl_person_details";

    protected $fillable = [
        "current_adr",
        "perma_adr",
        "contact",
        "birthdate",
        "user_fk",
    ];
}
