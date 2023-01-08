import { defineConfig, } from 'umi';
import MinifyHtmlWebpackPlugin from 'minify-html-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { merge } from 'lodash';

export default defineConfig({
  chunks: ['react-libs', 'libs', 'tea-ui', 'common', 'umi'],
  chainWebpack(memo, { webpack }) {
    memo.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minChunks: 1,
          minSize: 30000,
          automaticNameDelimiter: '.',
          cacheGroups: {
            'cos-sdk': {
              minChunks: 1,
              name: 'cos-sdk',
              test: /[\\/]node_modules[\\/]cos-js-sdk-v5/,
              priority: 16
            },
            'logic-flow': {
              minChunks: 1,
              name: 'logic-flow',
              test: /[\\/]node_modules[\\/](@logicflow[\\/]core|@logicflow[\\/]extension)[\\/]/,
              priority: 13,
            },
            'e-charts': {
              minChunks: 2,
              name: 'e-charts',
              test: /[\\/]node_modules[\\/](echarts|zrender)/,
              priority: 14
            },
            'benz-amr-recorder': {
              minChunks: 2,
              name: 'benz-amr-recorder',
              test: /[\\/]node_modules[\\/]benz-amr-recorder/,
              priority: 15
            },
            'react-libs': {
              minChunks: 1,
              name: 'react-libs',
              test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|react-redux|immutable)[\\/]/,
              priority: 12,
            },
            'tea-ui': {
              minChunks: 2,
              name: 'tea-ui',
              test: /[\\/]node_modules[\\/]@tencent[\\/](climb-ui-component|tea-component|tea-sr|sr-ui)[\\/]/,
              priority: 11,
              enforce: true,
            },
            libs: {
              minChunks: 1,
              name: 'libs',
              test: /[\\/]node_modules[\\/](braft-editor|ahooks|lodash|lodash-es|classnames|@umijs|qs|umi-request|js-md5|tinycolor2|ajv|moment|@react-spring|react-hook-form|browser-cookies|events｜@tencent[\\/]sr-app|eventemitter3|react-color|@tencent[\\/]aegis-web-sdk)[\\/]/,
              priority: 10,
              enforce: true,
            },
            common: {
              minChunks: 2,
              name: 'common',
              test: /[\\/]src[\\/](components|biz-components|hooks|utils|constants|contexts|config|services)/,
              enforce: true,
              priority: 9,
            },
          },
        },
      },
    });

    /** 压缩产物html */
    memo.plugin('minify-html-webpack-plugin')
      .use(MinifyHtmlWebpackPlugin, [{
        afterBuild: true,
        src: './dist',
        dest: './dist',
        // 非html不处理
        ignoreFileNameRegex: /^((?!\.html).)*$/,
        rules: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          minifyJS: true,
          minifyCSS: true,
        }
      }])
    /** 压缩产物html end */

    /** lodash 按需引入 */
    memo.module
      .rule('js')
      .use('babel-loader')
      .tap(options => merge(options, {
        plugins: ['lodash']
      }));
    /** lodash 按需引入 End */

    // moment优化
    memo.plugin('IgnorePlugin')
      .use(webpack.IgnorePlugin, [/^\.\/(?!zh-cn|en-gb)/, /moment[\/\\]locale$/])


    memo.plugin('CaseSensitivePathsPlugin')
      .use(CaseSensitivePathsPlugin)


    // memo.module.rule('mjs-rule').test(/.m?js/).resolve.set('fullySpecified', false);
  },
});
