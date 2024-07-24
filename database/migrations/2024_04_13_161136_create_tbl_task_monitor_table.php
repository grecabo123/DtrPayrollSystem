<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblTaskMonitorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_task_monitor', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('from_user_fk');
            $table->foreign('from_user_fk')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->string('task_name');
            $table->tinyInteger('status')->default(0);
            $table->string('start_date');
            $table->string('end_date');
            $table->string('rate');
            $table->string('duration');
            $table->tinyInteger('priority')->default(0);
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
        Schema::dropIfExists('tbl_task_monitor');
    }
}
