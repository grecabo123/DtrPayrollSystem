<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblEmployeeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_employee', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('department_fk');
            $table->foreign('department_fk')->references('id')->on('tbl_department')->onDelete('cascade')->onUpdate('cascade');
            $table->string('specific_role');
            $table->double('monthly',10,2);
            $table->string('employee_code');
            $table->double('per_day',10,2);
            $table->unsignedBigInteger('company_fk');
            $table->foreign('company_fk')->references('id')->on('tbl_company_info')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('user_fk');
            $table->foreign('user_fk')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_employee');
    }
}
