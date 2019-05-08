<?php
namespace Core\Database;

use Faker\Factory as BaseFaker;

class Faker
{
    protected $parameter;
    public static function create()
    {
        $dis = new static;
        return $dis;
    }

    public function set($data)
    {
        $this->parameter = $data;
        return $this;
    }

    public function count(int $count)
    {
        $this->count = $count;
        return $this;
    }

    public function run()
    {
        $faker = BaseFaker::create();
        for ($i = 0; $i < $this->count; $i++) {
            $data[] = call_user_func($this->parameter, $faker);
        }
        return $data;
    }
}
