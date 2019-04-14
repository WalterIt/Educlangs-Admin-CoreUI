<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    //
    protected $table = 'user_address';
    // protected $primaryKey = 'd_id';
    // public $timestamps = false;
    protected $fillable = [
        "id",
        "user_id",
        'houseApNum',
        'street' ,
        'city' ,
        'zip' ,
        'state' ,
        'country'
    ];

        /**
     * Relationship.
     *
     * @var array
     */

    public function userProfile() {
        return $this->hasOne('App\UserProfile');
    }


}
