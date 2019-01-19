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
        "l_id"     // Level Id
    ];

    /**
     * Get the level that owns the unit.
     */
    public function level()
    {
        return $this->belongsTo('App\Level', 'l_id');
        // return $this->belongsTo('App\Level', 'id', 'l_name');
    }

    /**
     * Get the grammarTopic record associated with the unit.
     *
     *  In this case, the GrammarTopic model is automatically assumed to have a unit_id foreign key. If you wish to override
     * this convention, you may pass a second argument to the hasOne method:
     *
     * return $this->hasOne('App\Phone', 'foreign_key');

     */


    public function grammarTopic()
    {
        return $this->hasOne('App\GrammarTopic', 'u_id');
    }

}
