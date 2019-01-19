<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $table = 'lesson';
    public $primaryKey = 'l_id';
    public $incrementing = false;

    protected $fillable = [
        "user_id",
        "l_id",
        "lss_name"
    ];

    /**
     * Get the unit grammartopic associated with the lesson.
     *
     *  In this case, the grammartopic model is automatically assumed to have a level_id foreign key. If you wish to override
     * this convention, you may pass a second argument to the hasOne method:
     *
     * return $this->hasOne('App\Phone', 'foreign_key');

     */
    public function grammarTopic()
    {
        return $this->hasOne('App\GrammarTopic', 'l_id');
    }

}
