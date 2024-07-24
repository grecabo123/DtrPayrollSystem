<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChildTaskMonitor extends Model
{
    use HasFactory;

    protected $table = "tbl_child_task";

    protected $fillable = [
        "task_monitor_fk",
        "to_user_fk",
    ];
}
