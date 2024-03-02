<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailSystem extends Model
{
    use HasFactory;

    protected $table = "tbl_email";

    protected $fillable = [
        "message_code",
        "subject",
        "text",
        "user_fk_from",
        "user_fk_to",
    ];
}
