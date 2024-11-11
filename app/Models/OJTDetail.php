<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OJTDetail extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function company()
    {
        return $this->belongsTo(Company::class, "company_id");
    }

    public function profile()
    {
        return $this->belongsTo(Profile::class, "profile_id");
    }

    public function document_status()
    {
        return $this->belongsTo(DocumentStatus::class, "document_status_id");
    }
}
