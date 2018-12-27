<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAddressTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('address', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('us_id')->index('us_id');
			$table->integer('addr_houseApNum')->nullable();
			$table->string('addr_street')->nullable();
			$table->string('city')->nullable();
			$table->string('addr_zip')->nullable();
			$table->string('addr_state')->nullable();
			$table->string('addr_country');
			$table->timestamps();
			$table->primary(['id','us_id']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('address');
	}

}
