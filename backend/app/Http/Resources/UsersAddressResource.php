<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UsersAddressResource extends JsonResource
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

            // "user_address_id"    => $this->user_address_id,

            'houseApNum' =>$this->houseApNum,
            'street' =>$this->street,
            'city' =>$this->city,
            'zip' =>$this->zip,
            'state' =>$this->state,
            'country' =>$this->country,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at

        ];
    }
}
