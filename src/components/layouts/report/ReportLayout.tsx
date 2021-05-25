import React, { useState } from 'react';
import { StyledRestrictedArea } from '@shared/styled/Common';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import 'twin.macro';
import locale from 'antd/es/date-picker/locale/ko_KR';
import { Content } from 'antd/es/layout/layout';
// typographys
import { StdTypoH2, StdTypoSubtitle1 } from '@shared/styled/Typography';

// colors
import {
  GRAY_1,
  GRAY_5,
  GRAY_10,
  GRAY_11,
  PRIMARY_10,
} from '@shared/styles/colors';

// images
import EmptyImg from '@assets/images/empty.svg';

// components
import { Button, DatePicker, Space } from 'antd';
import { MainLayout } from '@components/Layouts/main/MainLayout';
import { Moment } from 'moment';

function onChange(value: Moment | null, dateString: string) {
  console.log(dateString);
}

export const ReportLayout: React.FC = ({ children }) => {
  return (
    <MainLayout>
      <StyledRestrictedArea>
        <div tw="flex justify-between items-end mt-20">
          {/* API 요청해서 날짜 쓰기 */}
          <StdTypoH2 tw="mb-6">$월 $$일</StdTypoH2>
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
