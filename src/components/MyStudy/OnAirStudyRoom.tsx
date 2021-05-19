import React from 'react';
import { StdTypoSubtitle1 } from '@shared/styled/Typography';
import { StyledEmptyCardWrapper } from '@shared/styled/Common';
import 'twin.macro';

const OnAirStudyRoom: React.FC = () => {
  return (
    <>
      <StyledEmptyCardWrapper tw="text-center space-y-5 py-20">
        <StdTypoSubtitle1 tw="text-gray-6">
          현재 온에어 상태인 공부방이 없어요.
        </StdTypoSubtitle1>
      </StyledEmptyCardWrapper>
    </>
  );
};

export default OnAirStudyRoom;
