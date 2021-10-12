<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            // 댓글과 같은 방식으로 스케줄 예약 1:N
            // 수락 여부, 완료 여부(스케줄 모델이 완료된 상태에서 결과 여부 체크)
            $table->id();
            $table // 한국 학생
                ->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');
            $table // 예약한 스케줄
                ->foreignId('schedule_id')
                ->constrained()
                ->onDelete('cascade');
            $table->boolean('confirmed'); // 수락 여부
            $table->string('password'); // 수락 완료시 방 번호 부여
            $table->boolean('finished'); // 완료 여부(출결)
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
        Schema::dropIfExists('reservations');
    }
}
