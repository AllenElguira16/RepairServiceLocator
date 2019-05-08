<?php
namespace Core\Routing;

use Core\DesignPatterns\Singleton;
use Core\Http\Response;
use Core\Routing\RouterInterface;

/**
 * Routing class
 *
 * With routes we can easily handle url requests 
 *
 */
class Route extends RouteFactory implements RouterInterface, Singleton
{

    /**
     * Singleton Pattern
     *
     * Implenting Singleton class to prevent multiple instance of these class
     *
     * @param Request $request
     * @return self
     */
    public static function getInstance(): self
    {
        return new static;
    }

    protected function __construct()
    {}

    /**
     * route POST function
     *
     * @param string $uri
     * @param mix $controller
     * @param integer $code
     * @return void
     */
    public function post($uri, $controller, $code = 200): void
    {
        if ($this->request->getMethod() == "POST") {
            $this->AddRoutes($uri, $controller, $code);
        }
    }

    /**
     * Route GET function
     *
     * @param string $uri
     * @param mix $controller
     * @param integer $code
     * @return void
     */
    public function get($uri, $controller, $code = 200): void
    {
        if ($this->request->getMethod() == "GET") {
            $this->AddRoutes($uri, $controller, $code);
        }
    }
}
