import React, { useEffect, useState } from 'react';
import { StudyReady } from '@pages/AppMain/Study/StudyReady';
import { io } from 'socket.io-client';
import useUser from '../../../hooks/useUser';
import { Socket } from 'socket.io-client/build/socket';
import { useHistory } from 'react-router';
import { css } from '@emotion/react';
import { Button, Layout, Modal, Spin } from 'antd';
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
import { studyState } from '../../../atoms/studyState';

export enum StudyStep {
  STUDY_READY = 'STUDY_READY',
  STUDY_ROOM = 'STUDY_ROOM',
  STUDY_FINISH = 'STUDY_FINISH',
}

export const Study = () => {
  const [study, setStudy] = useRecoilState(studyState);
  const [step, setStep] = useState<StudyStep>(StudyStep.NOTHING);
  const [socket, setSocket] = useState<Socket>();
  const [connected, setConnected] = useState(false);
  const user = useUser();
  const history = useHistory();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleEndStudyOk = () => {
    setIsModalVisible(false);
    history.replace('/');
  };
  const handleEndStudyCancel = () => {
    setIsModalVisible(false);
  };

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
      _socket.on('response', (res) => {
        setConnected(_socket.connected);
        console.log(res);
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

  function doJoinStudyRoom(id: string) {
    if (socket) {
      console.log('Do Join Room');
      socket.emit('joinRoom', id);
    }
  }

  return (
    <Layout
      css={css`
        height: 100%;
      `}
    >
      <Header css={HeaderStyle}>
        <div tw="flex">
          <StdTypoH5>{study?.title || '불러오는 중'}</StdTypoH5>
          {/*{isPublic == false && <img src={PrivateImg} alt="비밀방" />}*/}
        </div>

        <Button
          tw="bg-gray-10 border-none flex items-center hover:bg-gray-9"
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
      </Header>

      <Spin spinning={!(socket && connected && !!user?.data)} size="large">
        {study && socket && connected && user?.data && (
          <StudyReady
            setStep={setStep}
            socket={socket}
            user={user.data}
            doJoinStudyRoom={() => doJoinStudyRoom(study.id)}
          />
        )}
      </Spin>
      {/*{socket?.connected ? (*/}
      {/*  <>*/}
      {/*  </>*/}
      {/*) : (*/}
      {/*  <div>소켓 접속 중</div>*/}
      {/*)}*/}
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
