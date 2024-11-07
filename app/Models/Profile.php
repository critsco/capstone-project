<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Profile extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function profile_parent()
    {
        return $this->belongsTo(ProfileParent::class, "parent_id");
    }

    public function profile_address()
    {
        return $this->belongsTo(ProfileAddress::class, "address_id");
    }

    public function ref_department()
    {
        return $this->belongsTo(RefDepartment::class, "department_id");
    }

    public function ref_year_level()
    {
        return $this->belongsTo(RefYearLevel::class, "year_level_id");
    }
}