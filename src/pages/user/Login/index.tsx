import Footer from '@/components/Footer';
import { handuser } from '@/services/global';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-form';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, SelectLang, useIntl } from 'umi';
import styles from './index.less';
const success = '登录成功!';
const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const intl = useIntl();
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // handuser({ ...values }).then(res => {
      //   if (res.code == 0) {
      //     window.localStorage.setItem('token', res.result.token)
      //     message.success(success)
      window.location.href = '/'
      //   }
      // })
    } catch (error) {
      message.error(error)
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="https://img.suplaymart.com/img/023bae00fe8f4b27bd51e3b4138158b1?imageView2/2/w/720/interlace/1/q/90" />}
          title="SuplayMart"
          subTitle={''}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab={intl.formatMessage({
                id: 'pages.login.accountLogin.tab',
                defaultMessage: '账户密码登录',
              })}
            />
            {/* <Tabs.TabPane
              key="mobile"
              tab={intl.formatMessage({
                id: 'pages.login.phoneLogin.tab',
                defaultMessage: '手机号登录',
              })}
            /> */}
          </Tabs>
          {type === 'account' && (
            <>
              <ProFormText
                name="code"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder='请输入账号'
                rules={[
                  {
                    required: true,
                    message: "请输入账号!"
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder='请输入密码'
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
            </ProFormCheckbox>
            {/* <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
            </a> */}
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
