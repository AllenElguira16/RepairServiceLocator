<?php
namespace App\Controllers;
use App\Models\User;
use Core\Cookies\Session;
use Core\Hashing\Hash;

class Auth  
{
	function user($param = null)
	{
		return !is_null($param) ? Session::get('user')[$param] : Session::get('user');
	}

	function SignOut()
	{
		return Session::remove('user') ? true : false;	
	}

	function SignIn($userData)
	{
		$user = User::select('*', $userData["query"])[0];
        if (!Hash::verify($userData["verify"], $user["password"])) {
            return false;
        }
		Session::set("user", $user);
		return true;
	}

	function signup($request)
	{
		$auth = User::insert($request);
		if($auth){
			Session::set("user", User::select('*', [
				"id" => $auth->id()
			])[0]);
			return true;
		}
		return false;
	}

	function UpdateUser(){
		$data = User::select('*', [
			'id' => Auth::user('id')
		]);
		static::SignOut();
		Session::set("user", $data[0]);
	}
}
