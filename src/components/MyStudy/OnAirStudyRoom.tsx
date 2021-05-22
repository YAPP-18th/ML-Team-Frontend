import React from 'react';
import { StdTypoSubtitle1 } from '@shared/styled/Typography';
import { StyledEmptyCardWrapper } from '@shared/styled/Common';
import 'twin.macro';
import { Button } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';

const OnAirStudyRoom: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <StyledEmptyCardWrapper tw="text-center space-y-5 py-20">
        <StdTypoSubtitle1 tw="text-gray-6">
          지금 진행중인 공부방이 없어요. 공부방을 만들어 공부를 시작해보세요.
        </StdTypoSubtitle1>
        <Link to={`${path}/create`} tw="inline-block">
          <Button type="primary">공부방 만들기</Button>
        </Link>
      </StyledEmptyCardWrapper>
    </>
  );
};

export default OnAirStudyRoom;
