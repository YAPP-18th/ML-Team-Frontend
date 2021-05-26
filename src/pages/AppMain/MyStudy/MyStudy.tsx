import React, { useEffect } from 'react';
import { StyledRestrictedArea } from '@shared/styled/Common';
import { StdTypoH4 } from '@shared/styled/Typography';
import styled from '@emotion/styled';
import 'twin.macro';
import { MainLayout } from '@components/Layouts/main/MainLayout';
import MyStudyRoom from '@components/MyStudy/MyStudyRoom';
import OnAirStudyRoom from '@components/MyStudy/OnAirStudyRoom';
import { Button } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';
import { ajax } from 'rxjs/ajax';
import { useLocalStorage } from '@rehooks/local-storage';
import { API_ENDPOINT } from '@shared/common';

export const MyStudy: React.FC = () => {
  const { path } = useRouteMatch();
  const [accessToken] = useLocalStorage('accessToken');

  useEffect(() => {
    ajax({
      url: `${API_ENDPOINT}/api/study-rooms?skip=${0}&limit=${5}`,
      method: 'GET',
      headers: {
        authorization: `${accessToken}`,
      },
    }).subscribe((res) => {
      console.log(res);
    });
  }, [accessToken]);

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
