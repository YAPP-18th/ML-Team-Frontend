import React from 'react';
import OnBoardingImage from '@assets/images/onboarding.svg';
import { StdTypoBody2, StdTypoH3 } from '@shared/styled/Typography';
import tw from 'twin.macro';

export const OnBoardingStepThree: React.FC = () => {
  return (
    <>
      <img src={OnBoardingImage} alt="온보딩 이미지" />
      <StdTypoH3>스터딥에 처음 오신 것을 환영해요!</StdTypoH3>
      <StdTypoBody2 css={tw`text-gray-6`}>
        원활한 이용을 위해 몇가지 정보를 입력해주세요.
      </StdTypoBody2>
    </>
  );
};
