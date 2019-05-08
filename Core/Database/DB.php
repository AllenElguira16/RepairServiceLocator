<?php
namespace Core\Database;

use Medoo\Medoo;

class DB
{
    public static function __callStatic($name, $arguments)
    {
        try {
            extract(config("database"));
            // dump($driver);
            $db = new Medoo([
                'database_type' => $driver,
                'database_name' => $dbname,
                'server' => $hostname,
                'username' => $username,
                'password' => $password,
            ]);
            $data = call_user_func_array([$db, $name], $arguments);
            if ($name === "select") {
                // return count($data) == 1 ? array_shift($data) : $data;
                // dump(count($data));
                return $data;
            } elseif ($name === "insert") {
                return $db;
            }

            return $data;
        } catch (\Exception $e) {
            echo $e->getMessage();
            exit();
        }
    }
}
