<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RefRegion extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function ref_provinces()
    {
        return $this->hasMany(RefProvince::class, "region_id");
    }

    public function profile_addresses()
    {
        return $this->hasMany(ProfileAddress::class,"region_id");
    }
}