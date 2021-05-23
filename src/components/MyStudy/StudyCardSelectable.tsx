import React, { MouseEventHandler, useMemo } from 'react';
import {
  studyCardStyleList,
  StudyCardStyle,
} from '@components/MyStudy/StudyCard';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { PRIMARY_9 } from '@shared/styles/colors';
import CheckIcon from '@assets/icons/checked.svg';
import 'twin.macro';

interface IStudyCardSelectableProps {
  style: StudyCardStyle;
  focused: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const StudyCardSelectable: React.FC<IStudyCardSelectableProps> = ({
  style,
  focused = false,
  onClick,
}) => {
  const wrapperCardStyle = useMemo(() => studyCardStyleList[style], [style]);
  return (
    <StudyCardWrapper
      css={wrapperCardStyle}
      focused={focused}
      onClick={onClick}
    >
      {focused && (
        <img src={CheckIcon} alt="Check" tw="absolute top-1.5 left-1.5" />
      )}
    </StudyCardWrapper>
  );
};

const StudyCardWrapper = styled.div<{ focused: boolean }>`
  width: 100%;
  height: 90px;
  border-radius: 10px;
  position: relative;

  cursor: pointer;

  ${(props) =>
    props?.focused &&
    css`
      box-shadow: 0px 0px 0px 2px ${PRIMARY_9};
    `}
`;
