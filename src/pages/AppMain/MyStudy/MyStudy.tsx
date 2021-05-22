import React from 'react';
import { StyledRestrictedArea } from '@shared/styled/Common';
import { StdTypoH4 } from '@shared/styled/Typography';
import styled from '@emotion/styled';
import 'twin.macro';
import { MainLayout } from '@components/Layouts/main/MainLayout';
import MyStudyRoom from '@components/MyStudy/MyStudyRoom';
import OnAirStudyRoom from '@components/MyStudy/OnAirStudyRoom';
import { Button } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';

export const MyStudy: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <MainLayout>
      <StyledRestrictedArea>
        <StyledMyStudyCard>
          <div tw="flex items-center justify-between">
            <StdTypoH4>내 공부방</StdTypoH4>
            <Link to={`${path}/create`}>
              <Button size="small">공부방 만들기</Button>
            </Link>
          </div>
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
