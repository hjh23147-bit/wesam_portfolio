<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_ar',
        'name_en',
        'title_ar',
        'title_en',
        'bio_ar',
        'bio_en',
        'email',
        'phone',
        'location_ar',
        'location_en',
        'avatar',
        'github_url',
        'linkedin_url',
        'twitter_url',
        'whatsapp_url',
        'facebook_url',
        'cv_url',
    ];
}
