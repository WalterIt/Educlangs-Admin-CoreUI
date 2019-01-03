<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GrammarTopicResource extends JsonResource
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
            'id'    => $this->id,
            'user_id'    => $this->user_id,
            'u_id'   => $this->u_id ,
            'lss_id'  => $this->lss_id,
            'gt_description'   => $this->gt_description,
            'gr_explanation'   => $this->gr_explanation ,
            'examples'   => $this->examples
        ];
    }
}
