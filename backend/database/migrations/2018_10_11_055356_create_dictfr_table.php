<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDictfrTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('dictfr', function(Blueprint $table)
		{
			$table->integer('dfr_id', true);
			$table->string('d_fr')->nullable();
			$table->string('dfr_audio')->nullable();
			$table->string('dfr_image')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('dictfr');
	}

}
