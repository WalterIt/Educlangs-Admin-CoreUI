<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GrammarTopic extends Model
{
    protected $table = 'grammartopic';

    protected $fillable = [
        'id',
        "user_id",
        "u_id",
        "lss_id",
        "gt_description",
        "gr_explanation",
        "examples"
    ];
}

