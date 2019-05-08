<?php
namespace Core\Cookies;

class Cookie{
	/**
	 * Return Cookie Value
	 *
	 * @param string $key
	 * @return mix
	 */
	static function get($key = null)
	{
		if(is_null($key)){
			return $_COOKIE;
		}
		return self::isset($key) ? $_COOKIE[$key] : null;
	}

	/**
	 * Set value for cookie
	 *
	 * @param string $key
	 * @param mix $value
	 * @param integer $time
	 * @param string $path
	 * @return void
	 */
	static function set(string $key, $value, $time = 0, $path = "/")
	{
		$time = $time == 0 ? time() + (86400 * 30) : $time;
		// $_SESSION[$key] = $value;
		setcookie($key, $value, $time, $path);
	}

	/**
	 * Check if cookie is present
	 *
	 * @param string $key
	 * @return boolean
	 */
	static function isset(string $key)
	{
		return array_key_exists($key, $_COOKIE) ?: false;
	}

	/**
	 * Deletes the cookie vie Key of index
	 *
	 * @param string $key
	 * @return bool
	 */
	static function delete($key)
	{
		try{
			self::set($key, '');
		} catch (\Exception $e){
			return false;
		}
		return true;
	}
}
