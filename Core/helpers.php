<?php

use Core\Framework\View;
use Core\Http\Response;
// use App\Controllers\Auth;

function app($class){
    return new $class;
}

/**
 * function for page rendering
 * using twig as an template engine
 *
 * @param string $views
 * @param array $data
 * @return void
 */
function view(string $views, array $data = [])
{
    $path = config('path');
    $view = View::getInstance(dirname(__DIR__) . "/" . $path['view']);
    $view->addExtension(new Twig_Extension_Debug());
    return $view->render($views, $data);
}

/**
 * Minify html
 *
 * @param string $htmlString
 * @return string
 */
function minifyHTML($htmlString): string
{
    // Strip whitespaces
    $htmlString = preg_replace("/[\r\n]/", "", $htmlString);
    $htmlString = preg_replace("/>\s+</", "><", $htmlString);
    return $htmlString;
}

/**
 * stdCLass to Array
 *
 * @param stdClass $array
 * @return json
 */
function StdToArray(stdClass $array): json
{
    return json_decode(json_encode($array), true);
}

function config($file = '', $param = null)
{
    return Core\File::get("Config", "$file.php");
    // return Core\Path::init(
    //     dirname(__DIR__)
    // )->requireFrom("Config")->file("$file.php");
}

/**
 * print_r in downfall view
 *
 * @param mix $params
 * @return void
 */
function print_h($params)
{
    echo '<pre>';
    print_r($params);
    echo '</pre>';
}

/**
 * var_dump function in downfall view
 *
 * @param mix $params
 * @return void
 */
function dump($params)
{
    echo '<pre>';
    var_dump($params);
    echo '</pre>';
}

/**
 * prints array to JSON format usually
 * used for api based application
 *
 * @param array $param
 * @return false
 */
function toJson($param)
{
    return new Response(json_encode($param, JSON_PRETTY_PRINT), [
        "Content-Type" => "application/json",
    ]);
}

/**
 * returns an array of error
 *
 * @param string $errorString
 * @return array
 */
function error(string $errorString)
{
    return ['error' => $errorString];
}

/**
 * Redirecting to another page
 *
 * @param string $to
 * @return Response
 */
function redirect(string $to): Response
{
    $response = new Response();
    return $response->redirect($to);
}
