import React, { useState } from 'react';
import { css } from '@emotion/react';
import { SerializedStyles } from '@emotion/serialize';
import styled from '@emotion/styled';
import { StdTypoBody2, StdTypoSubtitle1 } from '@shared/styled/Typography';
import UserIcon from '@assets/icons/user.svg';
import EnterIcon from '@assets/icons/enter.svg';
import 'twin.macro';
import { GRAY_10 } from '@shared/styles/colors';

type StudyCardStyles = 'style_1' | 'style_2' | 'style_3' | 'style_4';

const studyCardGradientList: {
  [key in StudyCardStyles]: SerializedStyles;
} = {
  style_1: css`
    background: linear-gradient(180deg, #ffbcbc 0%, #9d57b6 100%);
  `,
  style_2: css`
    background: linear-gradient(180deg, #bccfff 0%, #576cb6 100%);
  `,
  style_3: css`
    background: linear-gradient(180deg, #cdf7de 0%, #5ba6a2 100%);
  `,
  style_4: css`
    background: linear-gradient(180deg, #ffd8bc 0%, #b66e57 100%);
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
  return (
    <StudyCardWrapper onClick={() => alert('clicked')}>
      <StudyCardInnerWrapper css={studyCardGradientList[style]}>
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
    </StudyCardWrapper>
  );
};

const StudyCardWrapper = styled.div`
  height: 180px;
  border-radius: 10px;
  position: relative;

  cursor: pointer;

  .study-card-hover {
    visibility: hidden;
  }

  &:hover {
    .study-card-hover {
      visibility: visible;
    }
  }
`;

const StudyCardInnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 18px;

  > * + * {
    margin-top: 6px;
  }
`;

const StudyCardHover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

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
