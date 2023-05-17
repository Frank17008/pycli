import styles from './index.module.scss';

const NoData = () => {
  return (
    <div className={styles['noData-wrap']}>
      <div className={styles['noData-bg']} />
      <span className={styles['noData-text']}>暂无搜索结果</span>
    </div>
  );
};
export default NoData;
