<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateViewsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('views', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('us_id');
			$table->string('mes', 21);
			$table->integer('ano');
			$table->integer('visitas')->default(1);
			$table->integer('visitantes')->default(1);
			$table->integer('pageviews')->default(1);
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
		Schema::drop('views');
	}

}
