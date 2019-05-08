<?php
namespace Schema;
use Core\Database\Schema;

class Shops
{
    function create()
    {
        Schema::create('Shops', [
            "Id" => "int(11)|auto_increment|primary key",
            "Name" => "text",
            "Logo" => "text",
            "StreetNumber" => "text",
            "Barangay" => "text",
            "ContactNumber" => "text",
            "Category" => "text",
        ]);
    }

    function drop()
    {
        
    }
}