import React, { useEffect, useState } from 'react';
import { MyReport } from '@pages/AppMain/Report/MyReport';
import { NoReport } from '@pages/AppMain/Report/NoReport';
import * as dateFns from 'date-fns';
import moment, { Moment } from 'moment';
import tw from 'twin.macro';
import locale from 'antd/es/date-picker/locale/ko_KR';
import { Content } from 'antd/es/layout/layout';
import { IReport } from '@shared/interface';
import useUser from '../../../hooks/useUser';
import { useLocalStorage } from '@rehooks/local-storage';
import { Link, useRouteMatch } from 'react-router-dom';

// components
import { message, DatePicker, Space } from 'antd';
import { MainLayout } from '@components/templates/MainLayout';
import { StyledRestrictedArea } from '@shared/styled/Common';

// typographys
import { StdTypoH2 } from '@shared/styled/Typography';
import getReport from '../../../hooks/apis/getReport';
import { AxiosError } from 'axios';

export interface IStudyData {
  value: number;
  name: string;
}

export const Report = () => {
  const [date, setDate] = useState<Moment>();
  const [report, setReport] = useState<IReport[]>();
  const user = useUser();
  const { path } = useRouteMatch();
  const [accessToken] = useLocalStorage('accessToken');

  function onChange(value: Moment | null) {
    if (value) {
      setDate(value);
      getReport(
        {
          date: value?.format('yyyy-MM-DD'),
          user_id: user.data?.id,
        },
        accessToken,
      )
        .then((r) => {
          setReport(r);
        })
        .catch((err: AxiosError) => {
          console.log(err);
          setReport([]);
          throw err;
        });
    }
  }
  useEffect(() => {
    onChange(moment());
  }, []);

  return (
    <MainLayout>
      <StyledRestrictedArea>
        <div tw="flex justify-between items-center mt-20 mb-7 ">
          <StdTypoH2 tw="text-gray-1 ">
            {date?.format('yyyy년 MM월 DD일') || '불러오는 중'}
          </StdTypoH2>
          <Space direction="vertical">
            <DatePicker
              locale={locale}
              tw="mb-6"
              style={{ width: '300px' }}
              defaultValue={moment()}
              onChange={onChange}
            />
          </Space>
        </div>
        <Content>
          {/* <div>{JSON.stringify(report)}</div> */}
          {JSON.stringify(report) !== '[]' ? (
            <MyReport StudyData={report} />
          ) : (
            <NoReport />
          )}
        </Content>
      </StyledRestrictedArea>
    </MainLayout>
  );
};
