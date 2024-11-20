<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InternClass extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function students()
    {
        return $this->hasMany(Profile::class, "intern_class_id");
    }

    public function instructor()
    {
        return $this->belongsTo(Profile::class, "instructor_id");
    }
}