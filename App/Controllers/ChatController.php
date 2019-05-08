<?php 
namespace App\Controllers;
use Core\Http\Request;
use Core\Http\Response;
use App\Models\User;
use Core\BroadCast;
use Core\Database\DB;

class ChatController
{
    function getContacts(){
        $chats = User::select([
            '[<]contacts' => ['id' => 'UserId', 'id' => 'FriendId'] 
        ], [
            'users.id(FriendId)','users.firstname', 'users.lastname',
            'contacts.id', 'contacts.isNewMsg'
        ], [
            'UserId' => Auth::user('id')
        ]);
        return toJson($chats);
    }

    function checkIfAlreadyInContacts(Request $request) {
        return toJson(DB::has('contacts', [
            "OR #asd" => [
                "AND #asda" => [
                    "UserId" => Auth::user('id'),
                    "FriendId" => $request->input('shopOwnerId')
                ],
                "AND #asdas" => [
                    "UserId" => $request->input('shopOwnerId'),
                    "FriendId" => Auth::user('id')
                ]
            ]
        ]));
    }

    function newChats($request){
        // return toJson($request->all());
        if($request->input('ChatContent') !== ''){
            DB::update('contacts', [
                'isNewMsg' => 1
            ], [
                "UserId" => $request->input('id'),
                'FriendId' => Auth::user('id')
            ]);
            $db = DB::insert('chats', [
                "UserId" => Auth::user('id'),
                "Friendid" => $request->input('id'),
                "Content" => $request->input('ChatContent')
            ]);
            if($db){
                $socket = BroadCast::start();
                $socket->emit('newChat');
                $socket->close();
                return toJson(['success' => true]);
            }
            return toJson(['error' => false]);
        }
        return toJson(['error' => false]);
    }

    function getChats($request){
        return toJson(DB::select('chats', '*', [
            "OR #asdsad" => [
                "AND #asdasd" => [
                    "UserId" => Auth::user('id'),
                    "FriendId" => $request->input('id')
                ],
                "AND #SADSD" => [
                    "FriendId" => Auth::user('id'),
                    "UserId" => $request->input('id')
                ],
            ]
        ]));
    }

    function addToContacts($request){
        try{
            if(!DB::has('contacts', [
                "OR #asd" => [
                    "AND #asda" => [
                        "UserId" => Auth::user('id'),
                        "FriendId" => $request->input('shopOwnerId')
                    ],
                    "AND #asdas" => [
                        "UserId" => $request->input('shopOwnerId'),
                        "FriendId" => Auth::user('id')
                    ]
                ]
            ])){
                DB::insert("contacts", [
                    "UserId" => Auth::user('id'),
                    // "isNewMsg" => 1,
                    "FriendId" => $request->input('shopOwnerId')
                ]);
                DB::insert("contacts", [
                    "UserId" => $request->input('shopOwnerId'),
                    "FriendId" => Auth::user('id')
                ]);
            }
            return toJson(["success" => true]);
        } catch (\Exception $e){
            return toJson(["error" => $e->getMessage()]);
        }
    }

    function setAsSeen($request){
        // return toJson($request);
        $check = DB::update('contacts', [
            'isNewMsg' => 0
        ], [
            "UserId" => Auth::user('id'),
            'FriendId' => $request->input('id')
        ]);
        if($check){
            return toJson(['success' => true]);
        }
    }

    function checkForNewMessages(Request $request): Response{
        return toJson(['success' => DB::has('contacts', [
            "AND" => [
                "isNewMsg" => 1,
                "UserId" => Auth::user('id'),
            ]
        ])]);
    }
}