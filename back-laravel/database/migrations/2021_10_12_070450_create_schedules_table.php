<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedules', function (Blueprint $table) {
            // 관리자가 생성해서 한국학생이 신청하면 유학생이 수락 1:N
            // 유학생, 신청 날짜, 신청 시간, 언어, 완료여부, 비밀번호
            // 언어: 유학생 position(japanese...)에 따라 정해짐
            $table->id();
            $table // 유학생 -> 관리자가 생성할때 정함(Not null)
                ->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');
            $table->date('start_date'); // 신청 날짜
            $table->string('start_time'); // 신청 시간
            $table->string('password')->nullable(); // 생성시 방 비밀번호 부여
            $table->boolean('finished'); // 완료 여부(진행 되었는지)
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
        Schema::dropIfExists('schedules');
    }
}
