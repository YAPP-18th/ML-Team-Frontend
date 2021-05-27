import React, { useState } from 'react';
import { StyledRestrictedArea } from '@shared/styled/Common';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import 'twin.macro';
import locale from 'antd/es/date-picker/locale/ko_KR';
import { Content } from 'antd/es/layout/layout';
// typographys
import { StdTypoH2 } from '@shared/styled/Typography';

// components
import { Button, DatePicker, Space } from 'antd';
import { MainLayout } from '@components/Layouts/main/MainLayout';
import { Moment } from 'moment';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';

interface IDateProps {
  children: React.ReactNode;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
  setDate: Dispatch<SetStateAction<number>>;
}

export const ReportLayout = ({
  children,
  setYear,
  setMonth,
  setDate,
}: IDateProps) => {
  const [report, setReport] = useState(false);

  function onChange(value: Moment | null, dateString: string) {
    console.log(dateString);

    const dateArr = dateString.split('');
    setMonth(Number(dateArr[0] + dateArr[1] + dateArr[2] + dateArr[3]));
    setMonth(Number(dateArr[5] + dateArr[6]));
    setDate(Number(dateArr[8] + dateArr[9]));
    // API요청해서 결과가 404/detail => noreport 반환
    // else (200) => report 반환
  }

  return (
    <MainLayout>
      <StyledRestrictedArea>
        <div tw="flex justify-between items-end mt-20">
          <StdTypoH2 tw="mb-6 text-gray-1">
            {/* {year}년 {month}월 {date}일 */}
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
        <Content>{children}</Content>
      </StyledRestrictedArea>
    </MainLayout>
  );
};
