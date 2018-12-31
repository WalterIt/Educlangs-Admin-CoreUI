<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $table = 'lesson';

    protected $fillable = [
        "user_id",
        "l_id",
        "lss_name"
    ];

}
