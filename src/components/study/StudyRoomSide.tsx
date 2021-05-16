import React, { useState } from 'react';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
import 'twin.macro';

// components
import { Button } from 'antd';
import StudyStatusCard from './StudyStatusCard';
// typography
import { StdTypoH4, StdTypoCaption1 } from '@shared/styled/Typography';
// images
import UserImg from '@assets/images/user.svg';

const StudyRoomSide = () => {
  const doCopy = () => {
    if (!document.queryCommandSupported('copy')) {
      return alert('복사하기가 지원되지 않는 브라우저입니다.');
    }
    const textarea = document.createElement('textarea');
    textarea.value = window.location.href;

    document.body.appendChild(textarea);
    // Safari
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert(
      '공부방 주소가 클립보드에 복사되었습니다. 친구에게 공유해서 초대해보세요.',
    );
  };

  return (
    <section
      tw="h-full bg-gray-12"
      css={css`
        padding: 40px 20px;
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
        <Button type="ghost" onClick={() => doCopy()}>
          초대하기
        </Button>
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
`;
const StyledSideTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0px 10px;
`;
