<?php
namespace Core;

use Core\Http\Request;


class File
{
    // public static $root = dirname(__DIR__);

    public static function get(string $dir, string $file): array
    {
        $root = self::dir();
        return require "$root/$dir/$file";
    }

    /**
     * Put file to a specific directory using file object
     *
     * @param string $dir
     * @param Request $file
     * @return boolean
     */
    public static function move(string $dir, array $file)
    {   
        $dir = ROOT."/".$dir;
        // dump($dir);
        self::makeDir($dir);
        if(move_uploaded_file($file['tmp_name'], $dir.$file['name'])){
            return true;
        }
    }

    /**
     * Creates new folder
     *
     * @param string $dir
     * @return void
     */
    public static function makeDir(string $dir): void
    {
        if(!file_exists($dir)){
            mkdir($dir, 0777, true);
        }
    }

    /**
     * Root Directory
     *
     * @return string
     */
    public static function dir(): string
    {
        return dirname(__DIR__);
    }
}
