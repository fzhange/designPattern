// 全局变量以及公共变量
export const tversion = process.env.TVERSION;

let domain = Number(process.env.DOMAIN) !== 0 ? process.env.DOMAIN : 'climb.tencent.com';
if (!domain) {
  domain = process.env.UMI_ENV === 'qa-remote' ? 'qa.climb.tencent.com' : 'climb.tencent.com';
}

export const apihost = `//api.${domain}`;
export const publicPathHost = `//cdn.${domain}`;

let apiDomain = 'api.climb.tencent.com';
if (process.env.UMI_ENV === 'qa' || process.env.UMI_ENV === 'qa-remote') {
  apiDomain = 'api.qa.climb.tencent.com';
} else if (process.env.UMI_ENV === 'pre1-remote') {
  apiDomain = 'api.pre1.climb.tencent.com';
} else {
  apiDomain = 'api.climb.tencent.com';
}

// cdn.qa.climb.tencent.com
let publicPath = '/';

if (process.env.NODE_ENV !== 'development') {
  publicPath = Number(tversion) === 0 ? `${publicPathHost}/admin/` : `${publicPathHost}/admin/${tversion}/`;
}

export { publicPath, domain };

export default {
  'process.env.local': 0,
  'process.env.apihost': apihost,
  'process.env.tversion': tversion,
  'process.env.commitId': process.env.COMMITID,
  'process.env.animation': true, // 是否开启页面转场动画
  'process.env.mockmenu': false, // 是否开启本地菜单
  API_DOMIN: `https://${apiDomain}`,
  DOMAIN: domain,
};
