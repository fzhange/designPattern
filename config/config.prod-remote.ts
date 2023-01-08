import chainWebpack from './chain-webpack';
import commonConfigProcess, { publicPath } from './common-process.config';

export default {
  define: {
    'process.env.env': 'prod',
    ...commonConfigProcess,
  },
  hash: true,
  publicPath,
  ...chainWebpack,
};
