<?php
namespace Core\Cookies;

class Session
{

    /**
     * Returns data
     *
     * @param string $key
     * @return mix
     */
    public static function get($key = null)
    {
        if (is_null($key)) {
            return $_SESSION;
        }
        return self::has($key) ? $_SESSION[$key] : [];
    }

    /**
     * Set data
     *
     * @param string $key
     * @param mix $value
     * @return void
     */
    public static function set($key, $value)
    {
        $_SESSION[$key] = $value;
    }

    /**
     * Check if data isset
     *
     * @param string $key
     * @return boolean
     */
    public static function has($key)
    {
        return array_key_exists($key, $_SESSION) ?: false;
    }

    /**
     * Unset session
     *
     * @param [type] $key
     * @return void
     */
    public static function remove($key = null)
    {
        if (is_null($key)) {
            throw new \Exception("Error unset() function expects argument to be string null given");
        }
        unset($_SESSION[$key]);
        return true;
    }

    /**
     * Start session
     *
     * @return void
     */
    public static function start()
    {
        session_start();
        return true;
    }

    /**
     * Destroy the current session
     *
     * @return void
     */
    public static function destroy()
    {
        session_destroy();
        return true;
    }

    /**
     * Reset session
     *
     * @return void
     */
    public static function reset()
    {
        session_reset();
        return true;
    }
}
