<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblScheduleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_schedule', function (Blueprint $table) {
            $table->id();
            $table->string('schedule_name')->unique();
            $table->unsignedBigInteger('user_fk')->nullable();
            $table->foreign('user_fk')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->string('monday_start')->nullable();
            $table->string('monday_end')->nullable();
            $table->string('tuesday_start')->nullable();
            $table->string('tuesday_end')->nullable();
            $table->string('wednesday_start')->nullable();
            $table->string('wednesday_end')->nullable();
            $table->string('thursday_start')->nullable();
            $table->string('thursday_end')->nullable();
            $table->string('friday_start')->nullable();
            $table->string('friday_end')->nullable();
            $table->string('saturday_start')->nullable();
            $table->string('saturday_end')->nullable();
            $table->string('sunday_start')->nullable();
            $table->string('sunday_end')->nullable();
            $table->string('lunch_start')->nullable();
            $table->string('lunch_end')->nullable();
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
        Schema::dropIfExists('tbl_schedule');
    }
}
