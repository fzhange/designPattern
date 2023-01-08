import devConfig from './dev.config';

export default {
  ...devConfig,
  define: {
    'process.env.env': 'qa',
    'process.env.local': 1,
    'process.env.MOCK': 1,
    'process.env.apihost': '/proxy',
    'process.env.mockmenu': true,
    'process.env.tversion': process.env.TVERSION,
    'process.env.log': false,
    'process.env.animation': true,
  },
  proxy: {
    '/proxy': {
      // target: 'https://mapi.qa.ym.qq.com', // 使用对应config/config.dev.ts配置
      target: 'https://api.qa.climb.tencent.com', // 使用对应config/config.dev.ts配置
      changeOrigin: true,
      pathRewrite: { '^/proxy': '' },
    },
  },
  publicPath: '/',
  // mock: {},
};
