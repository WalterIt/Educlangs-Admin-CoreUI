<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\GrammarTopic;
use Validator;
use App\Http\Resources\GrammarTopicResource;

class GrammarTopicController extends Controller
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
        $item = GrammarTopic::paginate(100);

        //  Return collection of Language as a resource
        return GrammarTopicResource::collection($item);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(GrammarTopic $grammartopic)
    {
        return new GrammarTopicResource($grammartopic);
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
            'u_id'    => 'required',
            'lss_id'    => 'required',
            'gt_description'    => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Creating a record in a different way
        $createItem = GrammarTopic::create([
            'user_id' => $request->user()->id,
            'u_id' => $request->u_id,
            'l_id' => $request->l_id,
            'gt_description' => $request->gt_description,
            'gr_explanation' => $request->gr_explanation,
            'examples' => $request->examples
        ]);
        return new GrammarTopicResource($createItem);
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
            'u_id'    => 'required',
            'l_id'    => 'required',
            'gt_description'    => 'required'
            ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Updating user_id
        $request['user_id'] = $request->user()->id;

        $updateById = GrammarTopic::findOrFail($id);
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
        $deleteById = GrammarTopic::find($id)->delete();
        return response()->json([], 204);
    }
}
