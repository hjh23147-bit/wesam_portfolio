<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_ar',
        'title_en',
        'slug',
        'summary_ar',
        'summary_en',
        'content_ar',
        'content_en',
        'category',
        'cover_image',
        'read_time_minutes',
        'is_published',
        'published_at'
    ];

    protected $casts = [
        'read_time_minutes' => 'integer',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];
}
