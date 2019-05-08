<?php
namespace Core\Database;

class Schema
{
    static $column_parameters = [
        "/inc/" => "auto_increment",
        "/primary/" => "primary key",
        "/\!null/" => "not null",
        // "/unique/" => "unique key",
        "/default\((.+)\)/" => "default $1"
    ]; 

    static function create(string $table, array $values){
        try{
            $val = DB::select($table, '*');
            self::drop($table);
            $column = self::createString($values);
            $sql = "CREATE TABLE $table($column)";
            DB::query($sql);            
            foreach($val as $value){
                DB::insert($table, $value);
            }
        } catch(\Exception $e){
            echo $e->getMessage();
        } finally {
            echo "Migration From table $table Success!\n";
        }
    }
    
    protected static function drop($table): void
    {
        $sql = "DROP TABLE IF EXISTS `$table`";
        DB::query($sql);
    }

    protected static function createString($values): string
    {
        $colString = '';
        $count = count($values);
        foreach($values as $column => $parameter){
            $count--;
            $colString .= "$column ".self::parser($parameter).(($count !== 0) ? ",\n" : "\n"); 
        }
        return $colString;
    }

    static function parser($parameter): string
    {
        $column = preg_replace("/\|/", " ", $parameter);
        foreach(self::$column_parameters as $find => $value){
            if(preg_match($find, $column)){
                $column = preg_replace($find, $value, $column);
            }
        }
        return $column;
    }
}

// CREATE TABLE [IF NOT EXISTS] table