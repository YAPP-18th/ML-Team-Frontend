import React from 'react';
import { StyledRestrictedArea } from '@shared/styled/Common';
import { StdTypoH4, StdTypoSubtitle1 } from '@shared/styled/Typography';
import styled from '@emotion/styled';
import 'twin.macro';
import { GRAY_11 } from '@shared/styles/colors';
import { Button } from 'antd';
import { MainLayout } from '@components/Layouts/main/MainLayout';

export const MyStudy: React.FC = () => {
  return (
    <MainLayout>
      <StyledRestrictedArea>
        <StyledMyStudyCard>
          <StdTypoH4>내 공부방</StdTypoH4>
          <MyStudyRoom />
        </StyledMyStudyCard>
        <StyledMyStudyCard>
          <StdTypoH4>온에어 공부방</StdTypoH4>
          <OnAirStudyRoom />
        </StyledMyStudyCard>
      </StyledRestrictedArea>
    </MainLayout>
  );
};

const StyledMyStudyCard = styled.div`
  margin-top: 60px;

  > * + * {
    margin-top: 15px;
  }
`;

const StyledCardWrapper = styled.div`
  width: 100%;
  background: ${GRAY_11};
  border-radius: 5px;
`;

const MyStudyRoom: React.FC = () => {
  return (
    <>
      <StyledCardWrapper tw="text-center space-y-5 py-20">
        <StdTypoSubtitle1 tw="text-gray-6">
          아직 시작한 공부방이 없어요. 공부를 시작해보세요.
        </StdTypoSubtitle1>
        <Button type="primary">공부방 만들기</Button>
      </StyledCardWrapper>
    </>
  );
};

const OnAirStudyRoom: React.FC = () => {
  return (
    <>
      <StyledCardWrapper tw="text-center space-y-5 py-20">
        <StdTypoSubtitle1 tw="text-gray-6">
          현재 온에어 상태인 공부방이 없어요.
        </StdTypoSubtitle1>
      </StyledCardWrapper>
    </>
  );
};
