import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
import 'twin.macro';

// components
import { Button, Layout } from 'antd';
import StudyRoomSide from '../../components/study/StudyRoomSide';
import RTCVideo from '../../components/study/RTCVideo';
const { Header, Sider, Footer, Content } = Layout;

// typography
import { StdTypoH1, StdTypoH5 } from '@shared/styled/Typography';

// colors
import {
  GRAY_4,
  GRAY_9,
  GRAY_11,
  GRAY_12,
  PRIMARY_10,
} from '@shared/styles/colors';

// images
import ExitImg from '@assets/images/exit.svg';
import PrivateImg from '@assets/images/private.svg';
import TimeImg from '@assets/images/time.svg';

const Study = () => {
  const [localStream, setLocalStream] = useState<MediaStream>();
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setLocalStream(stream);
    });
  }, []);
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
        >
          <ButtonImgStyled src={ExitImg} alt="공부종료" />
          <div>공부 종료하기</div>
        </Button>
      </Header>
      <Layout>
        <Content tw="relative">
          <RTCVideo width={'1544px'} mediaStream={localStream} />
          <StyledStudyInfoBar>
            <div tw="flex items-center">
              <StyledStudyInfoSet>
                <img src={TimeImg} tw="mr-1" alt="공부세트" />
                <div>$ set</div>
              </StyledStudyInfoSet>
              <div tw="flex items-end">
                <StdTypoH1>$$:$$:$$</StdTypoH1>
                <StdTypoH5
                  css={css`
                    margin-left: 20px;
                    color: ${GRAY_4};
                  `}
                >
                  휴식시간까지 $$:$$:$$
                </StdTypoH5>
              </div>
            </div>
            <StyledStudyInfoStatus>
              <StdTypoH5>상태표시</StdTypoH5>
            </StyledStudyInfoStatus>
          </StyledStudyInfoBar>
        </Content>
        <Sider style={{ backgroundColor: 'green' }} width={465}>
          <StudyRoomSide />
        </Sider>
      </Layout>
    </Layout>
  );
};
export default Study;

const HeaderStyle = css`
  height: 80px;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background: ${GRAY_12};
`;

const ButtonImgStyled = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;
const StyledStudyInfoBar = styled.div`
  width: 1387px;
  height: 128px;
  position: absolute;
  color: white;
  display: flex;
  top: 840px;
  left: 34px;
  background-color: ${GRAY_11};
  opacity: 0.9;
  align-items: center;
  border-radius: 20px;
  padding: 0px 40px;
  justify-content: space-between;
`;
const StyledStudyInfoStatus = styled.div`
  background-color: ${PRIMARY_10};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 175px;
  height: 56px;
`;
const StyledStudyInfoSet = styled.div`
  background-color: ${GRAY_9};
  display: flex;
  border-radius: 8px;
  width: 97px;
  height: 38px;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
`;
