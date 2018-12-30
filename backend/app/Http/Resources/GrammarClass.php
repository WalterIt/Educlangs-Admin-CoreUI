<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class GrammarClass extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id"    => $this->id,
            "user_id"    => $this->user_id,
            "gc_id"  => $this->gc_id,
            "gc_class"  => $this->gc_class
        ];
    }
}
