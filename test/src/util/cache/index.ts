import Cookie from 'js-cookie';
import { logger } from 'ice';

export type CacheType = 'local' | 'session' | 'cookie';

/**
 * 获取缓存数据
 * @param {string} key
 * @param {string} type: 缓存类型 'local'(默认) / cookie / session;
 */
function getCache(key: string, type: CacheType = 'local') {
  let data;
  switch (type) {
    case 'cookie':
      data = Cookie.get(key);
      break;
    case 'session':
      // eslint-disable-next-line no-case-declarations
      const strS = sessionStorage.getItem(key) || '';
      try {
        data = JSON.parse(strS);
      } catch (e) {
        data = strS;
      }
      break;
    default:
      // eslint-disable-next-line no-case-declarations
      const strL = localStorage.getItem(key) || '';
      try {
        data = JSON.parse(strL);
      } catch (e) {
        data = strL;
      }
      break;
  }
  return data;
}

/**
 * 获取缓存数据
 * @param {string} key
 * @param {any} value
 * @param {string} type: 缓存类型 'local'(默认) / cookie / session;
 */
function setCache(key: string, value: any, type: CacheType = 'local') {
  switch (type) {
    case 'cookie':
      Cookie.set(key, value, { expires: 7 });
      break;
    case 'session':
      sessionStorage.setItem(key, JSON.stringify(value));
      break;
    default:
      localStorage.setItem(key, JSON.stringify(value));
      break;
  }
}

/**
 * 清除缓存
 * @param key
 * @param type: 缓存类型 'local'(默认) / cookie / session;
 */
function clearCache(key: string, type: CacheType = 'local') {
  switch (type) {
    case 'cookie':
      Cookie.remove(key);
      break;
    case 'session':
      sessionStorage.removeItem(key);
      break;
    default:
      localStorage.removeItem(key);
      break;
  }
}

/**
 * 获取用户缓存
 * @param {*} key
 * @param {*} type
 */
function getUserCache(key: string, type: CacheType = 'local') {
  const id = getCache('userId', 'session');
  if (!id) {
    logger.error('无法获取用户信息！');
    return;
  }
  return getCache(`${id}-${key}`, type);
}

/**
 * 设置用户缓存
 * @param {*} key
 * @param {*} value
 * @param {*} type
 */
function setUserCache(key: string, value: any, type: CacheType = 'local') {
  const id = getCache('userId', 'session');
  if (!id) {
    logger.error('无法获取用户信息！');
    return;
  }
  return setCache(`${id}-${key}`, value, type);
}

export default {
  getCache,
  setCache,
  clearCache,
  getUserCache,
  setUserCache,
};
