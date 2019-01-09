<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Lesson;
use Validator;
use App\Http\Resources\LessonsResource;

class LessonsController extends Controller
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
        $item = Lesson::paginate(100);

        //  Return collection of Language as a resource
        return LessonsResource::collection($item);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Lesson $lesson)
    {
        return new LessonsResource($lesson);
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
            'l_id'    => 'required',
            'lss_name'    => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Creating a record in a different way
        $createItem = Lesson::create([
            'user_id' => $request->user()->id,
            'l_id' => $request->l_id,
            'lss_name' => $request->lss_name
        ]);
        return new LessonsResource($createItem);
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
            'l_id'    => 'required',
            'lss_name'    => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Updating user_id
        $request['user_id'] = $request->user()->id;

        $updateById = Lesson::findOrFail($id);
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
        $deleteById = Lesson::find($id)->delete();
        return response()->json([], 204);
    }
}
