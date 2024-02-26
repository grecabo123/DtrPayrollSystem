<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Login
Route::post('Login',[AuthController::class, 'Login']);


Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function () {
    Route::get('/checking',function() {
        return response()->json([
            "status"        =>      200,
            "role"          =>      auth()->user()->role,
        ],200);
    }); 
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
