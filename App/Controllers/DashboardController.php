<?php 
namespace App\Controllers;
use Core\Http\Request;
use Core\Database\DB;
use App\Models\Shops;

class DashboardController
{
    function totalShops($request){
        return toJson(DB::count('shops'));
    }

    function totalUsers($request){
        return toJson(DB::count('users'));
    }

    function totalUsersOnline($request){
        return toJson(DB::count('users', [
            'online' => 1,
            'status[!]' => 1
        ]));
    }

    function getPendingShops($request){
        return toJson(Shops::select([
            '[>]BusinessPermits' => ['Id' => 'ShopId']
        ], '*',[
            "status" => 0
        ]));
    }

    function acceptShops($request){
        $attempt = Shops::update([
            'Status' => 1
        ], [
            'Id' => $request->input('id')
        ]);
        return toJson($attempt ? [
            'type' => 'success',
            'msg' => 'Shop accepted!'
        ] : [
            'type' => 'warning',
            'msg' => 'Error accepting shop'
        ]);
    }

    function deleteShops($request){
        $attempt = Shops::delete([
            'Id' => $request->input('id')
        ]);
        return toJson($attempt ? [
            'type' => 'success',
            'msg' => 'Shop deleted!'
        ] : [
            'type' => 'warning',
            'msg' => 'Error deleting shop'
        ]);
    }
}