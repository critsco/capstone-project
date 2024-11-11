<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DocumentStatus extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function ojt_details()
    {
        return $this->hasMany(OJTDetail::class, "document_status_id");
    }
}
