import React from 'react';
import { Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Logo from '@assets/images/logo.svg';
import 'twin.macro';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { GRAY_10 } from '@shared/styles/colors';

const StyledRestrictedWidthWrapper = styled.div`
  max-width: 1194px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
  box-sizing: content-box;
`;

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <Layout className="layout">
        <Header
          tw="p-0"
          css={css`
            background: ${GRAY_10};
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
          `}
        >
          <StyledRestrictedWidthWrapper tw="flex">
            <img src={Logo} tw="self-center" alt="STUDEEP" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              css={css`
                margin-left: 45px;
              `}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </StyledRestrictedWidthWrapper>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">{children}</div>
        </Content>
        <Footer tw="bg-gray-9">
          <StyledRestrictedWidthWrapper tw="flex justify-between items-center text-gray-3 font-medium">
            <div tw="flex justify-between items-center space-x-10">
              <img
                src={Logo}
                css={css`
                  height: 20px;
                `}
                alt="STUDEEP"
              />
              <ul tw="flex space-x-10">
                <li>서비스 이용약관</li>
                <li>개인정보 처리방침</li>
              </ul>
            </div>
            <span tw="text-gray-6">© STUDEEP All Rights Reserved.</span>
          </StyledRestrictedWidthWrapper>
        </Footer>
      </Layout>
    </>
  );
};
