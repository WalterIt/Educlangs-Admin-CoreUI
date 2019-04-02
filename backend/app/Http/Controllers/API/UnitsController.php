<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Unit;
use Validator;
use App\Http\Resources\UnitsResource;

class UnitsController extends Controller
{
    /**
     * Protect update and delete methods, only for authenticated users. 
     *
     * @ return Unauthorized
     */
    /*
    public function __construct()
    {
      $this->middleware('auth:api')->except(['index']);
    }
    */


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get Lesson
        $item = Unit::paginate(100);

        //  Return collection of Language as a resource
        return UnitsResource::collection($item);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Unit $unit)
    {
        return new UnitsResource($unit);
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
            'u_name'    => 'required',
            'l_id'    => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Updating user_id
        $request['user_id'] = $request->user()->id;

        $updateById = Unit::findOrFail($id);
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
        $deleteById = Unit::find($id)->delete();
        return response()->json([], 204);
    }

}
