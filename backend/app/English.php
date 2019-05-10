<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class English extends Model
{
    //
    protected $table = 'english';
    protected $fillable = [
        "name",
        "photo"     // Level Id
    ];


}
