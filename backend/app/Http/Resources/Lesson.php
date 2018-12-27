<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Lesson extends Resource
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
            "l_id"    => $this->l_id ,           
            "lss_name"  => $this->lss_name  
                        
        ]; 
    }
}
