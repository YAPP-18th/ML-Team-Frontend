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
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { studyState } from '../../../atoms/studyState';
import { IStudyRoom } from '@shared/interface';

export const MyStudy: React.FC = () => {
  const studyRoom = useStudyRoom(); //{ skip: 0, limit: 5 }
  const myStudyRoom = useMyStudyRoom();
  const { path } = useRouteMatch();
  const user = useUser();
  const [accessToken] = useLocalStorage('accessToken');
  const history = useHistory();
  const [study, setStudy] = useRecoilState(studyState);

  const [loading, setLoading] = useState(false);

  const onEnterRoom = (studyRoom: IStudyRoom, pw?: string) => {
    joinStudyRoom(studyRoom.id, accessToken, pw)
      .then((r) => {
        setStudy(studyRoom);
        message.success('공부방에 입장했습니다.');
        history.push('./study');
      })
      .catch((err) => {
        message.error(
          '비밀번호가 틀렸거나, 서버 오류로 공부방 입장에 실패했습니다.',
        );
      });
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
            <Spin spinning={studyRoom.isValidating}>
              <OnAirStudyRoom
                data={studyRoom?.data}
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
