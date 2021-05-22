import React from 'react';
import { StyledRestrictedArea } from '@shared/styled/Common';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import 'twin.macro';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

// typographys
import {
  StdTypoH2,
  StdTypoH3,
  StdTypoH5,
  StdTypoSubtitle1,
  StdTypoBody2,
} from '@shared/styled/Typography';

// colors
import { GRAY_5, GRAY_11, PRIMARY_10 } from '@shared/styles/colors';

// components
import { Button, Calendar } from 'antd';
import { MainLayout } from '@components/layouts/main/MainLayout';

export const Report: React.FC = () => {
  return (
    <MainLayout>
      <div
        css={css`
          height: 153px;
        `}
      >
        {/* <Calendar /> */}
      </div>
      <StyledRestrictedArea>
        <StdTypoH2 tw="mb-6">$월 $$일</StdTypoH2>
        <div
          tw="bg-gray-11"
          css={css`
            width: 100%;
            height: 189px;
            border-radius: 10px;
            padding: 20px;
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
            <StyledElementBlock>
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
              margin: 13px 0;
              margin-left: 13px;
              border-radius: 10px;
              padding: 20px;
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
  margin: 13px 0;
  margin-right: 13px;
  color: ${GRAY_5};
  border-radius: 10px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// const Calendar = () => {
//   const now = new Date();
//   const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//   const makeWeekArr = (date: Date) => {
//     const day = date.getDate();
//     const week = [];
//     for (let i = 0; i < 7; i++) {
//       const newDate = new Date(date.valueOf() + 864000000 * (i - day));
//       week.push(newDate);
//     }
//     console.log(week);
//     return week;
//   };
//   const week: Date[] = makeWeekArr(date);
//   return (
//     // { week.map((value:Date, index:number)=> {<div
//     //   css={css`
//     //     width: 142px;
//     //     height: 98px;
//     //     background-color: pink;
//     //   `}
//     // >
//     //   123
//     // </div>})}
//     <h1>hi</h1>
//   );
// };
