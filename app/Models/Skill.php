<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_ar',
        'name_en',
        'category',
        'proficiency',
        'icon',
        'sort_order'
    ];

    protected $casts = [
        'proficiency' => 'integer',
        'sort_order' => 'integer',
    ];
}
