import { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import { AtButton } from 'taro-ui';
import {
  View,
  Text,
  Button,
  Map,
  Swiper,
  SwiperItem,
  MovableArea,
  MovableView,
  Video,
  CoverView,
  CoverImage,
  MatchMedia,
  Icon,
  RichText,
  Form,
  Switch,
  RadioGroup,
  Label,
  Radio,
} from '@tarojs/components';
import { reLaunchPage } from '@/utils/utils';

import './index.scss';

const mapStateToProps = ({ test }: any) => {
  return { accessToken: test.accessToken };
};

const Index = memo((props: any) => {
  const { dispatch } = props;
  console.log(props);
  useEffect(() => {
    // 获取当前环境
    console.log(Taro.getEnv());
    Taro.getSystemInfo({
      success: (res) => console.log(res),
    }).then((res) => console.log(res));
    console.log(Taro.getCurrentPages());
    // Taro.showToast({
    //   title: 'ceshi',
    //   icon: 'loading',
    //   mask: true,
    // });

    // Taro.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定');
    //     } else if (res.cancel) {
    //       console.log('用户点击取消');
    //     }
    //   },
    // });
    // Taro.showLoading({
    //   title: '测试',
    // });

    // Taro.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   success: function (res) {
    //     console.log(res.tapIndex);
    //   },
    //   fail: function (res) {
    //     console.log(res.errMsg);
    //   },
    // });
    // 在顶部title那增加loading效果
    // Taro.showNavigationBarLoading();
    Taro.setBackgroundColor({
      backgroundColor: '#000', // 窗口的背景色为白色
    });
    // Taro.showTabBarRedDot({
    //   index: 1,
    // });
    // Taro.setTabBarBadge({
    //   index: 0,
    //   text: '1',
    // });
    Taro.onKeyboardHeightChange((res) => {
      console.log(res.height);
    });
    dispatch({
      type: 'test/save',
      payload: {
        accessToken: 'testzhouwenkai',
      },
    });
  }, [dispatch]);

  return (
    <View className="index">
      <AtButton type="primary">按钮文案</AtButton>
      <Text>Hello world!fass</Text>
      <Button
        onClick={() => {
          reLaunchPage('/pages/test/index');
        }}
      >
        fasd
      </Button>
      <Map longitude={116.4} latitude={39.9} style={{ width: '100%', height: '300px' }} />
      <Swiper
        className="test-h"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
      >
        <SwiperItem>
          <View className="demo-text-1">1</View>
        </SwiperItem>
        <SwiperItem>
          <View className="demo-text-2">2</View>
        </SwiperItem>
        <SwiperItem>
          <View className="demo-text-3">3</View>
        </SwiperItem>
      </Swiper>
      <MovableArea style="height: 200px; width: 200px; background: red;">
        <MovableView style="height: 50px; width: 50px; background: blue;" direction="all">
          旅行的意义
        </MovableView>
      </MovableArea>
      <Video id="myVideo" src="src">
        <CoverView className="controls">
          <CoverView className="play">
            <CoverImage className="img" src="src" />
          </CoverView>
        </CoverView>
      </Video>

      <MatchMedia minWidth={300} maxWidth={350}>
        <view>当页面宽度在 300 ~ 500 px 之间时展示这里</view>
      </MatchMedia>
      <MatchMedia minWidth={400} orientation="landscape">
        <view>当页面高度不小于 400 px 且屏幕方向为纵向时展示这里</view>
      </MatchMedia>

      <Icon size="60" type="success" />
      <Icon size="60" type="info" />
      <Icon size="60" type="warn" color="#ccc" />
      <Icon size="60" type="warn" />
      <Icon size="60" type="waiting" />
      <Icon size="20" type="success_no_circle" />
      <Icon size="20" type="warn" />
      <Icon size="20" type="success" />
      <Icon size="20" type="download" />
      <Icon size="20" type="clear" color="red" />
      <Icon size="20" type="search" />
      <RichText
        nodes={[
          {
            name: 'div',
            attrs: {
              class: 'div_class',
              style: 'line-height: 60px; color: red;',
            },
            children: [
              {
                type: 'text',
                text: 'Hello World!',
              },
            ],
          },
        ]}
      />
      <Form>
        <View className="example-body">
          <Switch name="switch" className="form-switch"></Switch>
        </View>
      </Form>
      <RadioGroup>
        <Label className="example-body__label" for="1" key="1">
          <Radio id="1" value="USA">
            USA
          </Radio>
        </Label>
        <Label className="example-body__label" for="2" key="2">
          <Radio id="2" value="CHN" checked>
            CHN
          </Radio>
        </Label>
      </RadioGroup>
    </View>
  );
});

export default connect(mapStateToProps)(Index);
