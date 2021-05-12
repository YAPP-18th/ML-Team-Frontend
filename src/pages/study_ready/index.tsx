import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
import 'twin.macro';

// components
import { Modal, Button, Layout } from 'antd';
const { Header, Content } = Layout;
import RTCVideo from '../../components/study/RTCVideo';

// typography
import {
  StdTypoSubtitle1,
  StdTypoH3,
  StdTypoH4,
  StdTypoH5,
} from '@shared/styled/Typography';

// colors
import { GRAY_6, GRAY_8, GRAY_12, PRIMARY_8 } from '@shared/styles/colors';

// images
import ExitImg from '@assets/images/exit.svg';
import PrivateImg from '@assets/images/private.svg';

interface IReadyStatusProps {
  status: string;
}

const StudyReady = () => {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setLocalStream(stream);
    });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const ExitModal = () => {
    return (
      <div
        tw="bg-gray-10 relative "
        css={css`
          width: 420px;
          height: 220px;
          border-radius: 20px;
        `}
      >
        <StdTypoH4
          tw="text-gray-2 flex flex-col items-center justify-center"
          css={css`
            height: 148px;
          `}
        >
          공부를 종료할까요?
        </StdTypoH4>
        <div tw="flex">
          <Button
            tw="w-1/2 absolute left-0 bottom-0 bg-gray-8 rounded-none"
            css={css`
              height: 74px;
              border-bottom-left-radius: 20px;
            `}
            key="keep"
            onClick={handleCancel}
          >
            <StdTypoSubtitle1>조금 더 해볼래요</StdTypoSubtitle1>
          </Button>
          <Button
            tw="w-1/2 absolute right-0 bottom-0 rounded-none"
            css={css`
              height: 74px;
              border-bottom-right-radius: 20px;
            `}
            key="quit"
            type="primary"
            onClick={handleOk}
          >
            <StdTypoSubtitle1>네, 그만할래요</StdTypoSubtitle1>
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Layout>
      <Header css={HeaderStyle}>
        <div tw="flex">
          <StdTypoH5>공부방 이름</StdTypoH5>
          {/* private이라면 */}
          <img src={PrivateImg} />
        </div>
        <Button
          tw="bg-gray-10 border-none flex items-center hover:bg-gray-9 "
          shape="round"
          type="primary"
          onClick={showModal}
        >
          <ButtonImgStyled src={ExitImg} alt="공부종료" />
          <div>공부 종료하기</div>
        </Button>
        <Modal
          visible={isModalVisible}
          closable={false}
          onOk={handleOk}
          onCancel={handleCancel}
          keyboard={false}
          modalRender={ExitModal}
        >
          <StdTypoH4 tw="text-gray-2">공부를 종료할까요?</StdTypoH4>
        </Modal>
      </Header>
      <Layout>
        <Content
          tw="flex flex-col items-center justify-center"
          css={css`
            height: 1000px;
          `}
        >
          <StdTypoH3 tw="from-gray-1">정확한 집중도 분석을 위해</StdTypoH3>
          <StdTypoH3 tw="from-gray-1">
            화면에 두 손이 나오게 준비해주세요
          </StdTypoH3>
          {/* 현재 손의 준비 상태에 따라 둘 중에 하나 리턴 */}
          {/* <StyledStudyReadyStatus status="준비중">
            준비중
          </StyledStudyReadyStatus> */}
          <div>
            <StyledStudyReadyStatus status="준비완료">
              준비완료
            </StyledStudyReadyStatus>
            <div tw="mb-7">$초 뒤 자동입장</div>
          </div>
          <RTCVideo width={'840px'} mediaStream={localStream} />
        </Content>
      </Layout>
    </Layout>
  );
};
export default StudyReady;

const HeaderStyle = css`
  height: 80px;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background: ${GRAY_12};
`;

const StyledStudyRoomTitle = styled.span`
  font-size: 22px;
  font-weight: 600;
  margin-right: 10px;
`;
const ButtonImgStyled = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;
const StyledStudyReadyStatus = styled.div(({ status }: IReadyStatusProps) => ({
  width: '96px',
  height: '30px',
  marginTop: '30px',
  marginBottom: status == '준비중' ? '78px' : '20px',
  backgroundColor: status == '준비중' ? GRAY_8 : PRIMARY_8,
  color: status == '준비중' ? GRAY_6 : 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
}));
