<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RefCourse extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function profiles()
    {
        return $this->hasMany(Profile::class, "course_id");
    }

    public function ref_department()
    {
        return $this->belongsTo(RefDepartment::class, "department_id");
    }
}