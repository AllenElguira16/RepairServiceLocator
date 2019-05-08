<?php
namespace Core\Hashing;

class Hash
{
    /**
     * Verify if hash is matched to the stored algorithms
     *
     * @param string $string
     * @param string $hash
     * @return bool
     */
    public static function verify(string $string, string $hash)
    {
        return password_verify($string, $hash);
    }

    /**
     * Make hash
     *
     * @param string $string
     * @return string
     */
    public static function make($string)
    {
        return password_hash($string, 1);
    }
}
