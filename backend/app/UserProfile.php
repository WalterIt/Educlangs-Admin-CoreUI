<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    //

    protected $table = 'userprofile';
    // protected $primaryKey = 'd_id';
    // public $timestamps = false;
    protected $fillable = [
        'user_id'   ,

        // 'user_address_user_id',

        'gender'   ,
        'firstName' ,
        'lastName'  ,
        'phoneHome' ,
        'phoneComercial'  ,
        'mobile'    ,
        'photo'     ,
        'status'    , // '1-admin 2-Colaborador 3-User Premium 4-UsÃ¡rio PadrÃ£o',
        'lang_id'   ,  // System language
        'birthdate' ,
    ];

    /**
     * Relationship.
     *
     * @var string
     */

    public function userAddress() {
        return $this->belongsTo('App\UserAddress', 'user_id');
    }



}
