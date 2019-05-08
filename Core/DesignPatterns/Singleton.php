<?php
namespace Core\DesignPatterns;
/**
 * Signleton Pattern
 * 
 * A very useful pattern that utilizes the usage of a class only once
 */
interface Singleton{
  /**
   * get instance of the current object from parent
   *
   * @return self
   */   
  static function getInstance();
}
