<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    //
    protected $table = 'unit';
    // protected $primaryKey = 'd_id';
    // public $timestamps = false;
    protected $fillable = [
        "user_id",
        "u_name",
        "l_id"
    ];
}
