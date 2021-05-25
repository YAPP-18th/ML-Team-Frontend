import React, { useState } from 'react';
import { StyledRestrictedArea } from '@shared/styled/Common';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import 'twin.macro';
import locale from 'antd/es/date-picker/locale/ko_KR';
import ReactECharts from 'echarts-for-react';
import { PieChart } from 'echarts/charts';
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
import {
  GRAY_1,
  GRAY_5,
  GRAY_10,
  GRAY_11,
  PRIMARY_10,
} from '@shared/styles/colors';

// components
import { ReportLayout } from '@components/Layouts/report/ReportLayout';
import { Moment } from 'moment';

function onChange(value: Moment | null, dateString: string) {
  console.log(dateString);
}

export const Report: React.FC = () => {
  // const option = {
  //   title: {
  //     text: '某站点用户访问来源',
  //     subtext: '纯属虚构',
  //     x: 'center',
  //   },
  //   tooltip: {
  //     trigger: 'item',
  //     formatter: '{a} <br/>{b} : {c} ({d}%)',
  //   },
  //   legend: {
  //     orient: 'vertical',
  //     left: 'left',
  //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
  //   },
  //   series: [
  //     {
  //       name: '访问来源',
  //       type: 'pie',
  //       radius: '55%',
  //       center: ['50%', '60%'],
  //       data: [
  //         { value: 335, name: '直接访问' },
  //         { value: 310, name: '邮件营销' },
  //         { value: 234, name: '联盟广告' },
  //         { value: 135, name: '视频广告' },
  //         { value: 1548, name: '搜索引擎' },
  //       ],
  //       itemStyle: {
  //         emphasis: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //           shadowColor: 'rgba(0, 0, 0, 0.5)',
  //         },
  //       },
  //     },
  //   ],
  // };

  return (
    <ReportLayout>
      {/* <div
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
        </div> */}
      <div
        tw="flex w-full"
        css={css`
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-rows: 1fr 1fr;
            align-items: space-between;
          `}
        >
          <StyledElementBlock tw="mt-0">
            <StdTypoH5>순수 공부시간</StdTypoH5>
            <StdTypoH3>$$시간 $$분</StdTypoH3>
          </StyledElementBlock>

          <StyledElementBlock tw="mb-0">
            <StdTypoH5>오늘의 집중도</StdTypoH5>
            <div tw="flex flex-col justify-center items-center">
              <StdTypoH3>$$%</StdTypoH3>
              <StdTypoSubtitle1 tw="text-gray-4">
                {/* 100%: 야호! 완벽한 집중력!👍 
                  80-99% 잘하고 있어요!🙌
                  40-79% 다음에는 더 잘 할 거에요!😎
                  0-39% 이런 날도 있는거죠😢
                  */}
                다음에는 더 잘 할 거예요!😎
              </StdTypoSubtitle1>
            </div>
          </StyledElementBlock>
        </div>
        <div
          tw="bg-gray-11"
          css={css`
            margin-left: 13px;
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
          <div
            css={css`
              margin-top: 15px;
            `}
          >
            <ReactECharts
              style={{
                height: 280,
              }}
              option={{
                tooltip: {
                  trigger: 'item',
                  formatter: `{a} <br/>{b}: {d}% <br/> 총 {c}회`,
                  textStyle: {
                    color: `${GRAY_1}`,
                  },
                  extraCssText: `font-size:14px; background-color:${GRAY_10}; width:160px; height:90px;`,
                },
                color: ['#E58389', '#7DD3B5', '#87A1E7'],
                legend: {
                  icon: 'square',
                  orient: 'vertical',
                  y: '10px',
                  left: 10,
                  data: ['스마트폰', '조는중', '자리비움'],
                  textStyle: {
                    color: '#FFFFFF',
                  },
                },
                series: [
                  {
                    name: '집중 분산요인',
                    type: 'pie',
                    radius: '90%',
                    avoidLabelOverlap: false,
                    data: [
                      { value: 8, name: '스마트폰' },
                      { value: 3, name: '조는중' },
                      { value: 2, name: '자리비움' },
                    ],
                    label: {
                      show: false,
                      position: 'center',
                      normal: {
                        textStyle: {
                          color: '#FFFFFF',
                        },
                      },
                    },
                    labelLine: {
                      show: true,
                    },
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </ReportLayout>
  );
};

const StyledElementBlock = styled.div`
  background-color: ${GRAY_11};
  color: ${GRAY_5};
  border-radius: 10px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 13px 13px 13px 0;
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
