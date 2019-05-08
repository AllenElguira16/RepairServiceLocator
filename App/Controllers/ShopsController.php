<?php 
namespace App\Controllers;
use Core\BroadCast;
use Core\Http\Request;
use Core\Database\DB;
use App\Models\Shops;
use Core\File;

class ShopsController
{
    /**
     * Add new Shop
     */
    function add($request){
        // return toJson($request->all());
        $validator = $request->validate([
            "Name" => "required",
            "Logo" => "required",
            "Barangay" => "required",
            "ContactNumber" => "required",
            "BusinessPermits" => "required",
            "Category" => "required"
        ]);
        if($validator->fails()){
            return toJson(["error" => "fields are required"]);
        };
        if(Shops::Exists($request->input('Name'))){
            return toJson(["error" => "StoreName already Exists"]);
        }
        $db = Shops::Add($request);
        if($db->id()){
            DB::insert('BusinessPermits', [
                "UserId" => Auth::user('id'),
                "ShopId" => $db->id(),
                "BusinessPermits" => $request->input('BusinessPermits')['name']
            ]);
            $dir = "Public/uploads/Shops/{$request->input('Name')}/";
            if(File::move($dir, $request->input('Logo')) && File::move($dir, $request->input('BusinessPermits'))){
                $socket = BroadCast::start();
                $socket->emit('newShops');
                $socket->close();
                return toJson(["success" => true]);
            }
            return toJson(["error" => "Upload failed"]);
        } 
        return toJson(["error" => "error inserting"]);
    }

    /**
     * Update existing shop
     */
    function update($request){
        $validator = $request->validate([
            "Name" => "required",
            "Logo" => "required",
            "Barangay" => "required",
            "ContactNumber" => "required",
            "Category" => "required"
        ]);
        if($validator->fails()){
            return toJson(["error" => "fields are required"]);
        };
        if(Shops::Exists($request->input('Name'))){
            return toJson(["error" => "Shop already Exists"]);
        }
        $db = Shops::Modify($request);
        if($db){
            if(File::move("Public/uploads/Shops/{$request->input('Name')}/", $request->input('Logo'))){
                return toJson(["success" => true]);
            }
            return toJson(["error" => "Upload failed"]);
        }
        return toJson(["error" => "error updating"]);
    }

    /**
     * return single shop
     */
    function showSingleShop($request) {
        return toJson(DB::select('shops', [
            "[>]users" => ["UserId" => "id"]
        ], [
            'Users.firstname', 'Users.lastname', 'Users.username', 
            'Shops.Id', 'Shops.UserId', 'Shops.Name', 'Shops.Logo', 'Shops.Barangay', 'Shops.ContactNumber',
        ], [
            "Category" => $request->input('Category'),
            "Name" => $request->input('shopName'),
            "shops.Status" => 1
        ]));
    }

    /**
     * Display shop by category
     */
    function showShopsByCategory($request) {
        $result = DB::select('shops', '*', [
                "Category" => $request->input('Category'),
                "Status" => 1
            ]
        );
        return toJson($result);
    }

    /**
     * Ask question to a shop
     */
    function askQuestion($request){
        // return toJson();
        $ownerId = Shops::select('UserId', ['Id' => $request->input('ShopId')])[0];
        $db = DB::insert("Questions", [
            "Content" => $request->input("question"),
            "ShopId" => $request->input("ShopId"),
            "UserId" => Auth::user("id")
        ]);
        DB::insert('notifications', [
            'userId' => $ownerId,
            'type' => 'question',
            'typeId' => $db->id()
        ]);
        if($db){
            $socket = BroadCast::start();
            $socket->emit('newQuestions');
            $socket->close();
            return toJson(["success" => true]);
        }
        return toJson(["error" => "Something went wrong"]);
    }

    /**
     * Get all questions per shops
     */
    function getAllQuestions($request){
        return toJson(DB::select("Questions", [
            "[>]Users" => ["UserId" => "id"]
        ], [
            "Questions.id", "Questions.Content", "Questions.Date", "Users.firstname", "Users.lastname", "Users.username", 
        ], [
            "ShopId" => $request->input('id'),
            "ORDER" => ["Questions.Date" => "DESC"]
        ]));
    }

    /**
     * answer a question and it will emit to the sockets server to change some displays
     */
    function answerQuestion($request){
        // return toJson($request->all());
        $db = DB::insert("Answers", [
            "QuestionId" => $request->input("QuestionId"),
            "Content" => $request->input("Content")
        ]);
        // return toJson($db->id());
        DB::insert('notifications', [
            'userId' => DB::select('questions', 'UserId', ['id' => $db->id()])[0],
            'type' => 'answer',
            'typeId' => $db->id()
        ]);
        if($db){
            $socket = BroadCast::start();
            $socket->emit('newAnswer', ["QuestionId" => $request->input('QuestionId')]);
            $socket->close();
            return toJson(["success" => true]);
        }
        return toJson(["error" => true]);
    }    

    function getAllAnswers($request){
        return toJson(DB::select('Answers', "*", [
            "QuestionId" => $request->input('questionId')
        ]));
    }

    function addReview($request){
        // return toJson($request->all());
        $db = DB::insert("Reviews", [
            "Content" => $request->input('reviewContent'),
            "Count" => $request->input('rating'),
            "ShopId" => $request->input('shopId'),
            "UserId" => Auth::user("id")
        ]);
        DB::insert('notifications', [
            'userId' => $request->input('ownerId'),
            'type' => 'review',
            'typeId' => $db->id()
        ]);
        if($db){
            $socket = BroadCast::start();
            $socket->emit('newRating');
            $socket->close();
            return toJson(["success" => true]);
        }
        return toJson(["error" => true]);
    }

    function showReviews($request){
        return toJson(DB::select('Reviews', [
            "[>]Users" => ["UserId" => "id"]
        ], [
            "Reviews.id(ReviewId)", "Reviews.Count", "Reviews.Content", "Reviews.Date",
            "Users.id(UserId)", "Users.firstname", "Users.lastname", "Users.username"
        ], [
            "ShopId" => $request->input("shopId")
        ]));
    }

    function totalReviews($request){
        if($request->input('shopId') != "undefined"){
            $reviews = DB::select('Reviews', '*', [
                "ShopId" => $request->input("shopId")
            ]);
            $total = 0;
            $count = count($reviews);
            foreach($reviews as $review){
                $total += $review["Count"];
            }
            return toJson(["average" => $total / $count]);
        }
        return toJson([]);
    }
}