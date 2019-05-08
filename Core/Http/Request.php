<?php
namespace Core\Http;

use Core\Validation\Validator;
use Symfony\Component\HttpFoundation\Request as SymfonyRequest;
/**
 * Request class
 *
 *
 */
class Request 
{

    public $parameter = [];

    /**
     * Singleton Class of Request Object
     */
    public static function getInstance()
    {
        // Object in a static function
        $instance = new self;
        // chech if data is passed via JS Post request
        if ($content = json_decode(file_get_contents("php://input"))) {
            foreach ($content as $key => $value) {
                $instance->add_variables($key, $value);
            }
        }
        // Passing all the requested data to the parameter
        foreach ($_REQUEST as $key => $value) {
            $instance->add_variables($key, $value);
        }
        // dump($_FILES);
        foreach ($_FILES as $key => $value){
            $instance->add_variables($key, $value);
        }
        return $instance;
        // parent::createFromGlobals();
        // return new static;

    }

    /**
     * Get URI from the URL
     *
     * @return string
     */
    public function getUri()
    {
        return $_SERVER["REQUEST_URI"];
    }

    /**
     * Add variables to the request class
     *
     * @param mix $key
     * @param mix $value
     * @return void
     */
    public function add_variables($key, $value)
    {
        $this->parameter[$key] = $value;
    }

    /**
     * Returns value of the input
     *
     * @param string $key
     * @return mix
     */
    public function input($key)
    {
        if (!array_key_exists($key, $this->parameter)) {
            return;
        }
        return $this->parameter[$key];
    }

    /**
     * Get Request Method
     *
     * @return string
     */
    public function getMethod()
    {
        return $_SERVER["REQUEST_METHOD"];
    }

    /**
     * Returns all the data of the parameter variable
     *
     * @return void
     */
    public function all()
    {
        return $this->parameter;
    }

    /**
     * Validate request object
     *
     * @param array $ruleSet
     * @return Validator
     */ 
    public function validate(array $ruleSet): Validator
    {
        $validator = Validator::getInstance();
        return $validator->validate($this->parameter, $ruleSet);
    }
}
