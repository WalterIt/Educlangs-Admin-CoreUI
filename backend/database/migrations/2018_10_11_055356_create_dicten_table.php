<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDictenTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('dicten', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('user_id')->index('user_id');
			$table->integer('band')->nullable();
			$table->string('status', 20)->nullable();
			$table->integer('range')->nullable();
			$table->string('domain', 11)->nullable();
			$table->integer('u_id')->nullable()->index('u_id');
			$table->integer('vt_id')->nullable();
			$table->string('lss_id', 22)->nullable()->index('lss_id');
			$table->string('gc_id', 42)->nullable();
			$table->string('den_word', 234)->nullable();
			$table->string('dpt_word', 120)->nullable();
			$table->string('dfr_word', 120)->nullable();
			$table->string('des_word', 120)->nullable();
			$table->string('dja_word', 120)->nullable();
			$table->string('dzh_word', 120)->nullable();
			$table->string('d_audio', 10)->nullable();
			$table->string('image', 10)->nullable();
			$table->timestamps();
			$table->primary(['id','user_id']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('dicten');
	}

}
