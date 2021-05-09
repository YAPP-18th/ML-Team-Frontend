import React, { useState } from 'react';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
import { GRAY_10, PRIMARY_8 } from '@shared/styles/colors';
import StudyStatusCard from './StudyStatusCard';

const StudyRoomSide = () => {
  return (
    <div style={{ width: '465px' }}>
      <MemberStatusWrapperStyled>
        {/* 인원수만큼 map */}
        <StudyStatusCard nickname="닉네임" status={PRIMARY_8} />
        <StudyStatusCard nickname="닉네임" status="#F6D47A" />
        <StudyStatusCard nickname="닉네임" status="#87A1E7" />
        <StudyStatusCard nickname="닉네임" status="#E58389" />
        <StudyStatusCard nickname="닉네임" status="#7DD3B5" />
      </MemberStatusWrapperStyled>
    </div>
  );
};

export default StudyRoomSide;

const MemberStatusWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
