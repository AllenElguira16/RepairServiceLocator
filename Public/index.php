<?php 
/**
 * Application Bootstrapper
 * 
 * Loading all required startup such as Route, Request and Response
 */
// error_reporting(E_STRICT);
require "../vendor/autoload.php";
define("ROOT", dirname(__DIR__));
/**
 * Instantiate app
 * 
 * Running our main class to provide functionality
 */
$app = new Core\App();

/**
 * Dispatch
 * 
 * Dispatching route then returns the response class to 
 * be rendered in the screen
 */
$response = $app->handle(
  Core\Http\Request::getInstance()
);

/**
 * Serving the app by simply running this function 
 * 
 * Isn't it Amazing?
 */
$response->send();
