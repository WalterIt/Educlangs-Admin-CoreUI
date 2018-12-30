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
        $listGrammarTopic = GrammarTopic::all();
        return $listGrammarTopic;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(GrammarTopic $grammarTopic)
    {
        return new GrammarTopicResource($grammarTopic);
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
            // "user_id"    => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $create = GrammarTopic::create($request->all());
        return  $create;
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
            "user_id"    => 'required'
            ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $updateLanguageById = GrammarTopic::findOrFail($id);
        $updateLanguageById->update($request->all());
        return $updateLanguageById;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleteLanguageById = GrammarTopic::find($id)->delete();
        return response()->json([], 204);
    }
}
