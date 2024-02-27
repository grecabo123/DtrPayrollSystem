<?php

use App\Http\Controllers\API\AnnouncementController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\HolidayController;
use App\Http\Controllers\API\PhilhealthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\SSSController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\LogsController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\PagibigController;

// Login
Route::post('Login',[AuthController::class, 'Login']);



// Logs
Route::get('Logs/{id}',[LogsController::class, 'Logs']);

// Events
Route::get('AllEvent',[EventController::class, 'AllEvent']);

// Calendar Announcement
Route::get('Announcement',[AnnouncementController::class, 'Announcement']);

// Department
Route::get('FetchData',[AdminController::class, 'FetchData']);

Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function () {
    Route::get('/checking',function() {
        return response()->json([
            "status"        =>      200,
            "role"          =>      auth()->user()->role,
        ],200);
    }); 

    // Department
    Route::get('FetchDataStatus',[AdminController::class, 'FetchDataStatus']);
    Route::post('AddDepartment',[AdminController::class, 'AddDepartment']);
    Route::put('UpdateStatus',[AdminController::class, 'UpdateStatus']);

    // Holiday
    Route::post('AddHoliday',[HolidayController::class, 'AddHoliday']);
    Route::get('LegalHoliday',[HolidayController::class, 'LegalHoliday']);
    Route::get('SpecialHoliday',[HolidayController::class, 'SpecialHoliday']);
    Route::put('UpdateHoliday',[HolidayController::class, 'UpdateHoliday']);
    Route::delete('RemoveHoliday/{id}',[HolidayController::class, 'RemoveHoliday']);

    // Days
    Route::post('AddDays',[AdminController::class, 'AddDays']);
    Route::get('Days',[AdminController::class, 'Days']);

    // SSS Contribution
    Route::post('SSSRegister',[SSSController::class, 'SSSRegister']);
    Route::get('SSSContribution',[SSSController::class, 'SSSContribution']);
    Route::put('SSSContributionUpdate',[SSSController::class, 'SSSContributionUpdate']);
    Route::delete('SSSContributionRemove/{id}',[SSSController::class, 'SSSContributionRemove']);

    // Pagibig
    Route::post('PagIbigRegister',[PagibigController::class, 'PagIbigRegister']);
    Route::get('PagIbigContribution',[PagibigController::class, 'PagIbigContribution']);
    Route::put('PagIbigContributionUpdate',[PagibigController::class, 'PagIbigContributionUpdate']);
    Route::delete('PagIbigContributionRemove/{id}',[PagibigController::class, 'PagIbigContributionRemove']);

    // Philhealth
    Route::post('PhilhealthRegister',[PhilhealthController::class, 'PhilhealthRegister']);
    Route::get('PhilhealthContribution',[PhilhealthController::class, 'PhilhealthContribution']);
    Route::put('PhilhealthContributionUpdate',[PhilhealthController::class, 'PhilhealthContributionUpdate']);
    Route::delete('PhilhealthContributionRemove/{id}',[PhilhealthController::class, 'PhilhealthContributionRemove']);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
