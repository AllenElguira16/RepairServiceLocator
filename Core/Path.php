<?php
namespace Core;

class Path
{
    public $dir;
    // public function __construct($dir)
    // {
    //   $this->dir = $dir;
    // }

    public static function init($dir)
    {
        return new static($dir);
    }

    protected function __construct($dir)
    {
        $this->dir = $dir;
    }

    public static function add(string $path)
    {

    }

    public function requireFrom($dir)
    {
        // $dir = dirname(__DIR__);

        // return new static;
        $this->dir = $this->dir . "\\" . $dir;
        return $this;
    }

    public function file($file)
    {
        $file = $this->dir . "\\$file";
        return include $file;
    }
}
