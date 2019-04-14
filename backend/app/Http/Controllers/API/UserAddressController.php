<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\UserAddress;
use Validator;
use App\Http\Resources\UsersAddressResource;

class UserAddressController extends Controller
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
        $item = UserAddress::paginate(100);

        //  Return collection of Language as a resource
        return UsersAddressResource::collection($item);
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
            'country'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Creating a record in a different way
        $createItem = UserAddress::create([
            'user_id' => $request->user,
            // 'user_id' => $request->user()->id,

            'houseApNum' =>$request->houseApNum,
            'street' =>$request->street,
            'city' =>$request->city,
            'zip' =>$request->zip,
            'state' =>$request->state,
            'country' =>$request->country,
        ]);
        return new UsersAddressResource($createItem);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(UserAddress $useraddress)
    {
        return new UsersAddressResource($useraddress);
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
            'country'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Updating user_id
       // $request['user_id'] = $request->user()->id;

        $updateById = UserAddress::findOrFail($id);
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
        $deleteById = UserAddress::find($id)->delete();
        return response()->json([], 204);
    }
}
