<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProfileAddress extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function ref_barangay()
    {
        return $this->belongsTo(RefBarangay::class, "barangay_id");
    }

    public function ref_municipality()
    {
        return $this->belongsTo(RefMunicipality::class, "municipality_id");
    }

    public function ref_province()
    {
        return $this->belongsTo(RefProvince::class, "province_id");
    }

    public function ref_region()
    {
        return $this->belongsTo(RefRegion::class, "region_id");
    }

    public function profiles()
    {
        return $this->hasOne(Profile::class, "address_id");
    }
}