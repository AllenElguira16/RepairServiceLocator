<?php
namespace Core;

use Core\Cookies\Session;
use Core\Http\Request;
use Core\Http\Response;
use Core\Routing\Route;

/**
 * Application Bootstrap
 */
class App
{
    /**
     * Class constructor
     *
     * Starting session
     *
     * @param string $dir
     */
    public function __construct()
    {
        Session::start();
        require_once 'Helpers.php';
        // Path::require("");
        $this->route = Route::getInstance();
        // $this->route = Route::getInstance($request);
    }

    /**
     * Handling Request Class
     *
     * this Function handles Request Class that will be provided and
     * available throughout the project by passing it to the route
     * as it renders the data to the view
     *
     * @param Request $request
     * @return Response
     */
    public function handle($request): Response
    {
        // $this->route->
        return $this->route->dispatch($request);
    }
}
