import React, { useMemo } from 'react';
import {
  studyCardStyleList,
  StudyCardStyles,
} from '@components/MyStudy/StudyCard';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { PRIMARY_9 } from '@shared/styles/colors';
import CheckIcon from '@assets/icons/checked.svg';
import 'twin.macro';

interface IStudyCardSelectableProps {
  style: StudyCardStyles;
  focused: boolean;
}

export const StudyCardSelectable: React.FC<IStudyCardSelectableProps> = ({
  style,
  focused = false,
}) => {
  const wrapperCardStyle = useMemo(() => studyCardStyleList[style], [style]);
  return (
    <StudyCardWrapper css={wrapperCardStyle} focused={focused}>
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
      border: 2px solid ${PRIMARY_9};
    `}
`;
