import chainWebpack from './chain-webpack';
import { publicPath } from './common-process.config';
export default {
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  externals: {
    react: 'window.React',
    'cos-js-sdk-v5': 'window.COS',
    'react-dom': 'window.ReactDOM',
    'echarts': 'window.echarts',
    '@logicflow': 'window.LogicFlow',
    'moment': 'window.moment',
  },
  scripts: [
    'https://cdn.staticfile.org/react/17.0.2/umd/react.development.min.js',
    'https://cdn.staticfile.org/react-dom/17.0.2/umd/react-dom.development.min.js',
    'https://cdn.jsdelivr.net/npm/echarts@5.3.2/dist/echarts.min.js',
    'https://cdn.jsdelivr.net/npm/@logicflow/core@1.1.20/dist/logic-flow.min.js',
    'https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js',
    'https://cdn.jsdelivr.net/npm/moment@2.24.0/locale/zh-cn.js',
    { src: `${publicPath}libs/cos-js-sdk-v5.min.js` }
  ],
  // 开发环境不配置补丁
  targets: {
    chrome: false,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  esbuild: {},
  fastRefresh: {},
  // devtool: 'cheap-module-source-map',
  devtool: false
};
