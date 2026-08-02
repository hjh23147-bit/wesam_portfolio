<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_ar',
        'title_en',
        'slug',
        'summary_ar',
        'summary_en',
        'description_ar',
        'description_en',
        'category',
        'tech_stack',
        'cover_image',
        'architecture_diagram',
        'live_url',
        'github_url',
        'is_featured'
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'is_featured' => 'boolean',
    ];
}
