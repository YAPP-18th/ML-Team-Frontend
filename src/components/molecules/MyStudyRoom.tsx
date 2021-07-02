import React from 'react';
import { StdTypoBody2, StdTypoSubtitle1 } from '@shared/styled/Typography';
import { Button, Menu } from 'antd';
import { StyledEmptyCardWrapper } from '@shared/styled/Common';
import 'twin.macro';
import StudyCard from '@components/atoms/StudyCard';
import { css } from '@emotion/react';
import { IStudyRoom } from '@shared/interface';
import { Link, useRouteMatch } from 'react-router-dom';
import DeleteIcon from '@assets/icons/delete.svg';

interface IMyStudyRoomProps {
  data?: IStudyRoom[];
  myUserId?: number;
  onEnterRoom: (id: number, userId?: number, pw?: string) => void;
  onDelete: (roomId: number, userId: number) => void;
}

const MyStudyRoom: React.FC<IMyStudyRoomProps> = ({
  data,
  myUserId,
  onEnterRoom,
  onDelete,
}) => {
  const { path } = useRouteMatch();

  const generateMenu = (roomId: number, userId?: number) => {
    if (!userId) return;
    return (
      <Menu>
        <Menu.Item key="0" onClick={() => onDelete(roomId, userId)}>
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
  };

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
              myUserId={myUserId}
              onEnterRoom={onEnterRoom}
              dropdown={generateMenu(card.id, myUserId)}
            />
          ))}
        </div>
      ) : (
        <StyledEmptyCardWrapper>
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
