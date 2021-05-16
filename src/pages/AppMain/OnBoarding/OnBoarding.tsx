import React, { useState } from 'react';
import styled from '@emotion/styled';
import { OnBoardingStepOne } from '@components/OnBoarding/OnBoardingStepOne';
import { OnBoardingStepThree } from '@components/OnBoarding/OnBoardingStepThree';
import { OnBoardingStepTwo } from '@components/OnBoarding/OnBoardingStepTwo';
import { GRAY_10 } from '@shared/styles/colors';

const OnBoardingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
`;

type OnBoardingStepType = 1 | 2 | 3;

export const OnBoardingBoxWrapper = styled.div`
  display: block;
  background: ${GRAY_10};
  max-width: 768px;
  width: 100%;
  border-radius: 20px;
  padding: 20px;
`;

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
