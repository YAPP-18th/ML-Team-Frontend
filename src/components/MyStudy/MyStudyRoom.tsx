import React, { useState } from 'react';
import { StdTypoSubtitle1 } from '@shared/styled/Typography';
import { Button } from 'antd';
import { StyledEmptyCardWrapper } from '@shared/styled/Common';
import 'twin.macro';
import StudyCard from '@components/MyStudy/StudyCard';
import { css } from '@emotion/react';

const MyStudyRoom: React.FC = () => {
  const [roomList, setRoomList] = useState(['123']);

  return (
    <>
      {roomList?.length ? (
        <div
          tw="grid grid-cols-4"
          css={css`
            gap: 26px;
          `}
        >
          <StudyCard
            style="style_1"
            title={'123'}
            description={'123141215151'}
          />
          <StudyCard style="style_2" title={'123'} />
          <StudyCard style="style_3" title={'123'} />
          <StudyCard style="style_4" title={'123'} />
        </div>
      ) : (
        <StyledEmptyCardWrapper tw="text-center space-y-5 py-20">
          <StdTypoSubtitle1 tw="text-gray-6">
            아직 시작한 공부방이 없어요. 공부를 시작해보세요.
          </StdTypoSubtitle1>
          <Button type="primary">공부방 만들기</Button>
        </StyledEmptyCardWrapper>
      )}
    </>
  );
};

export default MyStudyRoom;
