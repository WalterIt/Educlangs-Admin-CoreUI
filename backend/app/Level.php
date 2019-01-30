<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
   protected $table = 'level';
   // public $primaryKey = 'l_id';
   // public $incrementing = false;
   // protected $casts = ['id' => 'string'];

   protected $fillable = [
    "user_id",
    "l_id",
    "l_name"
    ];

    /**
     * Get the unit record associated with the level.
     *
     *  In this case, the Unit model is automatically assumed to have a level_id foreign key. If you wish to override
     * this convention, you may pass a second argument to the hasOne method:
     *
     * return $this->hasOne('App\Phone', 'foreign_key');

     */

    /*
    public function unit()
    {
        return $this->hasOne('App\Unit', 'l_id');
    }
    */

}
