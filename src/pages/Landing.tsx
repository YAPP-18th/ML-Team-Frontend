import React, { useEffect, useState } from 'react';
import { LandingLayout } from '@components/templates/LandingLayout';
import 'twin.macro';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from 'antd';
import { useHistory } from 'react-router';
import { Main } from '@pages/Main';
import { useMediaQuery } from 'react-responsive';
// typography
import {
  StdTypoH1,
  StdTypoH2,
  StdTypoH3,
  StdTypoH5,
  StdTypoBody1,
} from '@shared/styled/Typography';

// colors
import { GRAY_1, PRIMARY_4, GRAY_6, GRAY_10 } from '@shared/styles/colors';

//images
import StudyroomImg from '@assets/images/studyroom-page.svg';
import ReportImg from '@assets/images/report-page.svg';
import StudyCardImg from '@assets/images/study-card.svg';
import RestCardImg from '@assets/images/rest-card.svg';
import AwaitCardImg from '@assets/images/await-card.svg';
import SleepCardImg from '@assets/images/sleep-card.svg';
import SmartphoneCardImg from '@assets/images/smartphone-card.svg';
import LogoIcon from '@assets/icons/icon-logo.svg';
import CamIcon from '@assets/icons/icon-cam.svg';
import ReportIcon from '@assets/icons/icon-report.svg';

export const Landing: React.FC = () => {
  const isSmall = useMediaQuery({ minWidth: 769 });
  const history = useHistory();
  return (
    <LandingLayout>
      <div
        tw="flex flex-col items-center justify-center"
        css={css`
          padding-top: 140px;
          padding-bottom: 140px;
        `}
      >
        <div
          tw="flex flex-col items-center justify-center mb-10"
          css={css`
            background: linear-gradient(to right, #f8a9cf, #878edd);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          `}
        >
          <StdTypoH1>내 꿈을 향해 깊은 곳으로</StdTypoH1>
          <StdTypoH1>STUDEEP</StdTypoH1>
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            history.push('/auth');
          }}
        >
          <StdTypoH5>스터딥 시작</StdTypoH5>
        </Button>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: ${isSmall ? `row` : `column`};
        `}
      >
        <div tw="relative">
          <img src={StudyroomImg} alt="공부방 예시" />
          <div
            tw="flex absolute"
            css={css`
              bottom: -16%;
              left: 140px;
            `}
          >
            <div></div>
            <StyledStatusCardImg src={StudyCardImg} alt="공부중" />
            <StyledStatusCardImg src={RestCardImg} alt="휴식중" />
            <StyledStatusCardImg src={AwaitCardImg} alt="자리비움" />
            <StyledStatusCardImg src={SleepCardImg} alt="조는중" />
            <StyledStatusCardImg src={SmartphoneCardImg} alt="스마트폰" />
          </div>
        </div>
        <div css={TextContentStyle(isSmall, `16%`, `45px`)}>
          <StdTypoH5 tw="text-primary-4 mb-5">공부방</StdTypoH5>
          <StdTypoH2>따로, 또 같이</StdTypoH2>
          <StdTypoH2 tw="mb-10">몰입하는 공부방</StdTypoH2>
          <div css={FeatureContainerStyle(isSmall)} tw="mb-5">
            <div tw="flex">
              <StyledIcon src={LogoIcon} />
              <StdTypoH5 tw="mb-4 text-gray-3">
                5초면 만들 수 있는 몰입 환경{' '}
              </StdTypoH5>
            </div>

            <StdTypoBody1 tw="text-gray-6">
              화면에 두 손만 나오게 해주세요. 스터딥은 스마트폰을 사용하는지,
              자리를 비웠는지, 졸고 있는지 실시간으로 상태를 확인해서 몰입을
              도와드려요.{' '}
            </StdTypoBody1>
          </div>
          <div css={FeatureContainerStyle(isSmall)}>
            <div tw="flex">
              <StyledIcon src={CamIcon} />
              <StdTypoH5 tw="mb-4 text-gray-3">
                실시간으로 함께, 부담없는 캠스터디
              </StdTypoH5>
            </div>
            <StdTypoBody1 tw="text-gray-6">
              서로의 얼굴이 보이지 않아도, 실시간으로 함께 공부할 수 있어요.
            </StdTypoBody1>
          </div>
        </div>
      </div>
      <div
        css={[
          ReportContentWrapperStyle,
          css`
            flex-direction: ${isSmall ? `row` : `column-reverse`};
          `,
        ]}
      >
        <div css={TextContentStyle(isSmall, 0, `60px`)}>
          <StdTypoH5 tw="text-primary-4 mb-5">학습 레포트</StdTypoH5>
          <StdTypoH2>내 공부 습관을 분석해주는</StdTypoH2>
          <StdTypoH2 tw="mb-10">학습 레포트</StdTypoH2>

          <div css={FeatureContainerStyle(isSmall)}>
            <div tw="flex">
              <StyledIcon src={ReportIcon} />
              <StdTypoH5 tw="mb-4 text-gray-3">
                한눈에 보는 나의 학습태도
              </StdTypoH5>
            </div>

            <StdTypoBody1 tw="text-gray-6">
              공부를 끝낸 후, 학습 레포트를 통해 순수 공부시간, 오늘의 집중도,
              달성률은 기본, 집중 분산 요인을 파악해서 더 나은 공부 습관을
              만들어나가요.
            </StdTypoBody1>
          </div>
        </div>
        <div>
          <img src={ReportImg} alt="공부방 예시" />
        </div>
      </div>
      <div
        tw="flex flex-col justify-center items-center"
        css={css`
          width: 100%;
          height: 331px;
          background: linear-gradient(to right, #f8a9cf, #878edd);
        `}
      >
        <StdTypoH3 tw="text-gray-2 mb-4">시작해보세요</StdTypoH3>
        <StdTypoH5 tw="text-gray-4 mb-8">
          당신의 꿈을 이루기까지, 스터딥이 함께할게요
        </StdTypoH5>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            history.push('/auth');
          }}
        >
          <StdTypoH5>스터딥 시작</StdTypoH5>
        </Button>
      </div>
    </LandingLayout>
  );
};
const ReportContentWrapperStyle = () => {
  return css`
    margin-top: 233px;
    margin-bottom: 164px;
    float: right;
    display: flex;
  `;
};

const StyledStatusCardImg = styled.img`
  width: 20%;
  height: auto;
`;
const TextContentStyle = (
  isSmall: boolean,
  mt: string | number,
  mx: string | number,
) => {
  return css`
    margin-left: ${isSmall ? mx : `50px`};
    margin-right: ${isSmall ? mx : `50px`};
    margin-top: ${isSmall ? `0` : mt};
  `;
};
const FeatureContainerStyle = (isSmall: boolean) => {
  return css`
    width: ${isSmall ? `481px` : `668px`};
    background-color: ${GRAY_10};
    padding: 25px;
    border-radius: 10px;
  `;
};

const StyledIcon = styled.img`
  width: 26px;
  height: 26px;
  margin-right: 10px;
`;
