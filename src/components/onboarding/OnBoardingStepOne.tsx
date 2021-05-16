import React from 'react';
import OnBoardingImage from '@assets/images/onboarding.svg';
import { StdTypoBody2, StdTypoH3 } from '@shared/styled/Typography';
import tw from 'twin.macro';
import 'twin.macro';
import { OnBoardingContainer } from '@shared/styled/OnBoarding';
import { Button } from 'antd';
import { css } from '@emotion/react';

export const OnBoardingStepOne: React.FC = () => {
  return (
    <OnBoardingContainer>
      <img
        css={tw`border-none mx-auto mb-4`}
        src={OnBoardingImage}
        alt="온보딩 이미지"
      />
      <StdTypoH3>스터딥에 처음 오신 것을 환영해요!</StdTypoH3>
      <StdTypoBody2 css={tw`text-gray-6`}>
        원활한 이용을 위해 몇가지 정보를 입력해주세요.
      </StdTypoBody2>
      <Button
        type="primary"
        size="large"
        css={css`
          margin-top: 50px;
        `}
        tw="px-12"
      >
        시작하기
      </Button>
    </OnBoardingContainer>
  );
};
