import { memo, useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import Taro, { showToast } from '@tarojs/taro';
import { View, Radio, Label, Text, RadioGroup, Picker } from '@tarojs/components';
import { redirectToPage } from '@/utils/utils';

import { subFormData, visitAudit } from '@/services/index';
import {
  AtInput,
  AtTextarea,
  AtList,
  AtListItem,
  AtIcon,
  AtMessage,
  AtImagePicker,
  AtButton,
} from 'taro-ui';
import dayjs from 'dayjs';
import './index.scss';

const mapStateToProps = ({ global }: any) => {
  return { bottomHeight: global.bottomHeight, userInfo: global.userInfo };
};
const VisitForm = memo((props: any) => {
  const { bottomHeight, type, disabled, defaultData, userInfo } = props;
  const [isPharmacy, setIsPharmacy] = useState('');
  const [medicalName, setMedicalName] = useState('');
  const [productName, setProductName] = useState('');
  const [visitTime, setVisitTime] = useState(dayjs().format('YYYY-MM-DD'));
  const [position, setPosition] = useState('');
  const [isFirstPush, setIsFirstPush] = useState('0');
  const [displayPosition, setDisplayPosition] = useState('');
  const [displayFaceNumber, setDisplayFaceNumber] = useState('1');
  const [displayType, setDisplayType] = useState('');
  const [conventionalDisplay, setConventionalDisplay] = useState('');
  const [photo, setPhoto] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [submitTime, setSubmitTime] = useState(dayjs().format('YYYY-MM-DD'));
  const [communicateContent, setCommunicateContent] = useState('');
  const [result, setResult] = useState('');
  const [posting, setPosting] = useState<boolean>(false);

  const handleChangePharmacy = useCallback((value) => {
    setIsPharmacy(value.detail.value);
  }, []);

  const handleChangeIsFirstPush = (value) => {
    setIsFirstPush(value.detail.value);
  };
  const onDateChange = useCallback((value) => {
    setVisitTime(value.detail.value);
  }, []);

  const onSubDateChange = useCallback((value) => {
    setSubmitTime(value.detail.value);
  }, []);

  const onNumberChange = useCallback((value) => {
    setDisplayFaceNumber(Number(value.detail.value) + 1);
  }, []);

  // https://blog.csdn.net/weixin_57605398/article/details/117823953
  const changePosition = useCallback(() => {
    Taro.getLocation({
      type: 'wgs84',
      success: (res) => {
        const url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${res.latitude},${res.longitude}&key=EUGBZ-ZBMKW-Y2PRP-O7IIQ-7Y3GH-YBBJJ`;

        Taro.request({
          url,
          success: (result) => {
            setPosition(`${result.data.result.address}`);
          },
        });
      },
      fail: (e) => {
        Taro.atMessage({
          message: '请手动输入位置，若需重新打开，则点击右上角...',
          type: 'error',
        });
      },
    });
  }, []);

  const changePhoto = useCallback(
    (value) => {
      if (!disabled) {
        setPhoto(value);
      }
    },
    [disabled]
  );

  const resetForm = useCallback(() => {
    setIsPharmacy('1');
    setTimeout(() => {
      setMedicalName('');
      setProductName('');
      setVisitTime(dayjs().format('YYYY-MM-DD'));
      changePosition();
      setIsFirstPush('0');
      setDisplayPosition('');
      setDisplayFaceNumber('1');
      setDisplayType('');
      setConventionalDisplay('');
      setPhoto([]);
      setRemarks('');

      setSubmitTime(dayjs().format('YYYY-MM-DD'));
      setCommunicateContent('');
      setResult('');
    }, 0);
  }, [changePosition]);

  const submitForm = useCallback(async () => {
    const curPhoto = [];
    if (!isPharmacy) {
      Taro.atMessage({
        message: '请选择拜访类型',
        type: 'info',
      });
      return;
    }
    if (isPharmacy === '1') {
      if (!medicalName) {
        Taro.atMessage({
          message: '请输入医疗机构名称',
          type: 'info',
        });
        return;
      }
      if (!productName) {
        Taro.atMessage({
          message: '请输入沟通产品',
          type: 'info',
        });
        return;
      }
      if (!visitTime) {
        Taro.atMessage({
          message: '请选择拜访时间',
          type: 'info',
        });
        return;
      }
      if (!isFirstPush) {
        Taro.atMessage({
          message: '请选择是否首推',
          type: 'info',
        });
        return;
      }
      if (!displayPosition) {
        Taro.atMessage({
          message: '请输入陈列位置',
          type: 'info',
        });
        return;
      }
      if (!displayFaceNumber) {
        Taro.atMessage({
          message: '请输入陈列面数',
          type: 'info',
        });
        return;
      }

      if (!displayType) {
        Taro.atMessage({
          message: '请输入陈列物品种类',
          type: 'info',
        });
        return;
      }
      if (!conventionalDisplay) {
        Taro.atMessage({
          message: '请输入产品产地',
          type: 'info',
        });
        return;
      }

      if (!submitTime) {
        Taro.atMessage({
          message: '请输入提交时间',
          type: 'info',
        });
        return;
      }
    } else {
      if (!medicalName) {
        Taro.atMessage({
          message: '请输入医疗机构名称',
          type: 'info',
        });
        return;
      }
      if (!productName) {
        Taro.atMessage({
          message: '请输入沟通产品',
          type: 'info',
        });
        return;
      }
      if (!visitTime) {
        Taro.atMessage({
          message: '请输入拜访时间',
          type: 'info',
        });
        return;
      }
      if (!conventionalDisplay) {
        Taro.atMessage({
          message: '请输入产品产地',
          type: 'info',
        });
        return;
      }

      if (!position) {
        Taro.atMessage({
          message: '请输入定位',
          type: 'info',
        });
        return;
      }
      if (!communicateContent) {
        Taro.atMessage({
          message: '请输入沟通内容',
          type: 'info',
        });
        return;
      }
      if (!result) {
        Taro.atMessage({
          message: '请输入达成结果',
          type: 'info',
        });
        return;
      }

      if (!submitTime) {
        Taro.atMessage({
          message: '请输入提交时间',
          type: 'info',
        });
        return;
      }
    }

    if (photo.length > 0) {
      for (let i = 0; i < photo.length; i++) {
        try {
          const base64 = Taro.getFileSystemManager().readFileSync(photo[i].file.path, 'base64');
          if (base64) {
            curPhoto.push('data:image/jpeg;base64,' + base64);
          }
        } catch (error) {
          console.warn('=> utilssearch.ts error imgToBase64', error);
          throw error;
        }
      }
    } else {
      Taro.atMessage({
        message: '请添加照片',
        type: 'info',
      });
      return;
    }
    const params = {
      userid: userInfo.userid.toString(),
      is_pharmacy: Number(isPharmacy),
      ...(isPharmacy === '1'
        ? {
            medical_name: medicalName,
            product_name: productName,
            visit_time: visitTime ? dayjs(visitTime).unix().toString() : '',
            position,
            is_first_push: Number(isFirstPush),
            display_position: displayPosition,
            display_face_number: Number(displayFaceNumber),
            display_type: displayType,
            conventional_display: conventionalDisplay,
            submit_time: submitTime ? dayjs(submitTime).unix().toString() : '',
            photo: curPhoto,
            remarks,
          }
        : {
            medical_name: medicalName,
            product_name: productName,
            visit_time: visitTime ? dayjs(visitTime).unix().toString() : '',
            position,
            conventional_display: conventionalDisplay,
            communicate_content: communicateContent,
            result,
            submit_time: submitTime ? dayjs(submitTime).unix().toString() : '',
            photo: curPhoto,
            remarks,
          }),
    };
    setPosting(true);
    const resData = await subFormData(params);
    setPosting(false);
    if (resData.data.code === 200) {
      showToast({
        icon: 'success',
        title: '提交成功',
        duration: 3000,
      });
      resetForm();
    } else {
      showToast({
        icon: 'error',
        title: resData.data.message,
        duration: 3000,
      });
    }
  }, [
    userInfo,
    resetForm,
    isPharmacy,
    medicalName,
    productName,
    visitTime,
    position,
    isFirstPush,
    displayPosition,
    displayFaceNumber,
    displayType,
    conventionalDisplay,
    photo,
    remarks,
    submitTime,
    communicateContent,
    result,
  ]);

  const auditForm = useCallback(
    async (status) => {
      const resData = await visitAudit({
        visit_id: defaultData.visit_id.toString(),
        audit_userid: userInfo.userid.toString(),
        audit_time: dayjs().unix().toString(),
        status,
      });

      if (resData.data.code === 200) {
        showToast({
          icon: 'success',
          title: '操作成功',
          duration: 3000,
        });
        setTimeout(() => {
          redirectToPage('/pages/form/index?tab=2');
        }, 1500);
      } else {
        showToast({
          icon: 'error',
          title: resData.message,
          duration: 3000,
        });
      }
    },
    [defaultData, userInfo]
  );

  useEffect(() => {
    if (defaultData) {
      setIsPharmacy(defaultData.is_pharmacy ? defaultData.is_pharmacy.toString() : '1');
      setMedicalName(defaultData.medical_name);
      setProductName(defaultData.product_name);
      setVisitTime(dayjs(Number(defaultData.visit_time) * 1000).format('YYYY-MM-DD'));
      setPosition(defaultData.position);
      setIsFirstPush(defaultData.is_first_push ? defaultData.is_first_push.toString() : '1');
      setDisplayPosition(defaultData.display_position);
      setDisplayFaceNumber(
        defaultData.display_face_number ? defaultData.display_face_number.toString() : '1'
      );
      setDisplayType(defaultData.display_type);
      setConventionalDisplay(defaultData.conventional_display);
      setPhoto(
        (defaultData.photo || []).map((item) => {
          return {
            url: item,
          };
        })
      );
      setRemarks(defaultData.remarks);

      setSubmitTime(dayjs(Number(defaultData.submit_time) * 1000).format('YYYY-MM-DD'));
      setCommunicateContent(defaultData.communicate_content);
      setResult(defaultData.result);
    } else {
      // resetForm();
    }
  }, [defaultData, resetForm]);

  return (
    <View className="visit-body">
      <View
        className="visit-form"
        style={{
          height: `calc(100% - ${
            bottomHeight * 2 + (type && (!defaultData || defaultData.status !== '1')) ? 58 : 0
          }px)`,
        }}
      >
        <AtMessage />
        <View>
          <RadioGroup className="radio" onChange={handleChangePharmacy}>
            <Text className="radio-label-text">拜访类型</Text>
            <Label className="radio-label">
              <Radio
                className="radio-input"
                value="2"
                checked={isPharmacy === '2'}
                disabled={disabled}
              />
              医疗机构
            </Label>
            <Label className="radio-label">
              <Radio
                className="radio-input"
                value="1"
                checked={isPharmacy === '1'}
                disabled={disabled}
              />
              零售药房
            </Label>
          </RadioGroup>
          {isPharmacy === '1' && (
            <View>
              <AtInput
                name="medicalName"
                title="药店名称"
                type="text"
                placeholder="请输入药店名称"
                value={medicalName}
                disabled={disabled}
                onChange={(value) => {
                  setMedicalName(value);
                }}
              />
              <AtInput
                name="productName"
                title="沟通产品"
                type="text"
                disabled={disabled}
                placeholder="请输入沟通产品"
                value={productName}
                onChange={(value) => setProductName(value)}
              />
              <AtInput
                name="conventionalDisplay"
                title="产品产地"
                type="text"
                placeholder="请输入产品产地"
                value={conventionalDisplay}
                disabled={disabled}
                onChange={(value) => setConventionalDisplay(value)}
              />

              <View>
                <Picker mode="date" onChange={onDateChange} value={visitTime} disabled={disabled}>
                  <AtList>
                    <AtListItem title="拜访时间" extraText={visitTime} />
                  </AtList>
                </Picker>
              </View>
              <View className="position">
                <AtInput
                  name="position"
                  title="定位"
                  type="text"
                  placeholder="请输入定位"
                  value={position}
                  onChange={(value) => setPosition(value)}
                  disabled={disabled}
                />
                <AtIcon
                  value="streaming"
                  size="20"
                  color="#999"
                  className="icon"
                  onClick={() => {
                    if (!disabled) {
                      changePosition();
                    }
                  }}
                ></AtIcon>
              </View>

              <RadioGroup className="radio" onChange={handleChangeIsFirstPush}>
                <Text className="radio-label-text">是否首推</Text>

                <Label className="radio-label">
                  <Radio
                    className="radio-input"
                    value="1"
                    checked={isFirstPush === '1'}
                    disabled={disabled}
                  />
                  是
                </Label>
                <Label className="radio-label">
                  <Radio
                    className="radio-input"
                    value="2"
                    checked={isFirstPush === '2'}
                    disabled={disabled}
                  />
                  否
                </Label>
              </RadioGroup>
              <AtInput
                name="displayPosition"
                title="陈列位置"
                type="text"
                placeholder="请输入陈列位置"
                value={displayPosition}
                onChange={(value) => setDisplayPosition(value)}
                disabled={disabled}
              />

              <View>
                <Picker
                  mode="selector"
                  onChange={onNumberChange}
                  range={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
                  disabled={disabled}
                >
                  <AtList>
                    <AtListItem title="陈列面数" extraText={displayFaceNumber} />
                  </AtList>
                </Picker>
              </View>

              <AtInput
                name="displayType"
                title="陈列物品种类"
                type="text"
                placeholder="请输入陈列物品种类"
                value={displayType}
                disabled={disabled}
                onChange={(value) => setDisplayType(value)}
              />

              <View className="photo">
                <Text className="radio-label-text">拜访照片</Text>
                <AtImagePicker files={photo} onChange={changePhoto} />
              </View>
              <View>
                <Picker
                  mode="date"
                  onChange={onSubDateChange}
                  value={submitTime}
                  disabled={disabled}
                >
                  <AtList>
                    <AtListItem title="提交时间" extraText={submitTime} />
                  </AtList>
                </Picker>
              </View>
              <AtTextarea
                name="remarks"
                title="小结"
                type="text"
                placeholder="请输入小结"
                value={remarks}
                disabled={disabled}
                onChange={(value) => setRemarks(value)}
              />
            </View>
          )}
          {isPharmacy === '2' && (
            <View>
              <AtInput
                name="medicalName"
                title="医疗机构名称"
                type="text"
                placeholder="请输入医疗机构名称"
                value={medicalName}
                disabled={disabled}
                onChange={(value) => setMedicalName(value)}
              />
              <AtInput
                name="productName"
                title="沟通产品"
                type="text"
                placeholder="请输入沟通产品"
                value={productName}
                disabled={disabled}
                onChange={(value) => setProductName(value)}
              />
              <AtInput
                name="conventionalDisplay"
                title="产品产地"
                type="text"
                placeholder="请输入产品产地"
                value={conventionalDisplay}
                disabled={disabled}
                onChange={(value) => setConventionalDisplay(value)}
              />
              <View>
                <Picker mode="date" onChange={onDateChange} value={visitTime} disabled={disabled}>
                  <AtList>
                    <AtListItem title="拜访时间" extraText={visitTime} />
                  </AtList>
                </Picker>
              </View>
              <View className="position">
                <AtInput
                  name="position"
                  title="定位"
                  type="text"
                  placeholder="请输入定位"
                  value={position}
                  disabled={disabled}
                  onChange={(value) => setPosition(value)}
                />
                <AtIcon
                  value="streaming"
                  size="20"
                  color="#999"
                  className="icon"
                  onClick={() => {
                    if (!disabled) {
                      changePosition();
                    }
                  }}
                ></AtIcon>
              </View>
              <AtInput
                name="communicateContent"
                title="沟通内容"
                type="text"
                placeholder="请输入沟通内容"
                value={communicateContent}
                disabled={disabled}
                onChange={(value) => setCommunicateContent(value)}
              />
              <AtInput
                name="result"
                title="达成结果"
                type="text"
                placeholder="请输入达成结果"
                value={result}
                disabled={disabled}
                onChange={(value) => setResult(value)}
              />
              <View className="photo">
                <Text className="radio-label-text">拜访照片</Text>
                <AtImagePicker files={photo} onChange={changePhoto} />
              </View>
              <View>
                <Picker
                  mode="date"
                  onChange={onSubDateChange}
                  value={submitTime}
                  disabled={disabled}
                >
                  <AtList>
                    <AtListItem title="提交时间" extraText={submitTime} />
                  </AtList>
                </Picker>
              </View>
              <AtTextarea
                name="remarks"
                title="备注"
                type="text"
                placeholder="请输入备注"
                value={remarks}
                disabled={disabled}
                onChange={(value) => setRemarks(value)}
              />
            </View>
          )}
          {!isPharmacy && <View></View>}
        </View>
      </View>
      {type && type === 'form' && (
        <View
          className="at-row at-row__justify--around"
          style={{
            AtListItem: 'center',
            paddingTop: '10px',
            borderTop: '1px solid rgb(214, 228, 239)',
          }}
        >
          <View className="at-col at-col-5">
            <AtButton type="secondary" onClick={resetForm}>
              重置
            </AtButton>
          </View>
          <View className="at-col at-col-5">
            <AtButton type="primary" onClick={submitForm} disabled={posting}>
              提交
            </AtButton>
          </View>
        </View>
      )}
      {type && type === 'audit' && defaultData.status !== '1' && (
        <View
          className="at-row at-row__justify--around"
          style={{
            alignItems: 'center',
            paddingTop: '10px',
            borderTop: '1px solid rgb(214, 228, 239)',
          }}
        >
          <View className="at-col at-col-5">
            <AtButton
              type="secondary"
              onClick={() => {
                auditForm('2');
              }}
            >
              审核驳回
            </AtButton>
          </View>
          <View className="at-col at-col-5">
            <AtButton
              type="primary"
              onClick={() => {
                auditForm('1');
              }}
            >
              审核通过
            </AtButton>
          </View>
        </View>
      )}
    </View>
  );
});

export default connect(mapStateToProps)(VisitForm);
