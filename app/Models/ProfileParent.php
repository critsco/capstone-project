<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProfileParent extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function profiles()
    {
        return $this->hasOne(Profile::class, 'parent_id');
    }
}