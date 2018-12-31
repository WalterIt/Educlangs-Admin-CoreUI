<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
   protected $table = 'level';
   public $primaryKey = 'id';
   // protected $casts = ['id' => 'string'];
   protected $fillable = [
    "user_id",
    "l_id",
    "l_name"
    ];
}
