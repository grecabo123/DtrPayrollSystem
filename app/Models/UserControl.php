<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserControl extends Model
{
    use HasFactory;

    protected $table = "tbl_user_control";

    protected $fillable = [
        "user_fk",
        "task_access",
        "task_monitor",
        "create_announcement",
        "create_meeting",
    ];
}
