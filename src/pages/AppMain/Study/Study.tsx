import React, { useEffect, useMemo, useState } from 'react';
import { StudyReady } from '@pages/AppMain/Study/StudyReady';
import { io } from 'socket.io-client';
import useUser from '../../../hooks/useUser';
import { Socket } from 'socket.io-client/build/socket';
import { useHistory } from 'react-router';
import { css } from '@emotion/react';
import { Button, Layout, message, Modal, Spin } from 'antd';
import {
  StdTypoH4,
  StdTypoH5,
  StdTypoSubtitle1,
} from '@shared/styled/Typography';
import ExitImg from '@assets/images/exit.svg';
import { GRAY_10, GRAY_12, GRAY_8 } from '@shared/styles/colors';
import { Header } from 'antd/es/layout/layout';
import 'twin.macro';
import { useRecoilState } from 'recoil';
import { studyRoomState } from '../../../atoms/studyRoomState';
import { StudyRoom } from '@pages/AppMain/Study/StudyRoom';
import getMyStudyData from '../../../hooks/apis/getMyStudyData';
import { IMyStudy } from '@shared/interface';
import useAccessToken from '../../../hooks/useAccessToken';
import { StudyFinish } from '@pages/AppMain/Study/StudyFinish';
import { Step } from '@tensorflow/tfjs';

export enum StudyStep {
  STUDY_READY = 'STUDY_READY',
  STUDY_ROOM = 'STUDY_ROOM',
  STUDY_FINISH = 'STUDY_FINISH',
}

export const Study = () => {
  const [studyRoom, setStudyRoom] = useRecoilState(studyRoomState);
  const [step, setStep] = useState<StudyStep>(StudyStep.STUDY_READY);

  const [socket, setSocket] = useState<Socket>();

  const [connected, setConnected] = useState(false);
  const [forceLoading, setForceLoading] = useState(false);

  const [myStudyId, setMyStudyId] = useState<number | null>(null);
  const [myStudy, setMyStudy] = useState<IMyStudy | null>(null);

  const [accessToken] = useAccessToken();

  const user = useUser();
  const history = useHistory();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleEndStudyOk = () => {
    setIsModalVisible(false);
    socket?.disconnect();
    setForceLoading(true);

    myStudyId &&
      getMyStudyData(myStudyId, accessToken)
        .then((r) => {
          setMyStudy(r);
          setStep(StudyStep.STUDY_FINISH);
          setForceLoading(false);
        })
        .catch((err) => {
          message.error('현재 나의 공부방 정보를 받아올 수 없습니다.');
          history.replace('/');
        });
  };
  const handleEndStudyCancel = () => {
    setIsModalVisible(false);
  };

  const renderedComponent = useMemo(() => {
    if (studyRoom && socket && connected && user?.data) {
      switch (step) {
        case StudyStep.STUDY_READY:
          return (
            <StudyReady doJoinStudyRoom={() => doJoinStudyRoom(studyRoom.id)} />
          );
        case StudyStep.STUDY_ROOM:
          return <StudyRoom study={studyRoom} />;
        case StudyStep.STUDY_FINISH:
          return (
            myStudy && <StudyFinish studyRoom={studyRoom} myStudy={myStudy} />
          );
      }
    } else {
      return <></>;
    }
  }, [myStudy, step, socket, connected, user?.data]);

  function doJoinStudyRoom(id: string) {
    if (socket) {
      console.log('Do Join Room');
      socket.emit('joinRoom', id);
    }
  }

  useEffect(() => {
    if (!studyRoom) {
      message.error('현재 참여 중인 공부방이 없습니다.');
      history.replace('/');
    }
  }, [studyRoom]);

  useEffect(() => {
    if (user?.data) {
      console.log('Create Socket.IO Instance');

      const _socket = io(`${'localhost'}:8000/study`, {
        reconnection: true,
        forceNew: false,
        auth: { user_id: user.data?.id },
        transports: ['websocket'],
        reconnectionAttempts: 3,
      });
      _socket.on('response', ({ data, eventName, message, statusCode }) => {
        switch (eventName) {
          case 'connect':
            if (message === 'SUCCESS') {
              setConnected(_socket.connected);
            }
            break;
          case 'joinRoom':
            if (message === 'SUCCESS') {
              if (data?.my_study_id) {
                setMyStudyId(data.my_study_id);
              } else {
                history.replace('/');
                message.error('공부방 입장에 실패했습니다.');
              }
              setStep(StudyStep.STUDY_ROOM);
            }
            break;
          default:
            return;
        }
      });
      _socket.on('disconnect', function () {
        console.log('Client disconnected.');
      });
      setSocket(_socket);
    }
  }, [user]);

  useEffect(() => {
    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <Layout tw="h-full">
      <Header css={HeaderStyle}>
        <StdTypoH5 tw="overflow-hidden whitespace-nowrap overflow-ellipsis pr-6">
          {studyRoom?.title || '불러오는 중'}
        </StdTypoH5>
        {step !== StudyStep.STUDY_FINISH && (
          <Button
            tw="bg-gray-10 border-none flex items-center hover:bg-gray-9 flex-shrink-0"
            shape="round"
            type="primary"
            onClick={showModal}
          >
            <img
              css={css`
                width: 24px;
                height: 24px;
                margin-right: 8px;
                display: inline-block;
              `}
              src={ExitImg}
              alt="공부종료"
            />
            <span>공부 종료하기</span>
          </Button>
        )}
      </Header>

      <Layout>
        <Layout
          css={css`
            > .ant-spin-nested-loading {
              height: 100%;
              > .ant-spin-container {
                height: 100%;
              }
            }
          `}
        >
          <Spin
            spinning={forceLoading || !(socket && connected && !!user?.data)}
            size="large"
          >
            {renderedComponent}
          </Spin>
        </Layout>
      </Layout>
      <Modal
        visible={isModalVisible}
        closable={false}
        onOk={handleEndStudyOk}
        onCancel={handleEndStudyCancel}
        keyboard={false}
        bodyStyle={{
          height: '148px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        css={css`
          .ant-modal-footer {
            display: flex;
            padding: 0;
            border: none;
          }
        `}
        footer={
          <div tw="w-full flex">
            <StyledModalButton role="Cancel" func={handleEndStudyCancel} />
            <StyledModalButton role="Ok" func={handleEndStudyOk} />
          </div>
        }
      >
        <div>
          <StdTypoH4 tw="text-gray-2">공부를 종료할까요?</StdTypoH4>
        </div>
      </Modal>
    </Layout>
  );
};

const HeaderStyle = css`
  height: 80px;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background: ${GRAY_12};
  border-bottom-width: 0.1px;
  border-color: ${GRAY_8};
`;

interface IModalButtonProps {
  role: string;
  func: any;
}

const StyledModalButton = ({ role, func }: IModalButtonProps) => {
  return (
    <Button
      tw="rounded-none"
      css={[
        css`
          flex: 1;
          height: 74px;
          margin: 0 !important;
        `,
        role == 'Cancel'
          ? css`
              border-bottom-left-radius: 10px;
              background-color: ${GRAY_8};

              &:hover {
                background-color: ${GRAY_10};
              }
            `
          : css`
              border-bottom-right-radius: 10px;
            `,
      ]}
      key={role == 'Cancel' ? 'keep' : 'quit'}
      type={role == 'Cancel' ? 'default' : 'primary'}
      onClick={func}
    >
      <StdTypoSubtitle1>
        {role == 'Cancel' ? '조금 더 해볼래요' : '네, 그만할래요'}
      </StdTypoSubtitle1>
    </Button>
  );
};
