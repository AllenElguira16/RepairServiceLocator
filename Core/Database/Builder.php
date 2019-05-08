<?php
namespace Core\Database;

class Builder{
  protected $parameter;
  protected $con;

  function __construct($con){
    $this->con = $con;
  }

  function select($select = '*'){
    // $this->parameter["select"] = empty($select) ? "*" : $select;
    $this->parameter["select"] = $select;
    return $this;
  }

  function from($from){
    $this->parameter["from"] = $from;
    return $this;
  }

  function where($where){
    $this->parameter["where"] = $where;
    return $this;
  }

  function fetchAll(){
    $queryString = $this->makeQueryString();
    return $this->query($queryString)->fetchAll(\PDO::FETCH_OBJ);
  }

  function fetch(){
    $queryString = $this->makeQueryString();
    return $this->query($queryString)->fetch(\PDO::FETCH_OBJ);
  }

  // Insert function
  // DB::insert([$user, $pass, $email])->into('chat').
  /**
   * DB::insert('user',[
   *  users => user
   * ])
   */
  function insert(string $table, array $values){
    $i = 0;
    $row_string = '';
    $value_string = '';
    $val = [];
    foreach($values as $row => $value){
      $i++;
      $row_string .= $row.(count($values) != $i ? ", " : ""); 
      $value_string .= ":$row".(count($values) != $i ? ", " : "");
      // $val[] = $value; 
    }
    // print_r($value_string);
    $queryString = "INSERT INTO $table($row_string) VALUES ($value_string)";
    // print_r($queryString);
    $stmt = $this->query($queryString, $values);
    // print_r($stmt);
  }



  function makeQueryString(){
    // print_r(isset($this->parameter));
    if(isset($this->parameter["select"])){
      extract($this->parameter);
      $queryString = "SELECT $select FROM $from ".(isset($where) ? "WHERE ".$where : "");
    }
    return $queryString;
  }

  function query($string, $val = []){
    // print_r($val);
    $stmt = $this->con->prepare($string);
    $stmt->execute($val);
    return $stmt;
  }
}
