<?php
namespace Core\Framework;

use Core\Database\DB;

/**
 * Basic CRUD data handling
 *
 * Same approach as the DB class with less workload
 */
abstract class Model extends DB
{
    public static function __callStatic($name, $arg)
    {
        array_unshift($arg, static::$table);
        return call_user_func_array(['parent', $name], $arg);
    }
}
