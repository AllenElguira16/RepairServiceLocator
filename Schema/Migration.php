<?php
namespace Schema;
use Core\Database\Schema;

class Migration
{
    function create()
    {

        Schema::create('Users', [
            "id" => "int|inc|primary|",
            "firstname" => "text",
            "lastname" => "text",
            "email" => "text",
            "username" => "text",
            "password" => "text",
            "profile" => "text",
            "status" => "int|!null|default(0)",
            "active" => "int|!null|default(0)",
            "online" => "int|!null|default(0)"
        ]);

        Schema::create('Shops', [
            "Id" => "int(11)|inc|primary",
            "UserId" => "int",
            "Name" => "text",
            "Logo" => "text",
            "Barangay" => "text",
            "ContactNumber" => "text",
            "Category" => "text",
            "Status" => "int|!null|default(0)"
        ]);

        Schema::create('Chats', [
            "id" => "int|inc|primary",
            "UserId" => "int",
            "FriendId" => "int",
            "Content" => "text",
            "Date" => "timestamp|default(CURRENT_TIMESTAMP)"
        ]);

        Schema::create('Contacts', [
            "id" => "int|inc|primary",
            "UserId" => "int",
            "FriendId" => "int",
            "isNewMsg" => "int|default(0)",
            "Date" => "timestamp|default(CURRENT_TIMESTAMP)"            
        ]);

        Schema::create('Questions', [
            "id" => "int|inc|primary",
            "ShopId" => "int",
            "UserId" => "int",
            "Content" => "text",
            "Date" => "timestamp|default(CURRENT_TIMESTAMP)"
        ]);

        Schema::create('Answers', [
            "id" => "int|inc|primary",
            "QuestionId" => "int",
            "Content" => "text",
            "Date" => "timestamp|default(CURRENT_TIMESTAMP)"
        ]);

        Schema::create('Reviews', [
            "id" => "int|inc|primary",
            "ShopId" => "int",
            "UserId" => "int",
            "Count" => "int",
            "Content" => "text",
            "Date" => "timestamp|default(CURRENT_TIMESTAMP)"
        ]);

        // Schema::create('Reports', [
        //     "id" => "int|inc|primary",
        //     "UserId" => "int",
        //     "ShopId" => "int",
        //     "Type" => "text",
        //     "Date" => "timestamp|default(CURRENT_TIMESTAMP)"            
        // ]);

        Schema::create('Notifications', [
            'id' => 'int|inc|primary',
            'userId' => 'int',
            'type' => 'text',
            'typeId' => 'int',
            'status' => 'int|default(0)',
            'dateCreated' => "timestamp|default(CURRENT_TIMESTAMP)"
        ]);

        Schema::create('BusinessPermits', [
            'id' => 'int|inc|primary',
            'UserId' => 'int',
            'ShopId' => 'int',
            'BusinessPermits' => 'text',
            'dateCreated' => "timestamp|default(CURRENT_TIMESTAMP)"            
        ]);
    }
}