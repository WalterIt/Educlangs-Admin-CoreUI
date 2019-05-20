<?php
use Illuminate\Http\Request;
use App\Bike;
use App\Http\Resources\BikesResource;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Register Routes
Route::post('register', 'API\AuthController@register');
Route::post('login', 'API\AuthController@login');
Route::post('logout', 'API\AuthController@logout');

Route::apiResources([
    'bikes' => 'API\BikeController',
    'builders' => 'API\BuilderController',
    'items' => 'API\ItemController',
    'bikes/{bike}/ratings' => 'API\RatingController',

/****     Dictionary            *****/
    'dicten' => 'API\DictenController',
    'english' => 'API\EnglishController',
    'portuguese' => 'API\PortugueseController',
    'french' => 'API\FrenchController',
    'spanish' => 'API\SpanishController',
    'japanese' => 'API\JapaneseController',


/****     Terminology            *****/
    'grammarclass' => 'API\GrammarClassController',
    'grammartopic' => 'API\GrammarTopicController',
    'languages' => 'API\LanguagesController',
    'levels' => 'API\LevelsController',
    'lessons' => 'API\LessonsController',
    'vocabularytopic' => 'API\VocabularyTopicController',
    'units' => 'API\UnitsController',


/****     Users            *****/
'users' => 'API\UserController',

/****     User Profile            *****/
'userprofile' => 'API\UserProfileController',

/****     User Address            *****/
'useraddress' => 'API\UserAddressController'



    /*
    'builders' => 'API\BuilderController',
    'items' => 'API\ItemController',
    'bikes/{bike}/ratings' => 'API\RatingController',
    'bikes' => 'API\BikeController',
    'builders' => 'API\BuilderController',
    'items' => 'API\ItemController',
    'bikes/{bike}/ratings' => 'API\RatingController'
    */
]);
    // Update Language
   //Route::put('language', 'LanguageController@update');

Route::middleware('jwt.auth')->get('me', function(Request $request) {

    return auth()->user();

});
