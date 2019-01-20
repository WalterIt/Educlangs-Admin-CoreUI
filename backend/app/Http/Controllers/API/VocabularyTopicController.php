<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\VocabularyTopic;
use Validator;
use App\Http\Resources\VocabularyTopicsResource;

class VocabularyTopicController extends Controller
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
        $item = VocabularyTopic::paginate(100);

        //  Return collection of Language as a resource
        return VocabularyTopicsResource::collection($item);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(VocabularyTopic $vocabularytopic)
    {
        return new VocabularyTopicsResource($vocabularytopic);
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
            'u_id'    => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Creating a record in a different way
        $createItem = VocabularyTopic::create([
            'user_id' => $request->user()->id,
            'u_id' => $request->u_id,

            'lss_id' => $request->lss_id,  // Lesson Id
            'gt_id' => $request->gt_id,
            'vt_topic' => $request->vt_topic,
            'vtpt_id' => $request->vtpt_id,

            'vtes_id' => $request->vtes_id,  // Lesson Id
            'vtfr_id' => $request->vtfr_id,
            'vtja_id' => $request->vtja_id,
            'vtzh_id' => $request->vtzh_id
        ]);
        return new VocabularyTopicsResource($createItem);
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
            'u_id'    => 'required'
            ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $updateById = VocabularyTopic::findOrFail($id);
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
        $deleteById = VocabularyTopic::find($id)->delete();
        return response()->json([], 204);
    }

}
