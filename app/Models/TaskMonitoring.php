<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskMonitoring extends Model
{
    use HasFactory;

    protected $table = "tbl_task_monitor";

    protected $fillable = [
        "from_user_fk",
        "task_name",
        "start_date",
        "end_date",
        "rate",
        "from_user_fk",
    ];
}
