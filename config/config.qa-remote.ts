import chainWebpack from './chain-webpack';
import commonConfigProcess, { publicPath } from './common-process.config';

export default {
  define: {
    'process.env.env': 'qa',
    ...commonConfigProcess,
  },
  hash: true,
  publicPath,
  ...chainWebpack,
  // devtool: 'cheap-module-source-map'
};
