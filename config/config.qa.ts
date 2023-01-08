import devConfig from './dev.config';
import commonConfigProcess, { publicPath } from './common-process.config';

export default {
  define: {
    ...commonConfigProcess,
    'process.env.env': 'qa', // 环境标示
    'process.env.apihost': '/proxy',
    DOMAIN: 'qa.climb.tencent.com',
  },
  proxy: {
    '/proxy': {
      target: 'https://api.qa.climb.tencent.com',
      changeOrigin: true,
      pathRewrite: { '^/proxy': '' },
    },
  },
  mock: Number(process.env.MOCK) === 1 ? {} : false,
  ...devConfig,
};
