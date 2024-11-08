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
Route::get('pub_department_list', [App\Http\Controllers\RefDepartmentController::class, 'pub_department_list']);
Route::get('pub_year_level_list', [App\Http\Controllers\RefYearLevelController::class, 'pub_year_level_list']);


Route::middleware('auth:api')->group(function () {
    Route::get('check_auth_status', [App\Http\Controllers\AuthController::class, 'check_auth_status']);

    // UserController
    Route::get("user_archived", [App\Http\Controllers\UserController::class, "user_archived"]);
    Route::apiResource("users", App\Http\Controllers\UserController::class);
    // END UserController

    // SETTINGS
    Route::apiResource('ref_region', App\Http\Controllers\RefRegionController::class);
    Route::apiResource('ref_province', App\Http\Controllers\RefProvinceController::class);
    Route::apiResource('ref_municipality', App\Http\Controllers\RefMunicipalityController::class);
    Route::apiResource('ref_barangay', App\Http\Controllers\RefBarangayController::class);

    Route::apiResource('ref_department', App\Http\Controllers\RefDepartmentController::class);
    Route::apiResource('ref_year_level', App\Http\Controllers\RefYearLevelController::class);
    // END SETTINGS
});
