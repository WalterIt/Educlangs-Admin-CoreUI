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
}
