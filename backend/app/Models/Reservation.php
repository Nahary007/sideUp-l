<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'service',
        'date',
        'time',
        'duration',
        'location',
        'message',
        'accept_terms',
    ];
}

