<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Gallery extends Resource
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
            "lang_id"  => $this->lang_id,   
            "name"    => $this->name,
            "path"    => $this->path             
        ];     
    }
}
