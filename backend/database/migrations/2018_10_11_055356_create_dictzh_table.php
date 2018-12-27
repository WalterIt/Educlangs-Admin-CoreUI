<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDictzhTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('dictzh', function(Blueprint $table)
		{
			$table->integer('dzh_id', true);
			$table->string('dzh_word')->nullable();
			$table->string('dzh_audio')->nullable();
			$table->string('dzh_image')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('dictzh');
	}

}
