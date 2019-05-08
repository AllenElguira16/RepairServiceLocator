<?php
namespace App\Models;

use Core\Database\DB;
use Core\Hashing\Hash;
use Core\Framework\Model;

class User extends Model{
  protected static $table = 'users';

	static function Exists($username){
		// dump($username);
		return DB::has('users', [
			"username" => $username
		]);
	}

	static function fetch($username){
		return DB::select('users', 
            ["username", "password"],
            ["username" => $username]
        );
	}

	static function Create($request){
		$fetch = DB::insert("users", [
			"firstname" => $request->input("firstname"),
			"lastname" => $request->input("lastname"),
			"email" => $request->input("email"),
			"username" => $request->input("username"),
			"password" => Hash::make($request->input("password"))
		]);
		return $fetch->id();
	}
}
