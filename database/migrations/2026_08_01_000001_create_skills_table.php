<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name_ar');
            $table->string('name_en');
            $table->string('category'); // e.g. Frontend Development, AI & Smart Systems, Cybersecurity & Networking, Systems Architecture
            $table->integer('proficiency')->default(90); // 0-100%
            $table->string('icon')->nullable(); // Lucide icon identifier or SVG
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('skills');
    }
};
