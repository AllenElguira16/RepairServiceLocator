<?php
namespace Core\Framework;

use Core\Http\Response;
use Twig_Loader_Filesystem;
use Twig_Environment;

class View
{
    /**
     * Singleton class instance
     *
     * @param string $path
     * @return self
     */
    public static function getInstance(string $path): self
    {
        return new static($path);
    }

    /**
     * Initialize twig component
     *
     * @param string $path
     * @return self
     */
    protected function __construct(string $path)
    {
        // $this->path = $path;
        // $loader = new Twig_Loader_Filesystem($path);
        $this->twig = new Twig_Environment(new Twig_Loader_Filesystem($path));
        return $this;
    }

    /**
     * Add extension
     *
     * @param object $extension
     * @return void
     */
    public function addExtension(object $extension): void
    {
        $this->twig->addExtension($extension);
    }

    /**
     * Rendering data to html file
     *
     * @param string $views
     * @param array $data
     * @return Response
     */
    public function render(string $views, array $data = []): Response
    {
        return new Response($this->twig->render($views.".twig", $data));
    }
}