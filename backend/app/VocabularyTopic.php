<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VocabularyTopic extends Model
{
    protected $table = 'vocabularytopic';
    protected $fillable = [
        "user_id",
        "u_id",
        "lss_id",
        "gt_id",
        "vt_topic",
        "vtpt_id",
        "vtes_id",
        "vtfr_id",
        "vtja_id",
        "vtzh_id"
    ];
}
