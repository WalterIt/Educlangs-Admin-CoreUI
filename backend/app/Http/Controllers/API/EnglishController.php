<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\English;
use Validator;
use App\Http\Resources\EnglishResource;

class EnglishController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //  dd($request->all());   <== CAUSE CORS TROBLE!!!


        $validator = Validator::make($request->all(), [
            // 'name'    => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

    	$File = $request -> file('myfile'); //line 1
        $sub_path = 'files'; //line 2
        $real_name = date('YmdHis') . "_" .  $File->getClientOriginalName(); //line 3

        $destination_path = public_path($sub_path);  //line 4

        $File->move($destination_path,  $real_name);  //line 5

        $request['photo'] = $real_name;


        // Creating a record in a different way
        $createItem = English::create([
            // 'user_id' => $request->user()->id,
            'name' => $request->name,
            'photo' => $request->photo
        ]);
        return new EnglishResource($createItem);

        return response()->json('File(s) Saved!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
