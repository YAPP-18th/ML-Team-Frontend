import React from 'react';
import { StyledRestrictedArea } from '@shared/styled/Common';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import 'twin.macro';
import locale from 'antd/es/date-picker/locale/ko_KR';

// typographys
import {
  StdTypoH2,
  StdTypoH3,
  StdTypoH5,
  StdTypoSubtitle1,
  StdTypoBody2,
} from '@shared/styled/Typography';

// colors
import {
  GRAY_1,
  GRAY_5,
  GRAY_6,
  GRAY_11,
  PRIMARY_10,
} from '@shared/styles/colors';

// components
import { Button, Calendar, DatePicker, Space } from 'antd';
import { ResponsivePie } from '@nivo/pie';
import { MainLayout } from '@components/Layouts/main/MainLayout';
import { Moment } from 'moment';
import moment from 'moment';

function onChange(value: Moment | null, dateString: string) {
  console.log(dateString);
}

export const Report: React.FC = () => {
  return (
    <MainLayout>
      {/* <div
        css={css`
          height: 153px;
        `}
      >
        <Calendar
          tw="w-full"
          css={css`
            height: 153px;
          `}
        />
      </div> */}
      <StyledRestrictedArea>
        <div tw="flex justify-between items-end mt-20">
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

        <div
          tw="bg-gray-11"
          css={css`
            width: 100%;
            height: 189px;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 26px;
          `}
        >
          <StdTypoH5>타임라인</StdTypoH5>
        </div>
        <div tw="flex w-full">
          <div
            css={css`
              width: 44%;
            `}
          >
            <StyledElementBlock>
              <StdTypoH5>순수 공부시간</StdTypoH5>
              <StdTypoH3>$$시간 $$분</StdTypoH3>
            </StyledElementBlock>
            <StyledElementBlock
              css={css`
                margin: 26px 0;
              `}
            >
              <StdTypoH5>오늘의 달성률</StdTypoH5>
              <div tw="flex flex-col justify-center items-center">
                <StdTypoH3>$$%</StdTypoH3>
                <StdTypoSubtitle1 tw="text-gray-4">
                  이런 날도 있는거죠😢
                </StdTypoSubtitle1>
              </div>
            </StyledElementBlock>
            <StyledElementBlock>
              <StdTypoH5>오늘의 집중도</StdTypoH5>
              <div tw="flex flex-col justify-center items-center">
                <StdTypoH3>$$%</StdTypoH3>
                <StdTypoSubtitle1 tw="text-gray-4">
                  다음에는 더 잘 할 거예요!😎
                </StdTypoSubtitle1>
              </div>
            </StyledElementBlock>
          </div>
          <div
            tw="bg-gray-11"
            css={css`
              width: 56%;
              // width: 686px;
              margin-left: 26px;
              border-radius: 10px;
              padding: 20px;
              height: 472px;
            `}
          >
            <StdTypoH5 tw="text-gray-1">집중 분산요인</StdTypoH5>
            <StdTypoBody2
              tw="text-gray-1"
              css={css`
                margin-top: 8px;
              `}
            >
              총 $회 집중이 분산됐어요
            </StdTypoBody2>
            <MyResponsivePie />
          </div>
        </div>
      </StyledRestrictedArea>
    </MainLayout>
  );
};

const StyledElementBlock = styled.div`
  background-color: ${GRAY_11};
  width: 100%;
  // width: 482px;
  height: 140px;
  color: ${GRAY_5};
  border-radius: 10px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface IChartData {
  id: string | number;
  value: number | string;
  label: string;
  color: string;
}

const StudyData: Array<IChartData> = [
  {
    id: '스마트폰',
    label: '스마트폰',
    value: 8, //횟수
    color: '#E58389',
  },
  {
    id: '조는중',
    label: '조는중',
    value: 3, //횟수
    color: '#7DD3B5',
  },
  {
    id: '자리비움',
    label: '자리비움',
    value: 2, //횟수
    color: '#87A1E7',
  },
];

const MyResponsivePie = () => (
  <ResponsivePie
    data={StudyData}
    colors={['#E58389', '#7DD3B5', '#87A1E7']}
    margin={{ top: 40, right: 80, bottom: 80, left: 150 }}
    enableArcLabels={false}
    arcLabelsTextColor={'#000000'}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsDiagonalLength={10}
    arcLinkLabelsStraightLength={10}
    arcLinkLabelsTextColor={GRAY_6}
    arcLinkLabelsThickness={1}
    arcLabelsSkipAngle={10}
    legends={[
      {
        anchor: 'top-left',
        direction: 'column',
        justify: false,
        translateX: -150,
        translateY: 0,
        itemsSpacing: 0,
        itemWidth: 130,
        itemHeight: 28,
        itemDirection: 'left-to-right',
        symbolSize: 20,
        symbolShape: `square`,
        textColor: 'pink',
      },
    ]}
  />
);
