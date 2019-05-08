<?php
namespace Core\Validation;

use Rakit\Validation\Validator as BaseValidator;

/**
 * Form validation
 *
 * Instead of validating form inputs one by one why not use
 * this class?
 *
 * Docs are in https://github.com/rakit/Validation
 */
class Validator
{
    /**
     * Handles class of base validator
     */
    protected $validator;
    /**
     * Handles the validated data
     */
    protected $validate;

    /**
     * Class instance
     *
     * @return self
     */
    public static function getInstance(): self
    {
        return new static;
    }

    public function __construct()
    {
        $this->validator = new BaseValidator;
    }

    /**
     * Validating request object
     *
     * @param array $params
     * @param array $rules
     * @return self
     */
    public function validate(array $params, array $rules): self
    {
        $this->validate = $this->validator->validate($params, $rules);
        return $this;
    }

    public function errors(): self
    {
        return $this->validate->errors->firstOfAll();
    }

    public function fails(): bool
    {
        return $this->validate->fails();
    }
}
