import React from 'react';
import { StdTypoSubtitle1 } from '@shared/styled/Typography';
import { StyledEmptyCardWrapper } from '@shared/styled/Common';
import 'twin.macro';
import { Button } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';
import { IStudyRoom } from '@shared/interface';
import { css } from '@emotion/react';
import StudyCard from '@components/atoms/StudyCard';

interface IOnAirStudyRoomProps {
  data?: IStudyRoom[];
  onEnterRoom: (studyRoom: IStudyRoom, pw?: string) => void;
}

const OnAirStudyRoom: React.FC<IOnAirStudyRoomProps> = ({
  data,
  onEnterRoom,
}) => {
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
            <StudyCard
              key={card.id}
              {...card}
              onEnterRoom={(pw) => onEnterRoom(card, pw)}
            />
          ))}
        </div>
      ) : (
        <StyledEmptyCardWrapper>
          <StdTypoSubtitle1 tw="text-gray-6">
            지금 진행중인 공부방이 없어요. 공부방을 만들어 공부를 시작해보세요.
          </StdTypoSubtitle1>
          <Link to={`${path}/create`} tw="inline-block">
            <Button type="primary">공부방 만들기</Button>
          </Link>
        </StyledEmptyCardWrapper>
      )}
    </>
  );
};

export default OnAirStudyRoom;
