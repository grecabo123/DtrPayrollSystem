<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblChildTaskTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_child_task', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('task_monitor_fk');
            $table->foreign('task_monitor_fk')->references('id')->on('tbl_task_monitor')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('to_user_fk');
            $table->foreign('to_user_fk')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('tbl_child_task');
    }
}
