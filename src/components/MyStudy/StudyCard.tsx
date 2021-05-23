import React from 'react';
import { css } from '@emotion/react';
import { SerializedStyles } from '@emotion/serialize';
import styled from '@emotion/styled';
import { StdTypoBody2, StdTypoSubtitle1 } from '@shared/styled/Typography';
import UserIcon from '@assets/icons/user.svg';
import EnterIcon from '@assets/icons/enter.svg';
import 'twin.macro';
import { GRAY_10 } from '@shared/styles/colors';
import StudyRoomImg1 from '@assets/images/studyroom-1.svg';
import StudyRoomImg2 from '@assets/images/studyroom-2.svg';
import StudyRoomImg3 from '@assets/images/studyroom-3.svg';
import StudyRoomImg4 from '@assets/images/studyroom-4.svg';
import MoreIcon from '@assets/icons/more.svg';
import DeleteIcon from '@assets/icons/delete.svg';
import { Dropdown, Menu } from 'antd';

export type StudyCardStyles = 'style_1' | 'style_2' | 'style_3' | 'style_4';

export const studyCardStyleList: {
  [key in StudyCardStyles]: SerializedStyles;
} = {
  style_1: css`
    background: url(${StudyRoomImg1}) center;
    background-size: cover;
  `,
  style_2: css`
    background: url(${StudyRoomImg2}) center;
    background-size: cover;
  `,
  style_3: css`
    background: url(${StudyRoomImg3}) center;
    background-size: cover;
  `,
  style_4: css`
    background: url(${StudyRoomImg4}) center;
    background-size: cover;
  `,
};

interface IStudyCardProps {
  style: StudyCardStyles;
  title?: string;
  description?: string;
}

const StudyCard: React.FC<IStudyCardProps> = ({
  style,
  title,
  description,
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div tw="flex items-center space-x-1">
          <img src={DeleteIcon} alt="삭제하기 아이콘" />
          <StdTypoBody2
            css={css`
              color: #d6686e;
            `}
          >
            삭제하기
          </StdTypoBody2>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <StudyCardWrapper>
      <StudyCardInnerWrapper css={studyCardStyleList[style]}>
        <StdTypoSubtitle1>{title}</StdTypoSubtitle1>
        <StdTypoBody2>{description}</StdTypoBody2>
        <div tw="flex items-center space-x-1.5">
          <img src={UserIcon} alt="User" />
          <StdTypoBody2>1/6</StdTypoBody2>
        </div>
      </StudyCardInnerWrapper>
      <StudyCardHover className="study-card-hover">
        <EnterButton>
          <img src={EnterIcon} alt="enter icon" />
          <StdTypoSubtitle1>입장하기</StdTypoSubtitle1>
        </EnterButton>
      </StudyCardHover>
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <MoreButton src={MoreIcon} onClick={(e) => e.preventDefault()} />
      </Dropdown>
    </StudyCardWrapper>
  );
};

const StudyCardWrapper = styled.div`
  height: 180px;
  border-radius: 10px;
  position: relative;

  cursor: pointer;

  .study-card-hover {
    opacity: 0;
  }

  &:hover {
    .study-card-hover {
      opacity: 1;
    }
  }
`;

const StudyCardInnerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 18px;

  > * + * {
    margin-top: 6px;
  }
`;

const MoreButton = styled.img`
  position: absolute;
  top: 14px;
  right: 14px;
  transition: 0.2s ease background;
  border-radius: 50%;

  &:hover {
    background: ${GRAY_10}80;
  }
`;

const StudyCardHover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${GRAY_10}80;
  border-radius: 10px;
`;

const EnterButton = styled.div`
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 58px;
  padding: 10px 26px;

  > * + * {
    margin-left: 6px;
  }
`;

export default StudyCard;
