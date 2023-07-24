import { memo, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';
import { reLaunchPage } from '@/utils/utils';

const mapStateToProps = ({ test }: any) => {
  return { accessToken: test.accessToken };
};

const Index = memo((props: any) => {
  const { dispatch } = props;

  const runInit = useCallback(() => {
    dispatch({
      type: 'global/init',
    });
  }, [dispatch]);

  useEffect(() => {
    Taro.getSystemInfo({
      success: (res) => {
        dispatch({
          type: 'global/setState',
          payload: {
            bottomHeight: res.screenHeight - res.safeArea.bottom,
          },
        });
        runInit();
      },
    });
  }, [dispatch, runInit]);

  return <View className="index">欢迎进入销签客</View>;
});

export default connect(mapStateToProps)(Index);
