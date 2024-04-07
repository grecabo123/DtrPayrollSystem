<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnnouncementUser extends Model
{
    use HasFactory;

    protected $table = "tbl_user_announcement";

    protected $fillable = [
        "user_announce_fk",
        "user_fk",
    ];
}
