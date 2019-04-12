<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\UserProfile;
use Validator;
use App\Http\Resources\UserProfileResource;

class UserProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        // Get Lesson
        $item = UserProfile::paginate(100);

        //  Return collection of Language as a resource
        return UserProfileResource::collection($item);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' ,
            'lastName'  ,
            'mobile'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Creating a record in a different way
        $createItem = UserProfile::create([
            'user_id' => $request->user()->id,
            'firstName'  => $request->firstName,
            'lastName'   => $request->lastName,
            'phoneHome'  => $request->phoneHome,
            'phoneComercial'  => $request->phoneComercial,
            'mobile'     => $request->mobile,
            'photo'      => $request->photo,
            'status'     => $request->status, // '1-admin 2-Colaborador 3-User Premium 4-UsÃ¡rio PadrÃ£o',
            'lang_id'    => $request->lang_id,  // System language
            'birthdate'  => $request->birthdate

        ]);
        return new UserProfileResource($createItem);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $showById = UserProfile::with('User')->findOrFail($id);
        return $showById;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $validator = Validator::make($request->all(), [
            'firstName',
            'lastName',
            'mobile'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Updating user_id
        $request['user_id'] = $request->user()->id;

        $updateById = UserProfile::findOrFail($id);
        $updateById->update($request->all());
        return $updateById;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        /**   */
        $deleteById = UserProfile::find($id)->delete();
        return response()->json([], 204);
    }
}
