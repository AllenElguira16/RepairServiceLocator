<?php
namespace Core;
use ElephantIO\Engine\SocketIO\Version2X;
use ElephantIO\Client;
/**
 * Broadcast Events
 *
 * This class helps us to communicate to the client server
 * many of you mistook that server is the backend but the real thing is
 * Server are way to provides service to the application
 *
 * In general Client and Backend had servers itself that doesn't communicate to each other
 * So this class helps you communicate with the use of Elephant.IO for PHP and Socket.IO for JS
 *
 *
 */
class BroadCast
{
    /**
     * Link referrer
     */
    protected $http = "https://www.repairservicelocator.test:8000";

    /**
     * add custom server
     *
     * @param string $http
     * @return void
     */
    public function addServer(string $http)
    {
        $this->http = $http;
    }

    /**
     * Initializing BroadCast 
     *
     * @return self
     */
    public static function start(): self
    {
        return new static;
    }

    public function __construct()
    {
        // $version = new ($this->http);
        $this->client = new Client(new Version2x($this->http, [
            'context' => [
                'ssl' => [
                    'verify_peer' => false,
                     'verify_peer_name' => false
                ]
            ]
        ]));
        $this->client->initialize();
        return $this;
    }

    /**
     * Emiting event to the client sererv(JS)
     *
     * @param string $key
     * @param array $data
     * @return void
     */
    public function emit(string $key, $data = [])
    {
        $this->client->emit($key, $data);
    }

    /**
     * Closing BroadCast Connection
     *
     * @return void
     */
    public function close()
    {
        $this->client->close();
    }
}
