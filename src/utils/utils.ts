import { navigateTo, redirectTo, getCurrentInstance, reLaunch } from '@tarojs/taro';
import { stringify } from 'qs';

interface QueryObj {
  [key: string]: any;
}

const navigateToPage = (url: string, params?: QueryObj) => {
  const queryStr = stringify(params, { indices: false, addQueryPrefix: true });

  navigateTo({
    url: `${url}${queryStr}`,
  });
};

const redirectToPage = (url: string, params?: QueryObj) => {
  const queryStr = stringify(params, { indices: false, addQueryPrefix: true });

  redirectTo({
    url: `${url}${queryStr}`,
  });
};

const reLaunchPage = (url: string, params?: QueryObj) => {
  const queryStr = stringify(params, { indices: false, addQueryPrefix: true });

  reLaunch({
    url: `${url}${queryStr}`,
  });
};

const routerParams = () => {
  return getCurrentInstance().router?.params;
};

export { navigateToPage, redirectToPage, routerParams, reLaunchPage };
