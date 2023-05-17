import { runApp, IAppConfig } from 'ice';
import ErrorComponent from './components/ErrorBoundary';
import cache from './util/cache';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import AuthProvider from './util/config-provider/AuthProvider';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    errorBoundary: true,
    ErrorBoundaryFallback: (error) => <ErrorComponent err={error} />,
    addProvider: ({ children }: { children: React.ReactNode } | any) => {
      return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;
      /* <AuthProvider>
          <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
        </AuthProvider> */
    },
  },

  router: {
    type: 'browser',
  },
  request: {
    interceptors: {
      request: {
        onConfig: (config) => {
          const accessInfo = cache.getCache('accessInfo', 'session');
          if (accessInfo) {
            const token = `${accessInfo.tokenType} ${accessInfo.accessToken}`;
            // eslint-disable-next-line no-param-reassign
            config.headers = {
              'Tenant-Id': accessInfo.tenantId,
              'Blade-auth': token,
              Authorization: accessInfo.authorization,
              ...config.headers,
            };
          }
          return config;
        },
        onError: (error) => Promise.reject(error),
      },
      response: {
        onConfig: (response) => response,
        onError: (error) => {
          // 请求出错：服务端返回错误状态码
          if (error?.response?.status === 401) {
            window.location.replace('/login');
          }
          return Promise.reject(error?.response?.data);
        },
      },
    },
  },
};

runApp(appConfig);
