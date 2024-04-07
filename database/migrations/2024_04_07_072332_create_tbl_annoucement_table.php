<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblAnnoucementTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_annoucement', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('type_annountment')->default(1);
            $table->string('title');
            $table->string('date_annountment');
            $table->string('message')->nullable();
            $table->string('file_upload')->nullable();
            $table->longText('meeting_link')->nullable();
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
        Schema::dropIfExists('tbl_annoucement');
    }
}
