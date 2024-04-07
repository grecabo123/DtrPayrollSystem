<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $table ="tbl_annoucement";

    protected $fillable = [
        "type_annountment",
        "user_fk",
        "title",
        "date_annountment",
        "message",
        "file_upload",
        "meeting_link",
    ];
}
