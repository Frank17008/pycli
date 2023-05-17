import React from 'react';

import Login from '@/components/Login';
import cache from '../cache';

/**
 * 权限属性
 */
export interface IAuthProviderProps {
  /**
   * 用户编号
   */
  userId: number | null;

  /**
   *  用户名称
   */
  userName?: string;

  /**
   * 用户头像文件编码
   */
  avatar?: string;
}

/**
 * 权限组件上下文
 */
const AuthProps: IAuthProviderProps = { userId: null };
export const authContext = React.createContext<IAuthProviderProps>(AuthProps);

const AuthProvider = ({ children }) => {
  const userInfo = cache.getCache('userInfo', 'session');
  const { userName, userId, avatar } = userInfo;
  if (!userInfo) {
    return <Login />;
  }
  return (
    <authContext.Provider
      value={{
        userId,
        userName,
        avatar,
      }}
    >
      <div>{React.Children.only(children)}</div>
    </authContext.Provider>
  );
};

export default AuthProvider;
