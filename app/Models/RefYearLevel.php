<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RefYearLevel extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function profiles()
    {
        return $this->hasMany(Profile::class, "year_level_id");
    }
}