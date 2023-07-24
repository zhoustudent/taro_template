import React, { memo, useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import VisitForm from '@/components/FormDetail';
import List from '@/components/List';

import { AtTabs, AtTabsPane } from 'taro-ui';

import './index.scss';

const mapStateToProps = ({ global }: any) => {
  return { userInfo: global.userInfo };
};

const Form = memo((props: any) => {
  const { dispatch, userInfo } = props;
  const [activeTab, setActiveTab] = useState<number>(0);
  const [tabList, setTabList] = useState<any>([]);

  const changeTab = useCallback(
    ($index, $event) => {
      if ($index === activeTab) return;
      setActiveTab($index);
    },
    [activeTab]
  );
  useEffect(() => {
    if (userInfo.userid) {
      const curTabList = [
        {
          title: '发起提交',
        },
        {
          title: '提交记录',
        },
      ];
      if (userInfo.is_manager === '1') {
        curTabList.push({
          title: '审核列表',
        });
      }
      setTabList(curTabList);
    }
  }, [userInfo]);

  useEffect(() => {
    if (Taro.getCurrentInstance().router?.params && Taro.getCurrentInstance().router?.params.tab) {
      setActiveTab(Number(Taro.getCurrentInstance().router?.params.tab));
    } else {
      setActiveTab(0);
    }
  }, []);
  return (
    <View className="wrapper">
      <AtTabs tabList={tabList} current={activeTab} onClick={changeTab}>
        {tabList.map((e, i) => {
          // 字节小程序下，如不将非当前tab内容置空，页面则不会更新
          return (
            <AtTabsPane index={i} key={i} current={activeTab}>
              {activeTab === 0 && activeTab === i ? <VisitForm type="form" /> : null}
              {activeTab === 1 && activeTab === i ? <List type="form" /> : null}
              {activeTab === 2 && activeTab === i ? <List tab="2" /> : null}
            </AtTabsPane>
          );
        })}
      </AtTabs>
    </View>
  );
});

export default connect(mapStateToProps)(Form);
