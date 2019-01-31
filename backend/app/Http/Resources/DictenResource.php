<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DictenResource extends JsonResource
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

            'id' => $this->id,
            'user_id'    => $this->user_id,
            'domain'  => $this->domain,
            'u_id'  => $this->u_id,
            'vt_id'  => $this->vt_id,
            'lss_id'  => $this->lss_id,
            'gc_id'  => $this->gc_id,
            'den_word'  => $this->den_word,
            'dpt_word'  => $this->dpt_word,
            'dfr_word'  => $this->dfr_word,
            'des_word'  => $this->des_word,
            'dja_word'  => $this->dja_word,
            'dzh_word'  => $this->dzh_word,
            'd_audio' => $this->d_audio,
            'image' => $this->image,
            // Casting objects to string, to avoid receive create_at and update_at as object
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at
        ];
    }
}
