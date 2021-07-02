import React, { useState } from 'react';
import { StyledRestrictedArea } from '@shared/styled/Common';
import { StdTypoH4 } from '@shared/styled/Typography';
import styled from '@emotion/styled';
import 'twin.macro';
import { MainLayout } from '@components/templates/MainLayout';
import MyStudyRoom from '@components/molecules/MyStudyRoom';
import OnAirStudyRoom from '@components/molecules/OnAirStudyRoom';
import { Button, message, Spin } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';
import useStudyRooms, {
  STUDY_ROOM_END_POINT,
} from '../../../hooks/useStudyRooms';
import useMyStudyRoom, {
  MY_STUDY_ROOM_END_POINT,
} from '../../../hooks/useMyStudyRoom';
import useUser from '../../../hooks/useUser';
import joinStudyRoom from '../../../hooks/apis/joinStudyRoom';
import deleteStudyRoom from '../../../hooks/apis/deleteStudyRoom';
import { mutate } from 'swr';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { studyRoomState } from '../../../atoms/studyRoomState';
import { IStudyRoom } from '@shared/interface';
import useAccessToken from '../../../hooks/useAccessToken';

export const MyStudy: React.FC = () => {
  const studyRooms = useStudyRooms(); //{ skip: 0, limit: 5 }
  const myStudyRoom = useMyStudyRoom();
  const { path } = useRouteMatch();
  const user = useUser();
  const [accessToken, setAccessToken] = useAccessToken();
  const history = useHistory();
  const [_, setStudyRoom] = useRecoilState(studyRoomState);

  const [loading, setLoading] = useState(false);

  const onEnterRoom = (studyRoom: IStudyRoom, pw?: string) => {
    if (user.data?.id) {
      setLoading(true);
      joinStudyRoom(studyRoom.id, user.data.id, accessToken, pw)
        .then((r) => {
          setStudyRoom(studyRoom);
          setLoading(false);
          message.success('공부방에 입장했습니다.');
          history.push('./study');
        })
        .catch((err) => {
          if (err?.response?.status === 400) {
            message.error('이미 접속 중인 공부방이 있습니다.');
          } else {
            message.error(
              '비밀번호가 틀렸거나, 서버 오류로 공부방 입장에 실패했습니다.',
            );
          }
          setLoading(false);
        });
    } else {
      message.error('유저 정보를 받아올 수 없습니다.');
      setAccessToken(null);
      history.replace('/');
    }
  };

  function onDelete(roomId: string, userId: number) {
    deleteStudyRoom(roomId, userId, accessToken)
      .then(async (r) => {
        await mutate(STUDY_ROOM_END_POINT);
        await mutate(`${MY_STUDY_ROOM_END_POINT}${user.data?.id}`);
        message.success('공부방이 삭제되었습니다.');
      })
      .catch(() => {
        message.error('공부방 삭제에 실패했습니다.');
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
            <Spin spinning={myStudyRoom.isValidating}>
              <MyStudyRoom
                data={myStudyRoom?.data}
                myUserId={user.data?.id}
                onEnterRoom={onEnterRoom}
                onDelete={onDelete}
              />
            </Spin>
          </StyledMyStudyCard>
          <StyledMyStudyCard>
            <StdTypoH4>온에어 공부방</StdTypoH4>
            <Spin spinning={studyRooms.isValidating}>
              <OnAirStudyRoom
                data={studyRooms?.data}
                onEnterRoom={onEnterRoom}
              />
            </Spin>
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
