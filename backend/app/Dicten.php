<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dicten extends Model
{
    //
    protected $table = 'dicten';
    // protected $primaryKey = 'd_id';
    protected $fillable = [
        "user_id"  ,
        "domain"  ,
        "u_id"  ,
        "vt_id"  ,
        "lss_id" ,
        "gc_id" ,
        "den_word"  ,
        "dpt_word"  ,
        "dfr_word",
        "des_word",
        "dja_word",
        "dzh_word",
        "d_audio",
        "image"
    ];
}
