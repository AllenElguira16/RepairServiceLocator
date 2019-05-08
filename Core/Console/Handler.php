<?php
namespace Core\Console;

class Handler{
  /**
   * Handle Console string
   */
  function __construct($capture){
    if(preg_match("/(?'method'add)\:(?'type'[a-zA-Z0-9]+)/", $capture[1], $matches)){
      $action = $matches["method"];
      $type = $matches["type"];
      call_user_func_array([$this,$action], [$type, $capture[2]]);
    } elseif(preg_match("/(?'method'migrate)\:(?'type'[a-zA-Z0-9]+)/", $capture[1], $matches)){
      $action = $matches["method"];
      $type = $matches["type"];
      // dump($type);
      call_user_func_array([$this,$action], [$type]);
    }
  }

  function migrate($type){
    if($type === "create"){
      call_user_func(["Schema\Migration", "create"]);
    }
  }
  /**
   * Add file
   */
  function add($type, $class){
    if($type == "controller"){
      if(!class_exists("App\Controllers\$class")){
        $this->getFile(__DIR__."/Files/{$type}", dirname(dirname(__DIR__))."/App/Controllers/$class.php", $class);
      }
    } elseif($type == "model"){
      if(!class_exists("App\Models\$class")){
        $this->getFile(__DIR__."/Files/{$type}", dirname(dirname(__DIR__))."\App\Models\\$class.php", $class);
      }
    } else {
      echo "error";
    }
  }

  function getFile($source, $to, $classname){
    $file = file_get_contents($source);
    $file = preg_replace("/\(classname\)/", "$classname", $file);
    $newfile = fopen($to, "w", "w");
    fwrite($newfile, $file);
  }

  function run(){
    
  }
}
