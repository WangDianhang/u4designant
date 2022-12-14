import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    // hmr: true,
  },
  layout: {
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  // dynamicImport: {
  //   loading: '@ant-design/pro-layout/es/PageLoading',
  // },
  // targets: {
  //   ie: 11,
  // },
  routes,
  theme: {
    'root-entry-name': 'variable',
  },
  // esbuild: {},
  // title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // fastRefresh: {},
  // nodeModulesTransform: {
  //   type: 'none',
  // },
  history: {
    type: 'hash',
  },
  // mfsu: {},
  // webpack5: {},
  // exportStatic: {},
  access: {
    strictMode: false,
  },


  initialState: {},
  fastRefresh: true,
  request: {},
  presets: ['umi-presets-pro'],
  mfsu: {
    exclude: ['@playwright/test']
  },
  model: {}
});

