<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GrammarTopic extends Model
{
    protected $table = 'grammartopic';

    protected $fillable = [
        "user_id",
        "u_id",     // Unit ID
        "l_id",   // Lesson Id
        "gt_description",
        "gr_explanation",
        "examples"
    ];

    /**
     * Get the unit that owns the grammarTopic.
     */
    public function unit()
    {
        return $this->belongsTo('App\Unit', 'u_id');
        // return $this->belongsTo('App\Level', 'id', 'l_name');
    }

    /**
     * Get the level that owns the grammarTopic.
     */
    public function lesson()
    {
        return $this->belongsTo('App\Lesson', 'l_id'); // ???
        // return $this->belongsTo('App\Lesson', 'id', 'l_name');
    }

}

