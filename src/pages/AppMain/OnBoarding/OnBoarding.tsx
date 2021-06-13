import React, { useState } from 'react';
import styled from '@emotion/styled';
import { OnBoardingStepOne } from '@components/organisms/OnBoardingStepOne';
import { OnBoardingStepThree } from '@components/organisms/OnBoardingStepThree';
import { OnBoardingStepTwo } from '@components/organisms/OnBoardingStepTwo';
import { GRAY_10 } from '@shared/styles/colors';

const OnBoardingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
`;

export type OnBoardingStepType = 1 | 2 | 3;

export const OnBoardingBoxWrapper = styled.div`
  display: block;
  background: ${GRAY_10};
  max-width: 768px;
  width: 100%;
  border-radius: 20px;
`;

const OnBoarding = () => {
  const [step, setStep] = useState<OnBoardingStepType>(1);
  // id를 주고 nickname이 있으면 온보딩에 성공한 것으로 판단
  // 로그인 한 순간에만 getUser를 호출해서 최상단recoil store에 넣어둘 것
  // 여기서 그 store에 저장된 것을 받아 쓸 예정

  return (
    <OnBoardingWrapper>
      <OnBoardingBoxWrapper>
        {step === 1 && <OnBoardingStepOne setStep={setStep} />}
        {step === 2 && <OnBoardingStepTwo />}
        {step === 3 && <OnBoardingStepThree />}
      </OnBoardingBoxWrapper>
    </OnBoardingWrapper>
  );
};
export default OnBoarding;
