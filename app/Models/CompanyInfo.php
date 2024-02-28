<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyInfo extends Model
{
    use HasFactory;

    protected $table = "tbl_company_info";
    
    protected $fillable = [
        "company_logo",
        "company_name",
        "company_color",
        "company_code",
        "company_tagline",
    ];
}
