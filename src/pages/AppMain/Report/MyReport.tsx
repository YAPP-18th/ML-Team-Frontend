import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import 'twin.macro';

import locale from 'antd/es/date-picker/locale/ko_KR';
import ReactEcharts from 'echarts-for-react';
import { IReport, IDisturbance } from '@shared/interface';
// import RectImg from '@assets/images/icons/Rectangle 146';

interface IReportProps {
  StudyData?: IReport[];
}

// typographys
import {
  StdTypoBody2,
  StdTypoSubtitle1,
  StdTypoH3,
  StdTypoH5,
} from '@shared/styled/Typography';

// colors
import { GRAY_1, GRAY_4, GRAY_6, GRAY_10 } from '@shared/styles/colors';
import { createNumericLiteral } from 'typescript';

export const MyReport = ({ StudyData }: IReportProps) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [focusDegree, setFocusDegree] = useState(0);
  const [distraction, setDistraction] = useState(0);
  const [chartData, setChartData] = useState<IDisturbance[]>([]);
  const [disturbance, setDisturbance] = useState<string[]>([]);

  useEffect(() => {
    if (StudyData !== undefined) {
      const data = StudyData[0];

      setHours(Math.floor(data.totalTime / 3600));
      setMinutes(Math.floor((data.totalTime / 60) % 60));
      setFocusDegree(data.concentration);
      setDistraction(data.totalStatusCounts);
      setChartData(data.statuses);
      setDisturbance([data.maxStatus]);
    }
  }, [StudyData]);

  const makeFocusComment = (focusDegree: number) => {
    const fd = focusDegree;
    if (fd === 100) return '야호! 완벽한 집중력!👍';
    else if (fd >= 80) return '잘하고 있어요!🙌';
    else if (fd >= 40) return '다음에는 더 잘 할 거에요!😎';
    else if (fd >= 0) return '이런 날도 있는거죠😢';
  };

  return (
    <div
      tw="flex justify-between"
      css={css`
        height: 472px;
      `}
    >
      <div tw="grid grid-flow-row grid-rows-2 w-2/5 ">
        <div
          tw="flex bg-gray-11 justify-between items-center px-8 "
          css={css`
            border-radius: 10px;
            margin-right: 13px;
            margin-bottom: 13px;
          `}
        >
          <StdTypoH5 tw="text-gray-5">순수 공부시간</StdTypoH5>
          <StdTypoH3 tw="text-gray-2">
            {hours < 10 ? `0${hours}` : hours}시간{' '}
            {minutes < 10 ? `0${minutes}` : minutes}분
          </StdTypoH3>
        </div>
        <div
          tw="flex bg-gray-11 justify-between items-center px-8"
          css={css`
            border-radius: 10px;
            margin-right: 13px;
            margin-top: 13px;
          `}
        >
          <StdTypoH5 tw="text-gray-5">오늘의 집중도</StdTypoH5>
          <div tw="flex flex-col items-center">
            <StdTypoH3 tw="text-gray-2">{focusDegree}%</StdTypoH3>
            <StdTypoSubtitle1>{makeFocusComment(focusDegree)}</StdTypoSubtitle1>
          </div>
        </div>
      </div>
      <div
        tw="bg-gray-11 w-3/5 p-5"
        css={css`
          border-radius: 10px;
          margin-left: 13px;
        `}
      >
        <StdTypoH5 tw="text-gray-1">집중 분산요인</StdTypoH5>
        <StdTypoBody2 tw="text-gray-1 mt-2 font-normal">
          총 {distraction}회 집중이 분산됐어요
        </StdTypoBody2>

        <ReactEcharts
          option={{
            color: ['#E58389', '#7DD3B5', '#87A1E7'],
            tooltip: {
              show: true,
              backgroundColor: GRAY_10,
              textStyle: {
                color: GRAY_4,
              },
              borderWidth: 0,
              extraCssText: {
                borderRadius: `5px`,
                boxShadow: `0px 2px 16px rgba(0,0,0,0.15)`,
                width: `160px`,
                height: `90px`,
              },
            },
            legend: {
              orient: 'vertical',
              top: 20,
              left: 0,
              data: ['스마트폰', '조는중', '자리비움'],
              itemGap: 16,
              icon: 'circle',
              // icon: 'image://http://www.w3.org/2000/Rectangle_146.svg',
              textStyle: {
                color: GRAY_1,
                fontWeight: 'bold',
                fontSize: 16,
                fontFamily: 'Spoqa Han Sans Neo',
                letterSpacing: '-0.08px',
              },
            },
            series: [
              {
                type: 'pie',
                clockwise: false,
                width: 'auto',
                height: '105%',
                center: ['50%', '50%'],
                data: chartData,
                tooltip: {
                  formatter: `집중 분산요인<br /> {b} {d}%<br/> 총 {c}회`,
                  textStyle: {
                    textBorderWidth: 0,
                  },
                },
                label: {
                  textBorderWidth: 0,
                  color: GRAY_6,
                  fontSize: 12,
                  fontWeight: 400,
                },
              },
            ],
          }}
        />
        <StdTypoSubtitle1 tw="flex justify-center mt-5">
          {disturbance.join(',')}에 주의가 필요해요
        </StdTypoSubtitle1>
      </div>
    </div>
  );
};
