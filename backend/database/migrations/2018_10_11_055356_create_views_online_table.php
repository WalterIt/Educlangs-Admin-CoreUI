<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateViewsOnlineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('views_online', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('us_id');
			$table->string('sessao')->nullable();
			$table->string('ip')->nullable();
			$table->string('url')->nullable();
			$table->integer('time_end')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('views_online');
	}

}
