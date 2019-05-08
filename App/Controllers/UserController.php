<?php 
namespace App\Controllers;
use Core\Http\Request;
use Core\File;
use App\Models\User;
use App\Models\Shops;
use Core\Http\Response;
use Core\Hashing\Hash;
use Core\Cookies\Session;
use Core\Database\DB;
use Core\BroadCast;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

class UserController
{
    public function SignIn($request): Response
    {
        // Rules
        $validator = $request->validate([
            "username" => "required",
            "password" => "required"
        ]);
        
        // Validating
        if($validator->fails()){
            // if Fails returns error to Vue
            return toJson(["error" => "All fields are Required"]);
        } else {
            if(!User::Exists($request->input('username'))){
                return toJson(['error' => 'Username doesn\'t exists']);
            }
            // if not fail Signing in
            $check = Auth::SignIn([
                "query" => [
                    "username" => $request->input('username'),
                ],
                "verify" => $request->input('password')
            ]);
            // SignIn
            if($check){
                User::update([
                    'online' => 1,
                ], [
                    'id' => Auth::user('id')
                ]);
                $socket = BroadCast::start();
                $socket->emit('userLoggedIn');
                $socket->close();
                return toJson(["success" => true]);
            }
            // If signin fails
            return toJson(["error" => "Error signin in"]);
        }
    }
    
    public function SignUp($request): Response
    {
        // Rules
        $validator = $request->validate([
            "firstname" => "required",
            "lastname" => "required",
            "username" => "required",
            "email" => "required",
            "password" => "required",
            "repassword" => "required",
            "userType" => "required"
        ]);
        // Validating
        if($validator->fails()){
            // if Fails returns error to Vue
            return toJson(["error" => "All fields are Required"]);
        } else {
            if(User::Exists($request->input('username'))){
            	return toJson(["error" => "Username Exists!"]);
            }
            if(User::has([
                'email' => $request->input('email')
            ])){
                return toJson(["error" => "Email already exists"]);
            }
            if($request->input('password') !== $request->input('repassword')){
                return toJson(["error" => "Password Doesn't Match"]);
            }
            // if not fail Signing in
            $check = Auth::SignUp([
                "firstname" => $request->input('firstname'),
                "lastname" => $request->input('lastname'),
                "username" => $request->input('username'),
                "email" => $request->input('email'),
                "password" => Hash::make($request->input('password')),
                "status" => $request->input('userType')
            ]);
            // SignIn
            if($check){
                return toJson(["success" => true]);
            }
            // If signin fails
            return toJson(["error" => "Error signin in"]);
        }
    }

    function profile($request){
        return toJson(User::select('*', [
            'username' => $request->input('username')
        ]));
    }

    function showAuthenticatedUser() {
        if(Session::has('user')){
            return toJson(DB::select('users', '*', [
                "username" => Auth::user()['username']
            ]));
        }
        return toJson([]);
    }

    function verifyUser(Request $request): Response {
        // return toJson(Session::get('code'));
        // return toJson($request->all());
        if(Session::has('code')){
            if(Session::get('code') == $request->input('code')){
                User::update([
                    "active" => 1
                ], [
                    "id" => Auth::user('id')
                ]);
                return toJson(['success' => true]);
            }
        }
        return toJson(['success' => false]);
    }

    function resetPassword(Request $request){
        $validator = $request->validate([
            "newPassword" => "required",
            "rePassword" => "required",
        ]);
        if($validator->fails()){
            return toJson([
                'type' => 'warning',
                'msg' => 'All fields are required'
            ]);
        }
        if($request->input('newPassword') !== $request->input('rePassword')){
            return toJson([
                'type' => 'warning',
                'msg' => 'Password doesn\'t match'
            ]);
        }
        $check = User::update([
            'password' => Hash::make($request->input('newPassword')) 
        ], [
            'email' => $request->input('email')
        ]);
        if(!$check){
            return toJson([
                'type' => 'warning',
                'msg' => 'Error updating password'
            ]);
        }
        return toJson([
            'type' => 'success',
            'msg' => 'Success! go to login page'
        ]);
    }

    function generateActivation(Request $request){
        $code = substr(md5(microtime()),rand(0,26),6);
        Session::set('code', $code);
        $check = $this->smtpmailer(Auth::user('email'), 'RepairServiceOnlineLocator@gmail.com', 'RepairServiceOnlineLocator', 'Verification Code', $code);
        return toJson(['success' => $check]);
    }

    function generateCodeResetPassword(Request $request){
        // return toJson($request);
        $code = substr(md5(microtime()),rand(0,26),6);
        Session::set('code', $code);
        $check = $this->smtpmailer($request->input('email'), 'RepairServiceOnlineLocator@gmail.com', 'RepairServiceOnlineLocator', 'Verification Code', $code);
        return toJson(['success' => $check]);
    }

