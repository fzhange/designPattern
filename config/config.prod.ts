import devConfig from './dev.config';
import commonConfigProcess, { publicPath } from './common-process.config';

export default {
  ...devConfig,
  define: {
    ...commonConfigProcess,
    'process.env.env': 'prod',
    'process.env.apihost': 'https://api.climb.tencent.com',
  },
  hash: true,
};
