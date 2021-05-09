import React from 'react';
import styled from '@emotion/styled';
import { Button, Tooltip, Layout } from 'antd';
import { jsx, css } from '@emotion/react';
const { Header, Sider, Footer, Content } = Layout;
// components
import StudyRoomSide from '../../components/study/StudyRoomSide';
// images`
import ExitImg from '@assets/images/exit.svg';
import SoundOffImg from '@assets/images/sound-off.svg';
import ShareImg from '@assets/images/share.svg';
import { GRAY_12 } from '@shared/styles/colors';

import 'twin.macro';
import { StdTypoH4 } from '@shared/styled/Typography';

const Study = () => {
  return (
    <Layout>
      <Header css={HeaderStyle}>
        <StyledStudyRoomTitle>공부방 이름</StyledStudyRoomTitle>
        <div tw="flex items-center space-x-5">
          <Button type="primary" shape="circle">
            <ButtonImgStyled src={SoundOffImg} />
          </Button>
          <Button type="primary">
            <ButtonContentStyled>
              <ButtonImgStyled src={ExitImg} />
              <div>공부 종료하기</div>
            </ButtonContentStyled>
          </Button>
        </div>
      </Header>
      <Layout>
        <Content>Content</Content>
        <Sider width={465}>
          <SideTitleWrapperStyled>
            <div>공부중인 사람</div>
            <Button type="primary">
              <ButtonContentStyled>
                <ButtonImgStyled src={ShareImg} />
                <div>초대하기</div>
              </ButtonContentStyled>
            </Button>
          </SideTitleWrapperStyled>
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

const StyledStudyRoomTitle = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

const ButtonContentStyled = styled.div`
  display: flex;
`;
const ButtonImgStyled = styled.img`
  width: 24px;
  height: 24px;
`;

const SideTitleWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;
