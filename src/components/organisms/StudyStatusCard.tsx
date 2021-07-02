import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import 'twin.macro';

// colors
import { PRIMARY_8, GRAY_10 } from '@shared/styles/colors';

// images
import LeftImg from '@assets/images/left.svg';
import RestImg from '@assets/images/rest.svg';
import SleepingImg from '@assets/images/sleeping_side.svg';
import StudyingImg from '@assets/images/studying.svg';
import SmartphoneImg from '@assets/images/smartphone_side.svg';
import StarImg from '@assets/images/star.svg';
import HostImg from '@assets/images/host.svg';

interface IStudyStatusProps {
  nickname: string;
  status: StudyStatusType;
  isHost?: boolean;
}

type StudyStatusType = 'STUDYING' | 'SMARTPHONE' | 'LEFT' | 'SLEEPING' | 'REST';

const StatusTable: {
  [key: string]: { color: string; image: string; content: string };
} = {
  STUDYING: {
    color: PRIMARY_8,
    image: StudyingImg,
    content: '공부중',
  },
  SMARTPHONE: {
    color: '#E58389',
    image: SmartphoneImg,
    content: '스마트폰',
  },
  LEFT: {
    color: '#F6D47A',
    image: LeftImg,
    content: '자리비움',
  },
  SLEEPING: {
    color: '#87A1E7',
    image: SleepingImg,
    content: '조는중',
  },
  REST: {
    color: '#7DD3B5',
    image: RestImg,
    content: '휴식중',
  },
};

const StudyStatusCard = (props: IStudyStatusProps) => {
  return (
    <StyledStudyStatusCard>
      {props.isHost === true && (
        <img src={HostImg} tw="absolute top-4 left-4" alt="방장" />
      )}
      <img src={StatusTable[props.status].image} css={StatusIconStyle} />
      <div tw="items-center justify-center flex mt-4 mb-2">
        <div
          css={css`
            font-size: 18px;
            margin-right: 2px;
          `}
        >
          {props.nickname}
        </div>
        <StyledNicknameIcon src={StarImg} alt="레벨 이미지" />
      </div>
      <StyledStudyStatus
        css={css`
          background: ${StatusTable[props.status].color};
        `}
      >
        {StatusTable[props.status].content}
      </StyledStudyStatus>
    </StyledStudyStatusCard>
  );
};

export default StudyStatusCard;

const StyledStudyStatusCard = styled.div`
  height: 224px;
  background-color: ${GRAY_10};
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  font-size: 12px;
  padding: 14px 0px;
  position: relative;
`;
const StatusIconStyle = css`
  width: 100px;
  height: 100px;
  border: 3px solid white;
`;
const StyledNicknameIcon = styled.img`
  width: 22px;
  height: 22px;
`;
const StyledStudyStatus = styled.div({
  width: '54px',
  height: '24px',
  color: 'white',
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
