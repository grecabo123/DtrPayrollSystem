<?php

use App\Http\Controllers\API\AnnouncementController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\HolidayController;
use App\Http\Controllers\API\PhilhealthController;
use App\Http\Controllers\API\SalaryPeriodController;
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
    Route::delete('DeleteDepartment/{id}',[AdminController::class, 'DeleteDepartment']);

    // Holiday
    Route::post('AddHoliday',[HolidayController::class, 'AddHoliday']);
    Route::get('LegalHoliday',[HolidayController::class, 'LegalHoliday']);
    Route::get('SpecialHoliday',[HolidayController::class, 'SpecialHoliday']);
    Route::put('UpdateHoliday',[HolidayController::class, 'UpdateHoliday']);
    Route::delete('RemoveHoliday/{id}',[HolidayController::class, 'RemoveHoliday']);

    // Days
    Route::post('AddDays',[AdminController::class, 'AddDays']);
    Route::get('Days',[AdminController::class, 'Days']);
    Route::put('UpdateDays',[AdminController::class, 'UpdateDays']);

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


    // Salary Period
    Route::post('CreateSalary',[SalaryPeriodController::class, 'CreateSalary']);
    Route::get('FetchSalary',[SalaryPeriodController::class, 'FetchSalary']);
    Route::put('SalaryUpdate',[SalaryPeriodController::class, 'SalaryUpdate']);
    Route::delete('SalaryRemove/{id}',[SalaryPeriodController::class, 'SalaryRemove']);

    // Create Employee
    Route::post('RegisterEmployee',[AdminController::class, 'RegisterEmployee']);
    

    // Dashboard 
    Route::get('AdminDashboard',[AdminController::class, 'AdminDashboard']);


    // Company Info Config
    Route::post('RegisterCompanyInfo',[AdminController::class, 'RegisterCompanyInfo']);
    Route::get('CompanyInfo',[AdminController::class, 'CompanyInfo']);
    Route::put('UpdateInfo',[AdminController::class, 'UpdateInfo']);
});



// Employee
Route::middleware(['auth:sanctum', 'isAPIEmployee'])->group(function () {
    Route::get('/employee',function() {
        return response()->json([
            "status"        =>      200,
            "role"          =>      auth()->user()->role,
        ],200);
    });

});



Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout',[AuthController::class, 'Logout']);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
