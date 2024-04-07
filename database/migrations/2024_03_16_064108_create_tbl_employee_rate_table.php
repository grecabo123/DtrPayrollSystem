<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblEmployeeRateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_employee_rate', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('core_id');
            $table->foreign('core_id')->references('id')->on('tbl_core')->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('user_employee_fk')->nullable();
            $table->foreign('user_employee_fk')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->unsignedBigInteger('user_employeer_fk')->nullable();
            $table->foreign('user_employeer_fk')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->longText('comments');
            $table->tinyInteger('rate_num');
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
        Schema::dropIfExists('tbl_employee_rate');
    }
}
