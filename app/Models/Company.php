<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function profiles()
    {
        return $this->hasMany(Profile::class, "company_id");
    }

    public function profile_address()
    {
        return $this->belongsTo(ProfileAddress::class, "address_id");
    }
}