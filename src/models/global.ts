import { reLaunchPage } from '@/utils/utils';
import Taro from '@tarojs/taro';

export default {
  namespace: 'global', // 这是模块名
  state: {
    userInfo: {},
    bottomHeight: 0,
    detailInfo: {},
  },
  subscriptions: {},

  effects: {
    // 异步方法, 在这里可以用put调用同步的方法
    // generator  这里的方法第二个参数都是{call, put }, call调用异步方法, put 可以调用reducers中的方法
    *init({ payload, cb }, { call, put }) {
      // TODO: 临时代码
      try {
        var value = Taro.getStorageSync('userInfo');
        if (value) {
          // Do something with return value
          yield put({
            type: 'setState',
            payload: {
              userInfo: JSON.parse(value),
            },
          });
          reLaunchPage('/pages/form/index');
        } else {
          reLaunchPage('/pages/login/index');
        }
      } catch (e) {
        // Do something when catch error
        reLaunchPage('/pages/login/index');
      }
    },
  },

  reducers: {
    // 同步方法
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
