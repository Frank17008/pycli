import { Spin } from 'antd';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';

export default function Loading({ tip = '数据请求中...' }: { tip: string }) {
  return (
    <div className={styles['loading-wrapper']}>
      <div className={styles['mask']} />
      <div className={styles['loading']}>
        <Spin tip={tip} />
      </div>
    </div>
  );
}
Loading.newInstance = function newNotificationInstance(properties) {
  const props = properties || {};
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<Loading {...props} />, div);
  return {
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body?.removeChild(div);
    },
  };
};
