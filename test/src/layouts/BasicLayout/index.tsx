import { Layout } from 'antd';

import Menu from './components/Menu';
import styles from './index.module.scss';
import Logout from './components/Logout';
import Viewer from '@/components/Viewer';

export default ({ children }) => {
  return (
    <div className={styles['icestark-child-app']}>
      <div className={styles.title}>
        <div className={styles.logo}>
          <div className={styles['logo-img']} />
          <span>{`${window.constants.system.title}`}</span>
        </div>
        <Menu />
        <div className={styles['logout-content']}>
          <Logout />
        </div>
      </div>
      <Layout className={styles.content}>
        <Layout className={styles['site-layout']}>
          <Viewer>{children}</Viewer>
        </Layout>
      </Layout>
    </div>
  );
};
