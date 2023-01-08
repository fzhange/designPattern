/*
 * @Author: rileycai
 * @Date: 2022-07-02 11:18:49
 * @LastEditTime: 2022-09-05 10:24:58
 * @LastEditors: rileycai
 * @Description:
 * @FilePath: /climb-web-admin/config/config.ts
 */
import { publicPathHost, publicPath } from './common-process.config';
import Routes from './routes';

/** 字体库URL。注意：不需要全路径，保留/iconfont.css前路径；
 *
 *  示例：https://cdn3.codesign.qq.com/icons/LOD8r0BpkajRXkg/2bzpZvbYNgrZkAa/iconfont.css
 *  仅需要填： https://cdn3.codesign.qq.com/icons/LOD8r0BpkajRXkg/2bzpZvbYNgrZkAa
 * */

const ICON_LINK = 'https://cdn3.codesign.qq.com/icons/LOD8r0BpkajRXkg/xDP39qVwKAX0wlK';

export default {
  title: '企点营销',
  define: {
    DEFINE_GLOBAL_SYSTEM_CODE: 'CLIMB',
    DEFINE_AEGIS_ID:
      process.env.UMI_ENV === 'prod-remote' ? 'bGosGhPCfWtIOTdGPf' : 'bGosGhPCnnaxSLXGaB',
    DEFINE_IS_DEV: JSON.stringify(process.env.NODE_ENV === 'development'), // 是否是开发环境
  },
  dynamicImport: {
    loading: '@/components/LoadingBar/ChunkLoading.tsx',
  },
  routes: Routes,
  alias: {
    '@/@tencent/tea-component': '@tencent/tea-component',
    '@/@tencent/sr-ui': '@tencent/climb-ui-component',
    '@tencent/sr-ui': '@tencent/climb-ui-component',
    '@tencent/sr-ui-component': '@tencent/climb-ui-component',
    '@/@tencent/sr-ui-component': '@tencent/climb-ui-component',
  },
  links: [{
    rel: 'preconnect',
    href: publicPathHost,
  }, {
    rel: 'preconnect',
    href: '//cdn3.codesign.qq.com',
  }, {
    rel: 'preconnect',
    href: '//material.climb.tencent.com',
  }, {
    rel: 'dns-prefetch',
    href: publicPathHost,
  }, {
    rel: 'dns-prefetch',
    href: '//cdn3.codesign.qq.com',
  }, {
    rel: 'dns-prefetch',
    href: '//material.climb.tencent.com',
  }, {
    rel: 'preload',
    href: `${ICON_LINK}/iconfont.woff?t=76dcd6c6cf16ad8f64eeee10701b0e2c`,
    as: 'font',
    crossorigin: true,
    type: 'font/woff2'
  }, {
    rel: 'preload',
    href: `https://material.climb.tencent.com/web/common/DIN_Alternate_Number_v20220811.ttf?env=${process.env.UMI_ENV}`,
    as: 'font',
    crossorigin: true,
    type: 'font/ttf'
  },
  // 字体库 css
  {
    rel: 'stylesheet',
    href: `${ICON_LINK}/iconfont.css`,
  }, {
    rel: 'stylesheet',
    href: `${publicPath}css/tea-sr-fix.css`,
  }, {
    // 预加载登录页banner
    rel: 'preload',
    href: 'https://material.climb.tencent.com/web/login/banner.jpg?imageMogr2/strip/format/webp',
    as: 'image',
  }
  ],
  lessLoader: {
    modifyVars: {
      hack: `true; @import "~@/variables.less"; @import "~@/mixins.less";`,
      umi_env: process.env.UMI_ENV,
    },
  },
  headScripts: [
    { src: 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js', referrerpolicy: "origin" },
    { src: 'https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js', referrerpolicy: 'origin' },
  ],
  // externals: {
  //   // moment: 'window.moment',
  //   'aegis-web-sdk': 'window.Aegis',
  // },
  // scripts: [
  //   // { src: `${publicPath}libs/moment.min.js` },
  //   // { src: `${publicPath}libs/moment@2.24.0-locale-zh-cn.js` },
  // ],
  antd: false,
};
