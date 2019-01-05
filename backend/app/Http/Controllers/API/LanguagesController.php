<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Language;
use Validator;
use App\Http\Resources\LanguagesResource;
use Illuminate\Support\Facades\Auth;

class LanguagesController extends Controller
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
        // $listLanguages = Language::all();
        // return $listLanguages;

        // --------------------------------------
                // Get Language
                $language = Language::paginate(100);

                //  Return collection of Language as a resource
                return LanguagesResource::collection($language);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Language $Language)
    {
        return new LanguagesResource($Language);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $id1 = Auth::user();
        // $id = strval($id1)
        // $request += $id;



        // $request = array_merge($candidate, ['purchase_order_number' => $purchaseOrderNumber]);
        // $request += $id;

        $validator = Validator::make($request->all(), [

            "name"  => 'required'
        ]);


        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // $createLanguage = Language::create($request->all());
       //  return  $createLanguage;

        // Creating a record in a different way
        $createLanguage = Language::create([
            'user_id' => $request->user()->id,
            'name' => $request->name
        ]);
        return new LanguagesResource($createLanguage);

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

            "name"  => 'required'
            ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $updateLanguageById = Language::findOrFail($id);
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
        $deleteLanguageById = Language::find($id)->delete();
        return response()->json([], 204);
    }
}
