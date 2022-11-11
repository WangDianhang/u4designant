// import { SettingDrawer } from '@ant-design/pro-layout';
import { history } from 'umi';
import type { RunTimeLayoutConfig } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import defaultSettings from '../config/defaultSettings';
import { ConfigProvider } from 'antd';
// import { userinfo, getMenuTreeByUser } from '@/services/global';
const loginPath = '/user/login';
ConfigProvider.config({
  theme: {
    primaryColor: '#2F54EB',
  },
});
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {},
    footerRender: () => <Footer />,
    onPageChange: () => {
      // const token = window.localStorage.getItem('token')
      // if (!token) {
      //   history.push(loginPath);
      // }
    },
    menuHeaderRender: undefined,
    childrenRender: (children: any, props: { location: { pathname: string | string[]; }; }) => {
      return (
        <>
          {children}
          {/* {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )} */}
        </>
      );
    },
    ...initialState?.settings,
  };
};
export async function getInitialState(): Promise<{
  settings?: object;
  msg?: object;
  account?: object;
  loading?: boolean;
}> {
  console.log(process.env)
  if (history.location.pathname !== loginPath) {
    // const msg = await userinfo();
    // const account = await getMenuTreeByUser()
    return {

      // msg,
      // account,
      settings: defaultSettings,
    };
  }
  return {
    settings: defaultSettings,
  };
}