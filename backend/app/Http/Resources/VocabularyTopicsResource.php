<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VocabularyTopicsResource extends JsonResource
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
            "u_id"  => $this->u_id,
            "lss_id"    => $this->lss_id,
            "gt_id"    => $this->gt_id,
            "vt_topic"    => $this->vt_topic,
            "vtpt_id"  => $this->vtpt_id,
            "vtes_id"    => $this->vtes_id,
            "vtfr_id"    => $this->vtfr_id,
            "vtja_id"    => $this->vtjp_id,
            "vtzh_id"  => $this->vtzh_id
        ];
    }
}
