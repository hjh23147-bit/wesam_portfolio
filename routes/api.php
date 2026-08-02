<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;

/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
*/

Route::get('/profile', [ProfileController::class, 'show']);

Route::get('/skills', [SkillController::class, 'index']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);

Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{slug}', [ArticleController::class, 'show']);

Route::post('/contact', [ContactController::class, 'store']);

Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/auth/me', [AuthController::class, 'me']);
Route::post('/auth/logout', [AuthController::class, 'logout']);

/*
|--------------------------------------------------------------------------
| Admin API Routes
|--------------------------------------------------------------------------
*/
Route::post('/admin/profile', [ProfileController::class, 'update']);

Route::get('/admin/contacts', [ContactController::class, 'index']);
Route::patch('/admin/contacts/{contact}/read', [ContactController::class, 'markAsRead']);
Route::delete('/admin/contacts/{contact}', [ContactController::class, 'destroy']);

// Admin CRUD - Skills
Route::post('/admin/skills', [SkillController::class, 'store']);
Route::put('/admin/skills/{skill}', [SkillController::class, 'update']);
Route::delete('/admin/skills/{skill}', [SkillController::class, 'destroy']);

// Admin CRUD - Projects
Route::post('/admin/projects', [ProjectController::class, 'store']);
Route::put('/admin/projects/{project}', [ProjectController::class, 'update']);
Route::delete('/admin/projects/{project}', [ProjectController::class, 'destroy']);

// Admin CRUD - Articles
Route::post('/admin/articles', [ArticleController::class, 'store']);
Route::put('/admin/articles/{article}', [ArticleController::class, 'update']);
Route::delete('/admin/articles/{article}', [ArticleController::class, 'destroy']);
