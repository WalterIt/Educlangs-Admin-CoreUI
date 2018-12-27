<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Course extends Resource
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
            "c_name"  => $this->c_name,   
            "c_description"    => $this->c_description             
        ];     
    }
}
