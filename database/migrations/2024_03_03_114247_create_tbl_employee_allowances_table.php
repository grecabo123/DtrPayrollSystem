<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblEmployeeAllowancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_employee_allowances', function (Blueprint $table) {
            $table->id();
            $table->double('amount',10,2);
            $table->unsignedBigInteger('allowance_fk');
            $table->foreign('allowance_fk')->references('id')->on('tbl_allowances')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('tbl_employee_allowances');
    }
}
