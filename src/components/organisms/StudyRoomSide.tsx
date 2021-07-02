import React, { useState } from 'react';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
import 'twin.macro';

// components
import StudyStatusCard from './StudyStatusCard';
// typography
import { StdTypoH4, StdTypoCaption1 } from '@shared/styled/Typography';
// images
import UserImg from '@assets/images/user.svg';

const StudyRoomSide = () => {
  return (
    <section
      tw="h-full bg-gray-12"
      css={css`
        padding: 40px 20px;
        overflow: scroll;
        overflow-x: hidden;
      `}
    >
      <StyledSideTitleWrapper>
        <div tw="flex items-end">
          <StdTypoH4>공부중인 사람</StdTypoH4>
          <div tw="flex">
            <img tw="ml-2.5 mr-1" src={UserImg} />
            <StdTypoCaption1>$/6</StdTypoCaption1>
          </div>
        </div>
      </StyledSideTitleWrapper>
      <MemberStatusWrapperStyled>
        {/* 인원수만큼*/}
        <StudyStatusCard nickname="닉네임1" status="LEFT" isHost={true} />
        <StudyStatusCard nickname="닉네임2" status="REST" />
        <StudyStatusCard nickname="닉네임3" status="SLEEPING" />
        <StudyStatusCard nickname="닉네임4" status="STUDYING" />
        <StudyStatusCard nickname="닉네임5" status="SMARTPHONE" />
      </MemberStatusWrapperStyled>
    </section>
  );
};
export default StudyRoomSide;

const MemberStatusWrapperStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;
const StyledSideTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
