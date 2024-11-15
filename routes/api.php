<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);
Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);

Route::get('pub_region_dropdown', [App\Http\Controllers\RefRegionController::class, 'pub_region_dropdown']);
Route::get('pub_department_dropdown', [App\Http\Controllers\RefDepartmentController::class, 'pub_department_dropdown']);
Route::get('pub_course_list', [App\Http\Controllers\RefCourseController::class, 'pub_course_list']);
Route::get('pub_year_level_list', [App\Http\Controllers\RefYearLevelController::class, 'pub_year_level_list']);


Route::middleware('auth:api')->group(function () {
    Route::get('check_auth_status', [App\Http\Controllers\AuthController::class, 'check_auth_status']);

    // UserController
    Route::get("user_archived", [App\Http\Controllers\UserController::class, "user_archived"]);
    Route::apiResource("users", App\Http\Controllers\UserController::class);
    // END UserController

    // ProfileController
    Route::apiResource("profiles", App\Http\Controllers\ProfileController::class);
    Route::get("profile/{id}", [App\Http\Controllers\ProfileController::class, "show"]);
    Route::post("update_student_profile", [App\Http\Controllers\ProfileController::class, "update_student_profile"]);
    Route::post("update_profile_company", [App\Http\Controllers\ProfileController::class, "update_profile_company"]);
    // END ProfileController

    // CompanyController
    Route::apiResource("companies", App\Http\Controllers\CompanyController::class);
    // END CompanyController

    // SETTINGS
    Route::apiResource('ref_regions', App\Http\Controllers\RefRegionController::class);
    Route::apiResource('ref_provinces', App\Http\Controllers\RefProvinceController::class);
    Route::apiResource('ref_municipalities', App\Http\Controllers\RefMunicipalityController::class);
    Route::apiResource('ref_barangays', App\Http\Controllers\RefBarangayController::class);

    Route::apiResource('ref_departments', App\Http\Controllers\RefDepartmentController::class);
    Route::apiResource('ref_courses', App\Http\Controllers\RefCourseController::class);
    Route::apiResource('ref_year_levels', App\Http\Controllers\RefYearLevelController::class);
    // END SETTINGS
});