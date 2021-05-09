import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { GRAY_10 } from '@shared/styles/colors';
import StarImg from '@assets/images/star.svg';

interface IStatusProps {
  nickname?: string;
  status: string;
}

const StudyStatusCard = ({ nickname, status }: IStatusProps) => {
  return (
    <StudyStatusCardStyled>
      <div css={StatusIconStyle}>아이콘</div>
      <div style={{ display: 'flex' }}>
        <div>{nickname}</div>
        <NicknameIconStyled src={StarImg} />
      </div>
      <StatusStyled status={status}>상태</StatusStyled>
    </StudyStatusCardStyled>
  );
};

export default StudyStatusCard;

const StudyStatusCardStyled = styled.div`
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
