<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\GrammarClass;
use Validator;
use App\Http\Resources\GrammarClassResource;

class GrammarClassController extends Controller
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
        $listGrammarClass = GrammarClass::all();
        return $listGrammarClass;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(GrammarClass $grammarclass)
    {
        return new GrammarClassResource($grammarclass);
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
            "user_id"    => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $create = GrammarClass::create($request->all());
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

        $updateById = GrammarClass::findOrFail($id);
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
        $deleteById = GrammarClass::find($id)->delete();
        return response()->json([], 204);
    }
}
