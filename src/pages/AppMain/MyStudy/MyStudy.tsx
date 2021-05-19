import React from 'react';
import { StyledRestrictedArea } from '@shared/styled/Common';
import { StdTypoH4 } from '@shared/styled/Typography';
import styled from '@emotion/styled';
import 'twin.macro';
import { MainLayout } from '@components/Layouts/main/MainLayout';
import MyStudyRoom from '@components/MyStudy/MyStudyRoom';
import OnAirStudyRoom from '@components/MyStudy/OnAirStudyRoom';

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
