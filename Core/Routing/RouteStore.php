<?php
namespace Core\Routing;

class RouteStore
{
    protected $route = [];

    public function setRoute($uri, $controller): void
    {
        $this->route[$uri] = $controller;
    }

    public function getRoute(): array
    {
        return $this->route;
    }
}
