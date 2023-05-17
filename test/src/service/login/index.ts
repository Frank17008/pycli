import { request } from 'ice';
import qs from 'qs';
import prefix from '../prefix';

const { api } = prefix;

export default { loginFun, logout };

export function loginFun(loginData, headers?) {
  return request({
    url: `${api}/blade-auth/oauth/token`,
    method: 'post',
    data: qs.stringify(loginData),
    headers,
  });
}

export function logout() {
  return request({
    url: `${api}/blade-auth/oauth/logout`,
    method: 'get',
  });
}
