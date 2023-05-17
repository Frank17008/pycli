import IconFont from '@/components/IconFont';
import moment from 'moment';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const SysTime = () => {
  const [time, setTime] = useState<any>(moment());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className={styles['time-container']}>
      <div className={styles.data}>{time.format('YYYY-MM-DD HH:mm:ss')}</div>
    </div>
  );
};
function Logout() {
  return (
    <div className={styles['logout-container']}>
      <SysTime />
      <div className={styles.logout}>
        <div className={styles.icon}>
          <IconFont type="icon-yonghutouxiang" />
        </div>
        <div>注销</div>
      </div>
    </div>
  );
}

export default Logout;
