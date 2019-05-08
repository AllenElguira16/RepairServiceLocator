<?php
namespace Core\Routing;

interface RouterInterface
{
    //
    public function get($uri, $controller, $code);
    //
    public function post($uri, $controller, $code);

}
