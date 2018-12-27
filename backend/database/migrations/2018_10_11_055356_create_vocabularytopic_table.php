<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVocabularytopicTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vocabularytopic', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('user_id')->unsigned()->index('user_id');
			$table->integer('u_id')->nullable();
			$table->string('lss_id')->nullable();
			$table->string('gt_id')->nullable();
			$table->string('vt_topic')->nullable();
			$table->string('vtpt_id')->nullable();
			$table->string('vtes_id')->nullable();
			$table->string('vtfr_id')->nullable();
			$table->string('vtja_id')->nullable();
			$table->string('vtzh_id')->nullable();
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
		Schema::drop('vocabularytopic');
	}

}
