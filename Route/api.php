<?php
use Core\Http\Request;
use Core\Http\Response;
use Core\Cookies\Session;
use Core\Database\DB;
use App\Controllers\Auth;
use App\Models\User;
use App\Models\Shops;
use Core\BroadCast;
use Core\File;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

$route->post('/checkIfAlreadyInContacts', 'ChatController::checkIfAlreadyInContacts');

$route->post('/search', function(Request $request): Response{
    return toJson(Shops::select('*', [
        'Name[~]' => $request->input('search'),
        'Status[!]' => 0
    ]));
});

/**
 * Dashboard
 */
$route->get('/totalShops', 'DashboardController::totalShops');

$route->get('/totalUsers', 'DashboardController::totalUsers');

$route->get('/totalUsersOnline', 'DashboardController::totalUsersOnline');


$route->get('/requests', 'DashboardController::getPendingShops');

$route->post('/requests', 'DashboardController::acceptShops');

$route->post('/deleteRequests', 'DashboardController::deleteShops');

$route->post('/deleteShop', function($request){
    $attempt = Shops::delete([
        'Id' => $request->input('id')
    ]);
    return toJson($attempt ? ['success' => true] : ['error' => 'error']);
});

/**
 * User Routes
 */
$route->get('/dummyCode', function(){
    return toJson(Session::get('code'));
});

$route->get('/user/:username', 'UserController::profile');

$route->post('/getNotificationDetails', 'UserController::getNotificationDetails');

$route->post('/verifyUser', 'UserController::verifyUser'); 

$route->post('/verifyUserForResetPassword', 'UserController::verifyUserForResetPassword');

$route->post("/generateCodeForActivation", "UserController::generateActivation");

$route->post('/generateCodeResetPassword', 'UserController::generateCodeResetPassword');

$route->post('/add-profile', 'UserController::addProfile');

$route->get('/notifications', 'UserController::getNotifications');

$route->post('/updateUser', 'UserController::updateUser');

$route->post('/updatePassword', 'UserController::updatePassword');

$route->post('/resetPassword', 'UserController::resetPassword');

/**
 * Shops
 */
$route->get("/shops/:shopId/reviews/total", 'ShopsController::totalReviews');

$route->get("/shops/:shopId/reviews", 'ShopsController::showReviews');

$route->post("/shops/reviews", 'ShopsController::addReview');

$route->get("/questions/answers", function($request){
    return toJson(DB::select('Answers', "*"));
});

$route->get("/questions/answers/:questionId", 'ShopsController::getAllAnswers');

$route->post("/questions/:id/answer", 'ShopsController::answerQuestion');

$route->get("/questions/:id", 'ShopsController::getAllQuestions');

$route->post("/questions/:ShopId", 'ShopsController::askQuestion');

$route->get("/shops/:Category/:shopName", 'ShopsController::showSingleShop');

$route->get("/shops/:Category", 'ShopsController::showShopsByCategory');

$route->post("/userDetails", 'UserController::showAuthenticatedUser');

$route->get('/users', function () {
    return toJson(User::select('*', [
        'status[!]' => 1
    ]));
});

/**
 * Chats
 */
$route->post("/addToContacts", 'ChatController::addToContacts');

$route->get('/checkForNewMessages', 'ChatController::checkForNewMessages');

$route->get("/chats/:id", 'ChatController::getChats');

$route->post('/setAsSeen', 'ChatController::setAsSeen');

$route->post("/chats/:id", 'ChatController::newChats');

$route->get("/contacts", 'ChatController::getContacts');

$route->get("/myshop", function () {
    if (Session::has("user")) {
        return toJson(DB::select('shops', '*', [
            "UserId" => Auth::user('id')
        ]));
    }
});

$route->post("/imageToBase64", function($request){
    $path = dirname(__DIR__).$request->input('dir');
    $type = pathinfo($path, PATHINFO_EXTENSION);
    $data = file_get_contents($path) or die('error');
    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
    return toJson($base64);
});

$route->get("/myshop/:id", function ($request) {
    if (Session::has("user")) {
        return toJson(DB::select('shops', '*', [
            "UserId" => Auth::user('id'),
            "Id" => $request->input('id')
        ]));
    }
});

$route->get("/shops", function () {
    $data = DB::select('shops', '*', [
        'Status' => 1
    ]);
    return toJson($data);
});
