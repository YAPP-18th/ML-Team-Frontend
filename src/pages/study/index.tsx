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

const Study = () => {
  return (
    <Layout>
      <Header css={HeaderStyle}>
        <div>공부방 이름</div>
        <Tooltip title="search">
          <Button type="primary" shape="circle">
            <ButtonImgStyled src={SoundOffImg} />
          </Button>
          <Button type="primary">
            <ButtonContentStyled>
              <ButtonImgStyled src={ExitImg} />
              <div>공부 종료하기</div>
            </ButtonContentStyled>
          </Button>
        </Tooltip>
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
  color: white;
  background-color: black;
  display: flex;
  justify-content: space-between;
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
