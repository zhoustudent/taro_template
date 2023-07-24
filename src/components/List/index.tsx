import React, { memo, useEffect, useCallback, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import { debounce } from 'lodash';
import { Picker, View } from '@tarojs/components';
import { getUserList, getVisitListById } from '@/services/index';

import { navigateToPage } from '@/utils/utils';
import { AtList, AtListItem } from 'taro-ui';
import dayjs from 'dayjs';

import './index.scss';

const mapStateToProps = ({ global }: any) => {
  return { userInfo: global.userInfo };
};

const List = memo((props: any) => {
  const { dispatch, tab, userInfo } = props;
  const [userList, setUserList] = useState([]);
  const [curUserIndex, setCurUserIndex] = useState('');
  const [listData, setListData] = useState<any>([]);
  const [startTime, setStartTime] = useState<any>(dayjs().subtract(7, 'day').format('YYYY-MM-DD'));
  const [endTime, setEndTime] = useState<any>(dayjs().format('YYYY-MM-DD'));
  const [curListData, setCurListData] = useState<any>([]);

  useEffect(() => {
    if (listData.length > 0 && startTime && endTime) {
      setCurListData(
        listData.filter((item) => {
          return (
            Number(item.SubmitTime) >= dayjs(startTime).startOf('day').unix() &&
            Number(item.SubmitTime) < dayjs(endTime).endOf('day').unix()
          );
        })
      );
    }
  }, [listData, startTime, endTime]);

  const debounceRef = useRef<any>(null);
  const getUserListFun = useCallback(async () => {
    try {
      const resData = await getUserList({
        userid: userInfo.userid.toString(),
        is_manager: userInfo.is_manager,
      });
      if (resData.data.code === 200) {
        setUserList(
          (resData.data.data || []).map((item) => {
            return {
              is_manager: item.IsManager,
              manager_id: item.ManagerId,
              userid: item.Id,
              username: item.Username,
            };
          })
        );
      } else {
        setUserList([userInfo]);
      }
    } catch (error) {
      setUserList([userInfo]);
    }
    setCurUserIndex('0');
  }, [userInfo]);

  useEffect(() => {
    // if (tab === '2') {
    //   getUserListFun();
    // } else {
    setUserList([userInfo]);
    setCurUserIndex('0');
    // }
  }, [userInfo, getUserListFun, tab]);

  const onUserChange = useCallback((value) => {
    setCurUserIndex(value.detail.value);
  }, []);

  const onStartTimeChange = useCallback((value) => {
    console.log(2323, value);
    setStartTime(value.detail.value);
  }, []);

  const onEndTimeChange = useCallback((value) => {
    console.log(2323, value);
    setEndTime(value.detail.value);
  }, []);

  const getListData = useCallback(
    async (curUserInd: any, userListArr: any) => {
      const resData = await getVisitListById({
        userid: userListArr[Number(curUserInd)].userid.toString(),
        is_manager: userListArr[Number(curUserInd)].is_manager,
      });
      if (resData.data.code === 200 && resData.data.data.length > 0) {
        if (tab === '2') {
          setListData(
            resData.data.data
              .sort((a, b) => {
                return Number(b.SubmitTime) - Number(a.SubmitTime);
              })
              .filter((item) => {
                return item.Status === '0';
              })
          );
        } else {
          setListData(
            resData.data.data.sort((a, b) => {
              return Number(b.SubmitTime) - Number(a.SubmitTime);
            })
          );
        }
      } else {
        setListData([]);
      }
      debounceRef.current = false;
    },
    [tab]
  );

  useEffect(() => {
    if (userList.length > 0 && !debounceRef.current) {
      debounceRef.current = true;

      getListData(curUserIndex, userList);
    }
  }, [getListData, curUserIndex, userList]);

  const showDetail = useCallback(
    (data) => {
      dispatch({
        type: 'global/setState',
        payload: {
          detailInfo: data,
        },
      });
      navigateToPage(`/pages/detail/index?tab=${tab || '1'}`);
    },
    [tab, dispatch]
  );
  console.log(3434, tab);
  return (
    <View className="list-body">
      {tab !== '2' && (
        <View>
          <Picker mode="date" onChange={onStartTimeChange} value={startTime}>
            <AtList>
              <AtListItem title="提交起始时间" extraText={startTime} />
            </AtList>
          </Picker>
          <Picker mode="date" onChange={onEndTimeChange} value={endTime}>
            <AtList>
              <AtListItem title="提交结束时间" extraText={endTime} />
            </AtList>
          </Picker>
        </View>
      )}

      {/* style={{ height: `calc(100vh - ${44 + (tab === '2' ? 44 : 0)}px)`, overflow: 'auto' }} */}

      {(curListData || []).length > 0 ? (
        <View
          style={{ height: `calc(100vh - ${44 + (tab !== '2' ? 88 : 0)}px)`, overflow: 'auto' }}
        >
          <AtList>
            {curListData.map((item, i) => {
              return (
                <AtListItem
                  key={i}
                  title={`${item.username ? `${item.username}-` : ''}${item.MedicalName}`}
                  note={`提交日期：${dayjs(Number(item.SubmitTime) * 1000).format('YYYY-MM-DD')} ${
                    item.Status === '1' ? '审核通过' : item.Status === '2' ? '审核驳回' : '待审核'
                  }`}
                  extraText="详情"
                  arrow="right"
                  iconInfo={{
                    size: 25,
                    color:
                      item.Status === '1' ? '#00b42a' : item.Status === '2' ? '#FF4949' : '#ffca3e',
                    value: 'bookmark',
                  }}
                  onClick={() => {
                    showDetail(item);
                  }}
                />
              );
            })}
          </AtList>
        </View>
      ) : (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
          }}
        >
          当前暂无数据
        </View>
      )}
    </View>
  );
});

export default connect(mapStateToProps)(List);
