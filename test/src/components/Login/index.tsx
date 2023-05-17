import { useMemo, useState } from 'react';
import { Form, Input, Button, FormItemProps } from 'antd';
import IconFont from '@/components/IconFont';

import { getDicts, getDeptInfo, getMenuList, login } from './Auth';
import styles from './index.module.scss';

let timerId;

function Login() {
  const [form] = Form.useForm();
  const [loginStatus, setLoginStatus] = useState<{ status: FormItemProps['validateStatus']; helpText: string }>({
    status: undefined,
    helpText: '',
  });
  const updateLoginStatus = useMemo(() => {
    clearTimeout(timerId);
    const updateLoginStatusFun = () => {
      loginStatus.status !== 'error' && setLoginStatus({ status: 'validating', helpText: '登录中，请稍后...' });
    };
    if (loginStatus.status) {
      timerId = setTimeout(updateLoginStatusFun, 300);
    }

    return updateLoginStatusFun;
  }, [loginStatus.status]);
  // 表单提交
  const onFinishFun = async (values) => {
    updateLoginStatus();
    try {
      const { dept_id } = await login(values, null, 'session');
      const menuList = await getMenuList('session');
      const menu = menuList.find((item) => item.path === '/homepage') || menuList[0];
      await getDeptInfo(dept_id);
      await getDicts();
      window.location.replace(menu?.path || '/404');
    } catch (error) {
      setLoginStatus({
        status: 'error',
        helpText: `登录失败: ${error?.response?.data?.error_description || error.message || ''}`,
      });
    }
  };
  return (
    <div className={styles.container}>
      <div
        style={{ backgroundImage: `url(${window.constants.system.backgroundUrl})` }}
        className={styles['background']}
      >
        <div className={styles.salutatory}>
          <span className={styles.text}>欢迎</span>
          <span className={styles['sub-text']}>登录管理系统</span>
        </div>
      </div>
      <div className={styles['form-content']}>
        <span className={styles.title}>{window.constants.system.title}</span>
        <Form className={styles.form} layout="vertical" form={form} onFinish={onFinishFun}>
          <Form.Item
            name="username"
            rules={[{ required: true, validateTrigger: 'submit', message: '用户名不可为空!' }]}
          >
            <Input
              placeholder="请输入名称"
              prefix={<IconFont className={styles.icon} type="icon-login_name" />}
              allowClear
              className={styles['form-input']}
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, validateTrigger: 'submit', message: '密码不可为空!' }]}>
            <Input.Password
              placeholder="请输入密码"
              prefix={<IconFont className={styles.icon} type="icon-password" />}
              allowClear
              className={styles['form-password']}
              onPressEnter={() => form.submit()}
            />
          </Form.Item>
          <Form.Item validateStatus={loginStatus.status} help={loginStatus.helpText}>
            <Button type="primary" className={styles['form-button']} onClick={() => form.submit()}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
