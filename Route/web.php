<?php 
/**
 * Basic Web Routing
 * 
 * This is were URL will handle request and be served to the browser
 */
use Core\Cookies\Session;
use Core\Database\DB;
use Core\Http\Response;
use Core\BroadCast;
use App\Controllers\Auth;

$route->get("/jen", function(){
    return view("jen");
});

$route->get('/server', function (){
    return view('server');
});

// Sign in
$route->post('/signin', 'UserController::Signin');
// Sign up
$route->post('/signup', 'UserController::Signup');
// Sign out
$route->post('/logout', function(){
    DB::update('users', [
        'online' => 0
    ], [
        'id' => Auth::user('id')
    ]);
    if(Auth::SignOut()){
        $socket = BroadCast::start();
        $socket->emit('userLoggedIn');
        $socket->close();
        return toJson(["success" => true]);
    }
    return toJson(["error" => true]);
});
// User details
$route->get("/userDetails", function(){
    return toJson((Session::has('user')) ? Auth::user() : []);
});
// add shop
$route->post("/addShop", "ShopsController::add");
// Update Shop
$route->post("/updateShop", "ShopsController::update");
// matching all uri used for Front end
$route->get('*', function(){
	return view("base");
});