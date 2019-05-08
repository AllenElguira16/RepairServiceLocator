<?php
namespace Core\Http;

/**
 * Response class
 */
class Response
{

    protected $headers;
    protected $content;
    /**
     * Setting Contents and Headers
     *
     * @param mix $content
     * @param mix $headers
     * @param integer $code
     */
    public function __construct($content = '', $headers = [], int $code = 200)
    {
        $this->content = $content;
        $this->headers = $headers;
    }

    /**
     * Renders content to the Browser e.g. Chrome, Firefox, Edge
     *
     * @return void
     */
    public function send(): void
    {
        $this->setHeader();
        echo $this->content;
    }

    /**
     * Set multiple headers
     *
     * @return void
     */
    public function setHeader(): void
    {
        foreach ($this->headers as $content => $type) {
            $this->header($content, $type);
        }
    }

    /**
     * Set multiple headers
     *
     * @param string $content
     * @param string $type
     * @return void
     */
    public function header(string $content, string $type = null): void
    {
        if ($type) {
            header("$content: $type; charset=UTF-8");
        } else {
            header($content);
        }
    }

    public function redirect($to)
    {
        $this->header("Location: $to");
    }
}
