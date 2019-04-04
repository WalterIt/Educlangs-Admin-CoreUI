<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UsersResource extends JsonResource
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
            "status"    => $this->status,
            'user_id'   => $this->user_id,
            "name"  => $this->name,
            "email"  => $this->email,
            "password"    => $this->password,
            // 'level_name' => $this->level['l_name'],
            // 'level'   => $this->level, // Retrive all  obj of level table as an array
            // Casting objects to string, to avoid receive create_at and update_at as object
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at
        ];
    }
}
