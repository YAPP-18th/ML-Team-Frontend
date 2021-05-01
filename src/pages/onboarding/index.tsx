import React, { useState } from 'react';
import { OnBoardingBoxWrapper } from '@src/shared/styled/OnBoardingStyled';
import styled from '@emotion/styled';
import OnBoardingImage from '@assets/images/onboarding.svg';
import { StdTypoBody2, StdTypoH3 } from '@src/shared/styled/Typography';
import tw from 'twin.macro';
import { OnBoardingStepOne } from '@components/onboarding/OnBoardingStepOne';
import { OnBoardingStepThree } from '@components/onboarding/OnBoardingStepThree';
import { OnBoardingStepTwo } from '@components/onboarding/OnBoardingStepTwo';

const OnBoardingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
`;

type OnBoardingStepType = 1 | 2 | 3;

const OnBoarding = () => {
  const [step, setStep] = useState<OnBoardingStepType>(1);

  return (
    <OnBoardingWrapper>
      <OnBoardingBoxWrapper>
        {step === 1 && <OnBoardingStepOne />}
        {step === 2 && <OnBoardingStepTwo />}
        {step === 3 && <OnBoardingStepThree />}
      </OnBoardingBoxWrapper>
    </OnBoardingWrapper>
  );
};
export default OnBoarding;
