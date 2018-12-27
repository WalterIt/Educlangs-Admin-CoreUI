<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Unit extends Resource
{
    /**
     * Transform the resource into an array. 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            "id"    => $this->id,    
            "user_id"    => $this->user_id,        
            "u_name"  => $this->u_name,   
            "l_id"    => $this->l_id             
        ];        
    }
}
