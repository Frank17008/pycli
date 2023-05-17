import md5 from 'js-md5';
import { Base64 } from 'js-base64';
import cache from '@/util/cache';
import { formatTree } from '@/util/tools';
import service from '@/service';

export default {
  login,
  logout,
  logoutLocal,
  getUserItem,
  getMenuList,
  getDicts,
};

export type CacheType = 'local' | 'session' | 'cookie';

export interface LoginData {
  username: string;
  password: string;
  grantType?: string;
}
export interface HeadersProps {
  clientId?: string;
  clientSecret?: string;
  tenantId?: string;
}

export function login(loginData: LoginData, headersProps?: HeadersProps | null, cached?: CacheType) {
  const logindata = getDefaultLoginData(loginData);
  const headers = getDefaultHeaders(headersProps);
  return service.login.loginFun(logindata, headers).then((response) => {
    if (cached) {
      const userInfo = {
        account: response.account,
        userName: response.user_name,
        userId: response.user_id,
        nickName: response.nick_name,
        realName: response.real_name,
        roleId: response.role_id,
        roleName: response.role_name,
        avatar: response.avatar,
        scope: response.scope,
      };
      const accessInfo = {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        expires: response.expires_in,
        deptId: response.dept_id,
        detail: response.detail,
        tokenType: response.token_type,
        tenantId: response.tenant_id,
        authorization: headers.Authorization,
      };
      saveToCache({ userInfo, accessInfo }, cached);
    }
    return response;
  });
}

export function logout(clearCache?: boolean) {
  return service.login.logout().then((response) => {
    clearCache !== false && clearFromCache();
    return response;
  });
}

export function logoutLocal() {
  clearFromCache();
}

export function getUserItem(name) {
  const userInfo = cache.getCache('userInfo', 'session');
  return userInfo[name];
}

export function getMenuList(cached?: CacheType) {
  return service.Common.getMenuList().then((response) => {
    if (cached) {
      cache.setCache('menuList', response, cached);
    }
    return response;
  });
}

export function getDicts() {
  return service.Common.getDictsAll().then((res) => {
    const dicts = formatTree(res?.data);
    cache.setCache('dicts', dicts, 'session');
  });
}

export function getDeptInfo(deptId) {
  return service.Common.getDeptInfo(deptId).then((response) => {
    cache.setCache('deptInfo', response, 'session');
  });
}

// 清除
function clearFromCache() {
  cache.clearCache('accessInfo', 'session');
  cache.clearCache('userInfo', 'session');
  cache.clearCache('menuList', 'session');
  cache.clearCache('deptInfo', 'session');
  cache.clearCache('dicts', 'session');
}

function getDefaultLoginData(data) {
  const { username } = data;
  const password = md5(data.password);
  const grant_type = data?.grantType || 'password';
  return { username, password, grant_type };
}

function getDefaultHeaders(headers) {
  const Authorization = `Basic ${Base64.encode(
    `${headers?.clientId || 'sword'}:${headers?.clientSecret || 'sword_secret'}`,
  )}`;
  const tenantId = `${headers?.tenantId || '000000'}`;
  const ContentType = 'application/x-www-form-urlencoded';
  return { Authorization, 'Content-Type': ContentType, 'Tenant-Id': tenantId };
}

function saveToCache(data, type) {
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    cache.setCache(keys[i], data[keys[i]], type);
  }
}
