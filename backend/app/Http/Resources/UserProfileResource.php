<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserProfileResource extends JsonResource
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

            'id'  => $this->id,
            'user_id' => $this->user_id,
            'firstName' => $this->firstName,
            'lastName'  => $this->lastName,
            'phoneHome' => $this->phoneHome,
            'phoneComercial'  => $this->phoneComercial,
            'mobile'  => $this->mobile,
            'photo'  => $this->photo,
            'status'  => $this->status, // '1-admin 2-Colaborador 3-User Premium 4-UsÃ¡rio PadrÃ£o',
            'lang_id' => $this->lang_id,  // System language
            'birthdate'  => $this->birthdate,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at


        ];
    }
}
