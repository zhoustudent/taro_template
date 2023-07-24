import { memo, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import VisitForm from '@/components/FormDetail';
import { reLaunchPage } from '@/utils/utils';

import './index.scss';
import { getVisitDetail } from '@/services/index';

const mapStateToProps = ({ global }: any) => {
  return { detailInfo: global.detailInfo };
};

const Index = memo((props: any) => {
  const { dispatch, detailInfo } = props;
  const [activeTab, setActiveTab] = useState('0');
  const [resultData, setResultData] = useState<any>();

  useEffect(() => {
    if (Taro.getCurrentInstance().router?.params && Taro.getCurrentInstance().router?.params.tab) {
      setActiveTab(Taro.getCurrentInstance().router?.params.tab);
    } else {
      setActiveTab('0');
    }
  }, []);

  const getDetailData = useCallback(async () => {
    const resData = await getVisitDetail({
      recordId: detailInfo.Id.toString(),
    });
    if (resData.data.code === 200 && resData.data.data.length > 0) {
      setResultData(resData.data.data[0]);
    }
  }, [detailInfo]);

  useEffect(() => {
    if (detailInfo) {
      getDetailData();
    }
  }, [detailInfo, getDetailData]);

  return (
    <View className="form-detail">
      {resultData && (
        <VisitForm
          defaultData={{
            is_pharmacy: resultData.IsPharmacy,
            medical_name: resultData.MedicalName,
            product_name: resultData.ProductName,
            visit_time: resultData.VisitTime,
            position: resultData.Position,
            is_first_push: resultData.IsFirstPush,
            display_position: resultData.DisplayPosition,
            display_face_number: resultData.DisplayFaceNumber,
            display_type: resultData.DisplayType,
            conventional_display: resultData.ConventionalDisplay,
            photo: resultData.Photo ? JSON.parse(resultData.Photo) : [],
            remarks: resultData.Remarks,
            submit_time: resultData.SubmitTime,
            communicate_content: resultData.CommunicateContent,
            result: resultData.Result,
            visit_id: resultData.Id,
            status: resultData.Status,
          }}
          disabled
          type={activeTab === '2' ? 'audit' : undefined}
        />
      )}
    </View>
  );
});

export default connect(mapStateToProps)(Index);
