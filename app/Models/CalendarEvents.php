<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalendarEvents extends Model
{
    use HasFactory;

    protected $table= "tbl_events";

    protected $fillable = [
        "date_event",
        "event_title",
        "type_event",
        "meeting_link",
        "description"
    ];
}
