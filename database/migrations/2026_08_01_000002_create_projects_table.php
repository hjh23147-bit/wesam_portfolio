<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title_ar');
            $table->string('title_en');
            $table->string('slug')->unique();
            $table->text('summary_ar');
            $table->text('summary_en');
            $table->longText('description_ar');
            $table->longText('description_en');
            $table->string('category'); // e.g. web, ai, security, architecture
            $table->json('tech_stack'); // array of string badges e.g. ["React", "Laravel", "Tailwind CSS", "MySQL"]
            $table->string('cover_image')->nullable();
            $table->string('architecture_diagram')->nullable(); // URL or path to DFD/ERD diagram
            $table->string('live_url')->nullable();
            $table->string('github_url')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
