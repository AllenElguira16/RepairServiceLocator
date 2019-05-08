<?php
namespace App\Models;

use Core\Database\DB;
use Core\Framework\Model;
use Core\Cookies\Session;
use App\Controllers\Auth;

class Shops extends Model{

    protected static $table = 'shops'; 

    static function Exists($storeName){
        return parent::has([
            "Name" => $storeName
        ]);
    } 

    static function Add($request){
        return parent::insert([
            "UserId" => Auth::user()['id'],
            "Name" => $request->input('Name'),
            "Logo" => $request->input('Logo')['name'],
            "Barangay" => $request->input('Barangay'),
            "ContactNumber" => $request->input('ContactNumber'),
            "Category" => $request->input('Category'),
        ]);
    }

    static function Modify($request){
        return parent::update([
            "Name" => $request->input('Name'),
            "Logo" => $request->input('Logo')['name'],
            "Barangay" => $request->input('Barangay'),
            "ContactNumber" => $request->input('ContactNumber'),
            "Category" => $request->input('Category'),
        ], [
            "Id" => $request->input('id')
        ]);
    }
}