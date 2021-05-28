import React, { useEffect, useMemo, useState } from 'react';
import { MyReport } from '@pages/AppMain/Report/MyReport';
import { NoReport } from '@pages/AppMain/Report/NoReport';
import { Moment } from 'moment';
import tw from 'twin.macro';
import locale from 'antd/es/date-picker/locale/ko_KR';
import { Content } from 'antd/es/layout/layout';

// components
import { Button, DatePicker, Space } from 'antd';
import { MainLayout } from '@components/Layouts/main/MainLayout';
import { StyledRestrictedArea } from '@shared/styled/Common';

// typographys
import { StdTypoH2 } from '@shared/styled/Typography';

export interface IStudyData {
  value: number;
  name: string;
}
// { value: number; name: string }[]
// export interface IArrStudyData extends Array<IStudyData> {}

export const Report = () => {
  const [report, setReport] = useState<boolean>(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [date, setDate] = useState(new Date().getDate());
  const [data, setData] = useState<Array<IStudyData>>([]);

  function onChange(value: Moment | null, dateString: string) {
    console.log(dateString);

    const dateArr = dateString.split('');
    setYear(Number(dateArr[0] + dateArr[1] + dateArr[2] + dateArr[3]));
    setMonth(Number(dateArr[5] + dateArr[6]));
    setDate(Number(dateArr[8] + dateArr[9]));
    // API요청해서 결과가 404/detail => noreport 반환
    // else (200) => report 반환
    // API 결과에 따라 setReport, setData
    setData([
      { value: 8, name: '스마트폰' },
      { value: 2, name: '조는중' },
      { value: 2, name: '자리비움' },
    ]);
  }

  return (
    <MainLayout>
      <StyledRestrictedArea>
        <div tw="flex justify-between items-center mt-20 mb-7 ">
          <StdTypoH2 tw="text-gray-1 ">
            {year}년 {month}월 {date}일
          </StdTypoH2>
          <Space direction="vertical">
            <DatePicker
              locale={locale}
              tw="mb-6"
              style={{ width: '300px' }}
              onChange={onChange}
            />
          </Space>
        </div>
        <Content>
          {/* {report == true ? <MyReport StudyData={data} /> : <NoReport />} */}
          {report == true ? <MyReport /> : <NoReport />}
        </Content>
      </StyledRestrictedArea>
    </MainLayout>
  );
};
