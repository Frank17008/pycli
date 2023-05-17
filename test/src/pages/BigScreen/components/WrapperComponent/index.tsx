import { ReactChild } from 'react';
import styles from './index.module.scss';

function WrapperComponent(props: { className: string; title: string; right?: ReactChild; icon: ReactChild } | any) {
  const { className = '', title, right, icon, children } = props;
  return (
    <div className={`${className} ${styles['wrapper-container']}`}>
      <div className={styles.header}>
        <div className={styles['title-container']}>
          <div className={styles['title-logo']}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.label}>{title}</div>
          </div>
          {right && <div className={styles.right}>{right}</div>}
        </div>
        <div className={styles.line}>
          <div className={styles['line-left']} />
          <div className={styles['line-right']} />
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default WrapperComponent;
