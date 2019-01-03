<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersperfilTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('usersperfil', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('us_id')->index('us_id');
			$table->string('us_name')->nullable();
			$table->string('us_cpf')->nullable();
			$table->string('us_email')->nullable();
			$table->string('us_password')->nullable()->comment('Armazena senha encriptada');
			$table->string('us_code')->nullable()->comment('Senha sem criptografia');
			$table->string('us_phoneHome')->nullable();
			$table->string('us_phoneComercial')->nullable();
			$table->string('us_mobile')->nullable();
			$table->string('us_photo')->nullable();
			$table->integer('us_level')->nullable()->comment('1-admin 2-Colaborador 3-User Premium 4-UsÃ¡rio PadrÃ£o');
			$table->dateTime('us_createdDate')->nullable();
			$table->dateTime('us_modifiedDate')->nullable();
			$table->integer('us_status')->default(4);
			$table->integer('lang_id')->nullable();
			$table->string('us_country')->nullable();
			$table->date('us_birth')->nullable();
			$table->string('us_courseLevel')->nullable()->comment('NÃ­vel da Unidade');
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
		Schema::drop('usersperfil');
	}

}
