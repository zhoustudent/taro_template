import react, { memo, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Taro, { showToast } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { loginData } from '@/services/index';
import { AtMessage, AtInput, AtButton } from 'taro-ui';
import classnames from 'classnames';
import './index.scss';
import { reLaunchPage } from '@/utils/utils';

const Index = memo((props: any) => {
  const { dispatch } = props;
  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = useCallback(async () => {
    if (account && password) {
      const resData = await loginData({
        account,
        password,
      });
      if (resData.data && resData.data.code === 200) {
        try {
          Taro.setStorageSync('userInfo', JSON.stringify(resData.data.data));
          dispatch({
            type: 'global/setState',
            payload: {
              userInfo: resData.data.data,
            },
          });
          reLaunchPage('/pages/form/index');
        } catch (error) {
          console.warn('⚠️ js error: ', error);
        }
      } else {
        showToast({
          icon: 'error',
          title: resData.data.message,
          duration: 3000,
        });
      }
    } else {
      Taro.atMessage({
        message: '请输入完整信息',
        type: 'error',
      });
    }
  }, [account, password, dispatch]);

  const restForm = useCallback(() => {
    setAccount('');
    setPassword('');
    Taro.atMessage({
      message: '已重置',
      type: 'info',
    });
  }, []);

  return (
    <View className="index">
      <AtMessage />
      <View>
        <AtInput
          name="account"
          title="账号"
          type="text"
          placeholder="请输入账号"
          value={account}
          onChange={setAccount}
        />
        <AtInput
          name="password"
          title="密码"
          type="password"
          placeholder="请输入密码"
          value={password}
          onChange={setPassword}
        />

        <View className={classnames('at-row at-row__justify--around', 'button')}>
          <View className="at-col at-col-5">
            <AtButton onClick={restForm}>重置</AtButton>
          </View>
          <View className="at-col at-col-5">
            <AtButton type="primary" onClick={onSubmit}>
              提交
            </AtButton>
          </View>
        </View>
      </View>
    </View>
  );
});

export default connect()(Index);
