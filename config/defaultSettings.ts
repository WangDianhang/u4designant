import { Settings as LayoutSettings } from '@ant-design/pro-layout';
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#2F54EB',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: false,
  },
  title: 'SuplayMart',
  pwa: false,
  logo: 'https://img.suplaymart.com/img/023bae00fe8f4b27bd51e3b4138158b1?imageView2/2/w/720/interlace/1/q/90',
  iconfontUrl: '',
  splitMenus: false
};
export default Settings;