    function smtpmailer($to, $from, $from_name, $subject, $body) { 
        $mail = new PHPMailer();  // create a new object
        $mail->IsSMTP(); // enable SMTP
        $mail->SMTPDebug = 0;  // debugging: 1 = errors and messages, 2 = messages only
        $mail->SMTPAuth = true;  // authentication enabled
        $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 465; 
        $mail->Username = "RepairServiceOnlineLocator@gmail.com";  
        $mail->Password = "RepairServiceLocator";           
        $mail->SetFrom($from, $from_name);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->AddAddress($to);
        // if(!
        $mail->SMTPOptions = array(
            'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
            )
        );
        if($mail->Send()){
            return true;
        }
        return false;
    }

    function addProfile($request){
        $username = Auth::user('id');
        if(File::move("Public/uploads/profile/{$username}/", $request->input('image'))){
            $db = User::update([
                'profile' => $request->input('image')['name']
            ], [
                'id' => $username
            ]);
            return $db ? toJson(["success" => true]) : toJson(["error" => "insert failed"]);
        }
        return toJson(['error' => 'Upload Failed']);
    }

    function getNotificationDetails($request){
        extract($request->all());
        if($type == 'review'){
            $data = DB::select('reviews', [
                '[>]Users' => ['UserId' => 'id'],
            ], '*', [
                'reviews.id' => $typeId
            ])[0];
            return toJson([
                "data" => $data, 
                "shop" => Shops::select('*', [
                    'Id' => $data['ShopId']
                ])[0]
            ]);
        } elseif($type == 'question'){
            $data = DB::select('questions', [
                '[>]Users' => ['UserId' => 'id'],
            ], '*', [
                'questions.id' => $typeId
            ])[0];
            return toJson([
                "data" => $data, 
                "shop" => Shops::select('*', [
                    'Id' => $data['ShopId']
                ])[0]
            ]);
        } 
        elseif($type == 'answer'){
            $answer = DB::select('answers', [
                '[>]Questions' => ['QuestionId' => 'id']
            ], '*', [
                'answers.id' => $typeId
            ])[0];
            $data = User::select('*', [
                'id' => Shops::select('UserId', ['Id' => $answer['ShopId']])
            ])[0];
            return toJson([
                "data" => $data, "shop" => Shops::select('*', ['Id' => $answer['ShopId']])[0]
            ]);
        }
        // return toJson($request->all());
    }

    function getNotifications($request){
        // return toJson(Auth::user('id'));
        return toJson(DB::select('notifications', '*', [
            'userId' => Auth::user('id')
        ]));
    }

    function updateUser(Request $request){
        $validator = $request->validate([
            "firstname" => "required",
            "lastname" => "required",
            "username" => "required",
            "email" => "required",
        ]);
        // Validating
        if($validator->fails()){
            // if Fails returns error to Vue
            return toJson(["error" => "All fields are Required"]);
        } else {
            if(User::has([
                'username' => $request->input('username')
                ])
            && Auth::user('username') !== $request->input('username')){
            	return toJson([
                    'type' => 'warning',
                    'msg' => 'Username already exists'
                ]);
            }
            // if not fail Signing in
            $check = User::update([
                "firstname" => $request->input('firstname'),
                "lastname" => $request->input('lastname'),
                "username" => $request->input('username'),
                "email" => $request->input('email'),
            ], [
                'id' => Auth::user('id')
            ]);
            // SignIn
            if($check){
                Auth::UpdateUser();
                return toJson([
                    'type' => 'success',
                    'msg' => 'Changes saved!'
                ]);
            }
            // If signin fails
            return toJson([
                'type' => 'warning',
                'msg' => 'Error signing in'
            ]);
        }
    }

    function updatePassword(Request $request){
        // return toJson($request->all());
        $validator = $request->validate([
            "oldPassword" => "required",
            "newPassword" => "required",
            "rePassword" => "required",
        ]);
        // Validating
        if($validator->fails()){
            // if Fails returns error to Vue
            return toJson([
                'type' => 'warning',
                'msg' => 'All fields should not be empty'
            ]);
        }
        if(!Hash::verify($request->input('oldPassword'), Auth::user('password'))){
            return toJson([
                'type' => 'warning',
                'msg' => 'Old password is incorrect'
            ]);
        }
        if($request->input('newPassword') != $request->input('rePassword')){
            return toJson([
                'type' => 'warning',
                'msg' => 'New Password doesn\'t match'
            ]);
        }
        User::update([
            'password' => Hash::make($request->input('newPassword'))
        ], [
            'id' => Auth::user('id')
        ]);
        return toJson([
            'type' => 'success',
            'msg' => 'Password Changed'
        ]);
    }
}