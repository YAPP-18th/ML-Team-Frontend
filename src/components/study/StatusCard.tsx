import React, { useState } from 'react';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
import { GRAY_10, PRIMARY_8 } from '@src/shared/styles/colors';
import StarImg from '@assets/images/star.svg';

interface IStatusProps {
  nickname?: string;
  status: string;
}

const StatusCard = ({ nickname, status }: IStatusProps) => {
  return (
    <StatusCardStyled>
      <div css={StatusIconStyle}>아이콘</div>
      <div style={{ display: 'flex' }}>
        <div>{nickname}</div>
        <NicknameIconStyled src={StarImg} />
      </div>

      <StatusStyled status={status}>상태</StatusStyled>
    </StatusCardStyled>
  );
};

export default StatusCard;

const StatusCardStyled = styled.div`
  width: 190px;
  height: 224px;
  background-color: ${GRAY_10};
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
`;
const StatusIconStyle = css`
  width: 100px;
  height: 100px;
  border: 3px solid white;
`;
const NicknameIconStyled = styled.img`
  width: 22px;
  height: 22px;
`;
const StatusStyled = styled.div(
  {
    width: '54px',
    height: '24px',
    color: 'white',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
  },
  (props: IStatusProps) => ({
    backgroundColor: props.status,
  }),
);
