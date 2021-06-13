import React, { useEffect, useState } from 'react';
import { StyledRestrictedArea } from '@shared/styled/Common';
import { StdTypoH4 } from '@shared/styled/Typography';
import styled from '@emotion/styled';
import 'twin.macro';
import { MainLayout } from '@components/templates/MainLayout';
import MyStudyRoom from '@components/molecules/MyStudyRoom';
import OnAirStudyRoom from '@components/molecules/OnAirStudyRoom';
import { Button, message, Spin } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';
import useStudyRoom, {
  STUDY_ROOM_END_POINT,
} from '../../../hooks/useStudyRoom';
import useMyStudyRoom, {
  MY_STUDY_ROOM_END_POINT,
} from '../../../hooks/useMyStudyRoom';
import useUser from '../../../hooks/useUser';
import joinStudyRoom from '../../../hooks/apis/joinStudyRoom';
import { useLocalStorage } from '@rehooks/local-storage';
import deleteStudyRoom from '../../../hooks/apis/deleteStudyRoom';
import { mutate } from 'swr';

export const MyStudy: React.FC = () => {
  const studyRoom = useStudyRoom(); //{ skip: 0, limit: 5 }
  const myStudyRoom = useMyStudyRoom();
  const { path } = useRouteMatch();
  const user = useUser();
  const [accessToken] = useLocalStorage('accessToken');

  const [loading, setLoading] = useState(false);

  const onEnterRoom = (id: number, pw?: string) => {
    joinStudyRoom(id, accessToken, pw)
      .then((r) => {
        message.success('공부방에 입장했습니다.');
      })
      .catch((err) => {
        message.error(
          '비밀번호가 틀렸거나, 서버 오류로 공부방 입장에 실패했습니다.',
        );
      });
  };

  function onDelete(_id: number) {
    deleteStudyRoom(_id, accessToken).then(async (r) => {
      await mutate(STUDY_ROOM_END_POINT);
      await mutate(`${MY_STUDY_ROOM_END_POINT}${user.data?.id}`);
    });
  }

  return (
    <MainLayout>
      <Spin size="large" spinning={loading}>
        <StyledRestrictedArea>
          <StyledMyStudyCard>
            <div tw="flex items-center justify-between">
              <StdTypoH4>내 공부방</StdTypoH4>
              <Link to={`${path}/create`}>
                <Button size="small">공부방 만들기</Button>
              </Link>
            </div>
            <MyStudyRoom
              data={myStudyRoom?.data}
              myUserId={user.data?.id}
              onEnterRoom={onEnterRoom}
              onDelete={onDelete}
            />
          </StyledMyStudyCard>
          <StyledMyStudyCard>
            <StdTypoH4>온에어 공부방</StdTypoH4>
            <OnAirStudyRoom data={studyRoom?.data} onEnterRoom={onEnterRoom} />
          </StyledMyStudyCard>
        </StyledRestrictedArea>
      </Spin>
    </MainLayout>
  );
};

const StyledMyStudyCard = styled.div`
  margin-top: 60px;

  > * + * {
    margin-top: 15px;
  }
`;
