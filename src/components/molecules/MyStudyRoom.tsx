import React from 'react';
import { StdTypoSubtitle1 } from '@shared/styled/Typography';
import { Button } from 'antd';
import { StyledEmptyCardWrapper } from '@shared/styled/Common';
import 'twin.macro';
import StudyCard from '@components/atoms/StudyCard';
import { css } from '@emotion/react';
import { IStudyRoom } from '@shared/types';
import { Link, useRouteMatch } from 'react-router-dom';

interface IMyStudyRoomProps {
  data?: IStudyRoom[];
}

const MyStudyRoom: React.FC<IMyStudyRoomProps> = ({ data }) => {
  const { path } = useRouteMatch();
  return (
    <>
      {data?.length ? (
        <div
          tw="grid grid-cols-2 md:grid-cols-4"
          css={css`
            gap: 26px;
          `}
        >
          {data.map((card) => (
            <StudyCard key={card.id} {...card} />
          ))}
        </div>
      ) : (
        <StyledEmptyCardWrapper tw="text-center space-y-5 py-20">
          <StdTypoSubtitle1 tw="text-gray-6">
            아직 시작한 공부방이 없어요. 공부를 시작해보세요.
          </StdTypoSubtitle1>
          <Link to={`${path}/create`} tw="inline-block">
            <Button type="primary">공부방 만들기</Button>
          </Link>
        </StyledEmptyCardWrapper>
      )}
    </>
  );
};

export default MyStudyRoom;
