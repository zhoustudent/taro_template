import { memo, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { testHttp } from '@/services/index';

const Index = memo(() => {
  const getService = useCallback(async () => {
    const resData: any = await testHttp();
    console.log(resData);
  }, []);

  useEffect(() => {
    // getService();
    // Taro.chooseImage({
    //   success(res) {
    //     console.log(res);
    //     const tempFilePaths = res.tempFilePaths;
    //     Taro.uploadFile({
    //       url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
    //       filePath: tempFilePaths[0],
    //       name: 'file',
    //       formData: {
    //         user: 'test',
    //       },
    //       success(d: any) {
    //         const data = d.data;
    //         //do something
    //       },
    //     });
    //   },
    // });
    // Taro.startLocationUpdateBackground({
    //   complete: (res: any) => {
    //     console.log(res);
    //   },
    // });
    // Taro.getLocation({
    //   type: 'gcj02', //返回可以用于 Taro.openLocation的经纬度
    //   success: function (res) {
    //     const latitude = res.latitude;
    //     const longitude = res.longitude;
    //     Taro.openLocation({
    //       latitude,
    //       longitude,
    //       scale: 18,
    //     });
    //   },
    // });
    // Taro.getLocation({
    //   success: (res: any) => {
    //     console.log(res);
    //   },
    // });
    // Taro.showShareMenu({});
  }, [getService]);

  return (
    <View className="index">
      <Text>hahhaha</Text>
    </View>
  );
});

export default Index;
