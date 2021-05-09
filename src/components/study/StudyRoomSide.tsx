import React, { useState } from 'react';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
import { GRAY_10, PRIMARY_8 } from '@shared/styles/colors';
import StatusCard from './StatusCard';

const StudyRoomSide = () => {
  return (
    <div style={{ width: '465px' }}>
      <MemberStatusWrapperStyled>
        {/* 인원수만큼 map */}
        <StatusCard nickname="닉네임" status={PRIMARY_8} />
        <StatusCard nickname="닉네임" status="#F6D47A" />
        <StatusCard nickname="닉네임" status="#87A1E7" />
        <StatusCard nickname="닉네임" status="#E58389" />
        <StatusCard nickname="닉네임" status="#7DD3B5" />
      </MemberStatusWrapperStyled>
    </div>
  );
};

export default StudyRoomSide;

const MemberStatusWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
