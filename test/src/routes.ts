import { IRouterConfig } from 'ice';
import { renderNotFound, isInIcestark } from '@ice/stark-app';
import BasicLayout from '@/layouts/BasicLayout';
import NotFound from '@/components/NotFound';

import BigScreen from './pages/BigScreen';

const routerConfig: IRouterConfig[] = [
  /*  {
    path: '/login',
    component: Login,
  }, */
  { path: '/404', component: NotFound },
  {
    path: '',
    component: BasicLayout,
    children: [
      { path: '/screen', component: BigScreen },
      { path: '/', redirect: '/screen' },
      { component: isInIcestark() ? renderNotFound() : NotFound },
    ],
  },
];

export default routerConfig;
