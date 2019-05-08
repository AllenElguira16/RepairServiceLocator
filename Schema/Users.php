<?php
namespace Schema;
use Core\Database\Schema;

class Users
{
    function create()
    {
        Schema::create('users', [
            "id" => "int|auto_increment|primary key|",
            "firstname" => "text",
            "lastname" => "text",
            "email" => "text",
            "username" => "text",
            "password" => "text",
            "status" => "int"
        ]);
    }

    function drop()
    {
        
    }
}