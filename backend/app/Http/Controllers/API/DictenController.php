<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Dicten;
use Validator;
use App\Http\Resources\DictenResource;

class DictenController extends Controller
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

        $list = Dicten::all();
        return  $list;

        /*
        // Get Dicten
        $dicten = Dicten::paginate(50000);

        //  Return collection of dicten words as a resource
        return DictenResource::collection($dicten);
        */

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
        $createItem = Dicten::create([
            'user_id' => $request->user()->id,
            'domain'  => $request->domain,
            'u_id'  => $request->u_id,
            'vt_id'  => $request->vt_id,
            'lss_id'  => $request->lss_id,
            'gc_id'  => $request->gc_id,
            'den_word'  => $request->den_word,
            'dpt_word'  => $request->dpt_word,
            'dfr_word'  => $request->dfr_word,
            'des_word'  => $request->des_word,
            'dja_word'  => $request->dja_word,
            'dzh_word'  => $request->dzh_word,
            'd_audio' => $request->d_audio,
            'image' => $request->image
        ]);
        return new DictenResource($createItem);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Dicten $dicten)
    {
        return new DictenResource($dicten);
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
            'user_id'    => 'required',
            'u_id'    => 'required'
            ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Updating user_id
        $request['user_id'] = $request->user()->id;

        $updateDictenById = Dicten::findOrFail($id);
        $updateDictenById->update($request->all());
        return $updateDictenById;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleteDictenById = Dicten::find($id)->delete();
        return response()->json([], 204);
    }
}
