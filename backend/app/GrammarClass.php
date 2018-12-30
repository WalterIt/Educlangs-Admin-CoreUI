<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GrammarClass extends Model
{
    protected $table = 'grammarclass';

    protected $fillable = [
        "id",
        "user_id",
        "gc_id" ,
        "gc_class"
    ];
}
