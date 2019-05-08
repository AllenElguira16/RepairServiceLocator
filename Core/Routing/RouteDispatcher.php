<?php
namespace Core\Routing;

use Core\Http\Request;
use Core\Http\Response;

abstract class RouteDispatcher{
    /**
     * Dispatching the matched route
     *
     * @param Request $request
     * @return Response
     */
    public function dispatch(Request $request): Response
    {
        $this->request = $request;
        $this->run(config('route'));
        if (!$this->matchUri()) {
            throw new \Exception("uri doesn't match to any route");
        }
        $controller = $this->getController();
        return call_user_func_array($controller, [$request]);
    }
}
