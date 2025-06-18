<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name',
        'type',
        'duration',
        'price',
        'description',
        'is_active',
        'is_package',
        'package_details',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_package' => 'boolean',
        'package_details' => 'array',
    ];
}
