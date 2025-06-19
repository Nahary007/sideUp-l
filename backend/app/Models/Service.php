<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Service extends Model
{
    use HasFactory;

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
        'price' => 'decimal:2',
        'duration' => 'integer',
    ];

    protected $attributes = [
        'is_active' => true,
        'is_package' => false,
        'description' => '',
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopePackages($query)
    {
        return $query->where('is_package', true);
    }

    // Accessors
    public function getFormattedPriceAttribute()
    {
        return number_format($this->price, 2) . '€';
    }

    public function getFormattedDurationAttribute()
    {
        return $this->duration . ' min';
    }

    // Mutators
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = trim($value);
    }

    public function setDescriptionAttribute($value)
    {
        $this->attributes['description'] = trim($value ?? '');
    }

    // Relations (si nécessaire pour l'avenir)
    public function reservations()
    {
        return $this->hasMany(\App\Models\Reservation::class, 'service', 'type');
    }
}