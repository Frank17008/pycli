import styles from './index.module.scss';

export default () => {
  return (
    <div className={styles['error']}>
      <div className={styles['content']}>
        <img src="/images/404.jpg" />
        <p className={styles['error_404']}>您访问的页面不存在或权限不足</p>
        <p>如您是在地址栏输入网址的，请确认其拼写正确，并注意网址的大小写字母区分。</p>
        <a href="/login">返回登录页</a>
      </div>
    </div>
  );
};
