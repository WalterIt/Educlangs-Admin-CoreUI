<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Validator;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UsersResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get Users
        $item = User::paginate(100);

        //  Return collection of Language as a resource
        return UsersResource::collection($item);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
     public function show(User $user)
     {
         return new UsersResource($user);
     }

     /**
      * Store a newly created resource in storage.
      *
      * @param  \Illuminate\Http\Request  $request
      * @return \Illuminate\Http\Response
      */
     public function store(Request $request)
     {
         /**   DO NOT CREATE NEW USERS THROUGH USER COMPONENT */

        /*
         $validator = Validator::make($request->all(), [
             'u_name'    => 'required',
             'l_id'    => 'required',
         ]);
         if ($validator->fails()) {
             return response()->json($validator->errors(), 422);
         }

         // Creating a record in a different way
         $createItem = Unit::create([
             'user_id' => $request->user()->id,
             'u_name' => $request->u_name,
             'l_id' => $request->l_id,
         ]);
         return new UnitsResource($createItem);
         */
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

          $validator = Validator::make($request->all(), [

              "email"  => 'required'
              ]);

          if ($validator->fails()) {
              return response()->json($validator->errors(), 422);
          }

          // Updating user_id
          $request['user_id'] = $request->user()->id;

          $updateById = User::findOrFail($id);
          $updateById->update($request->only(['user_id', 'email']));
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
         $deleteById = User::find($id)->delete();
         return response()->json([], 204);
     }

 }
