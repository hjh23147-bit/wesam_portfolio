<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title_ar');
            $table->string('title_en');
            $table->string('slug')->unique();
            $table->text('summary_ar');
            $table->text('summary_en');
            $table->longText('content_ar');
            $table->longText('content_en');
            $table->string('category'); // e.g. Systems Architecture, AI & Engineering, Cybersecurity, Web Development
            $table->string('cover_image')->nullable();
            $table->integer('read_time_minutes')->default(5);
            $table->boolean('is_published')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
