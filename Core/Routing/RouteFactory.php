<?php
namespace Core\Routing;

// use Core\Routing\Route;
use Core\Http\Request;
use Core\Http\Response;

abstract class RouteFactory extends RouteDispatcher
{
    protected $namespace = "App\Controllers\\";
    /**
     * Variable that handles request class
     *
     * @var Request
     */
    protected $request;
    /**
     * Stores Routes from Route class
     *
     * @var array
     */
    protected $parameter = null;

    /**
     * Route prefixes
     * 
     * @var string
     */
    protected $prefix = "";
    /**
     * Set parameter of Route
     *
     * @param string $uri
     * @param mix $controller
     * @param int $code
     * @return void
     */
    public function AddRoutes(string $uri, $controller, int $code): void
    {
        // if(!empty($this->prefix)) $uri = $this->prefix.$uri;
        $uri = !empty($this->prefix) ? $this->prefix . $uri : $uri;
        $this->parameter[$uri] = $controller;
    }

    /**
     * Get controller of the matched route
     *
     * @return void
     */
    protected function getController()
    {
        /**
         * Check if Controller is a callback function else it will return the value from controllerResolver
         */
        return (is_callable($this->controller)) ? $this->controller : $this->controllerResolver();
    }

    /**
     * Serialize controller
     *
     * Transforming controller from a string to a array that contains
     * instantiated object of controller class and action
     *
     * @return array
     */
    protected function controllerResolver(): array
    {
        if (preg_match("/(?P<class>.+)::(?P<action>.+)/", $this->controller, $controller)) {
            $controllerClass = $this->namespace.$controller['class'];
            if (!class_exists($controllerClass)) {
                throw new \Exception("$controllerClass not found");
            }

            $controllerObject = new $controllerClass;
            $controllerAction = $controller["action"];

            if (!method_exists($controllerObject, $controllerAction)) {
                throw new \Exception("Method $controllerAction not found in class of $controllerClass");
            }

            return [$controllerObject, $controller["action"]];
        }
    }

    /**
     * Match Route via URI
     *
     * @return bool
     */
    protected function matchUri(): bool
    {
        if (is_null($this->parameter)) {
            throw new \Exception("Invalid Route");
        }

        foreach ($this->parameter as $route => $controller) {
            if (preg_match($this->handleUri($route), urldecode($this->request->getUri()), $matches)) {
                $this->controller = $controller;
                foreach ($matches as $key => $match) {
                    if (is_string($key)) {
                        $this->request->add_variables($key, $match);
                    }
                }
                return true;
            }
        }
        return false;
    }

    /**
     * Handling URI
     *
     * Basically were converting the string into a Regex Delimiter
     * for example
     *     string: /User/:id
     *     Regex: \/User\/\:(?'id'[a-zA-Z0-9]+)
     *
     * @param string $uri
     * @return string
     */
    protected function handleUri($uri): string
    { 
        if ($uri == "*") {
            return "/^(?'any'.*)$/";
        }
        $uri = preg_replace('/\//', '\/', $uri);
        $uri = preg_replace('/\:([a-zA-Z0-9]+)/', "(?'$1'.+)", $uri);
        $uri = preg_replace('/\:([a-zA-Z0-9]+)/', "(?'$1'.+(?=\/))", $uri);
        return "/^$uri$/";
    }

    /**
     * Run Route and get file to be ready to dispatch
     * 
     * @param array $config
     * @return void
     */
    public function run(array $config): void
    {
        foreach($config as $val){
            // dump($this);
            $route = $this;
            call_user_func(function() use ($route, $val){
                $route->prefix = isset($val["prefix"]) ? $val["prefix"] : "";
                require $val["file"];
            });
        }
    }
}
