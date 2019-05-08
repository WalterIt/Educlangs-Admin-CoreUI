<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\UserProfile;
use Validator;
// use Illuminate\Support\Facades\File;
use App\Http\Resources\UserProfileResource;

class UserProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        // Get Lesson
        $item = UserProfile::paginate(100);

        //  Return collection of Language as a resource
        return UserProfileResource::collection($item);
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
            // 'firstName' ,
            // 'lastName'  ,
            'photo' => 'image|mimes:jpeg,png,jpg,gif,svg|max:9048',
            'mobile'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        // ** UPLOAD IMAGE
        if ($files = $request->file('photo')) {
            $destinationPath = 'public/image/profile/'; // upload path
            $profileImage = $request->firsname .'_' . date('YmdHis') . "." . $files->getClientOriginalExtension();
            $files->move($destinationPath, $profileImage);
            $insert['photo'] = "$profileImage";
         }
         // $check = Image::insertGetId($insert);

         // return Redirect::to("image")
         // ->withSuccess('Great! Image has been successfully uploaded.');

        // Creating a record in a different way
        $createItem = UserProfile::create([
            'id' => $request->user()->id,
            'gender' => $request->gender,
            'firstName'  => $request->firstName,
            'lastName'   => $request->lastName,
            'phoneHome'  => $request->phoneHome,
            'phoneComercial'  => $request->phoneComercial,
            'mobile'     => $request->mobile,
            'photo'      => $profileImage,
            // 'status'     => $request->status, // '1-admin 2-Colaborador 3-User Premium 4-UsÃ¡rio PadrÃ£o',
            'lang_id'    => $request->lang_id,  // System language
            'birthdate'  => $request->birthdate

        ]);
        return new UserProfileResource($createItem);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(UserProfile $userprofile)
    {
        return new UserProfileResource($userprofile);
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
        /*   DEBUG  */
        dd($request->all());
        //
        $validator = Validator::make($request->all(), [
            'firstName',
            'lastName',
            'mobile'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // ** UPLOAD IMAGE
        if ($File = $request->file('photo')) {

            $File = $request->file('photo'); //line 1
            $sub_path = 'image'; //line 2
            $real_name = $File->getClientOriginalName(); //line 3

            $destination_path = public_path($sub_path);  //line 4

            $File->move($destination_path,  $real_name);  //line 5

            // $request->photo = '';

            $request['photo'] = $real_name;



            /*
            $destinationPath = 'public/image/profile/'; // upload path
            $profileImage = date('YmdHis') . "." . $files->getClientOriginalExtension();
            $files->move($destinationPath, $profileImage);
            // $request['photo'] = "$profileImage";
            $request->photo = "$profileImage";
            */


            /*
            $cover = $request->file('photo');
            $extension = $cover->getClientOriginalExtension();
            $request->photo = $cover->getFilename().'.'.$extension;
            */



            /*   DEBUG  */
            dd($request->all());

         }


        // Updating user_id
       // $request['user_id'] = $request->user()->id;
       // $request['photo'] = $insert['photo'];

        $updateById = UserProfile::findOrFail($id);
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
        /**   */
        $deleteById = UserProfile::find($id)->delete();
        return response()->json([], 204);
    }
}
