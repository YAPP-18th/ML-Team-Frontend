import React from 'react';
import { Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Logo from '@assets/images/logo.svg';
import 'twin.macro';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { GRAY_10, PRIMARY_8 } from '@shared/styles/colors';
import tw from 'twin.macro';
import { StyledRestrictedArea } from '@shared/styled/Common';
import { Body2Style } from '@shared/styled/Typography';

const FooterStyle = css`
  width: 100%;
  padding: 20px 30px;
  margin-top: 50px;
`;

const StyledFooterInner = styled.div`
  max-width: 1194px;
  margin: 0 auto;

  ${tw`flex justify-between items-center text-gray-3 font-medium border-t border-gray-9 py-5`}
  ${Body2Style}
`;

const MenuStyle = css`
  margin-left: 45px;
  background: transparent !important;
`;

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <Layout>
        <Header
          tw="p-0"
          css={css`
            background: ${GRAY_10};
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
          `}
        >
          <StyledRestrictedArea tw="flex">
            <img src={Logo} tw="self-center" alt="STUDEEP" />
            <Menu theme="dark" mode="horizontal" css={MenuStyle}>
              <MenuItem key="1">내 학습</MenuItem>
              <MenuItem key="2">학습레포트</MenuItem>
              <MenuItem key="3">별자리샵</MenuItem>
            </Menu>
          </StyledRestrictedArea>
        </Header>
        <Content>{children}</Content>
        <Footer css={FooterStyle}>
          <StyledFooterInner>
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
          </StyledFooterInner>
        </Footer>
      </Layout>
    </>
  );
};

const MenuItem: React.FC = ({ children, ...props }) => {
  const MenuItemStyle = css`
    padding: 0 5px !important;
    margin-right: 30px;

    &.ant-menu-item-selected {
      background: transparent !important;
      font-weight: 600;

      &::before {
        background: ${PRIMARY_8};
      }
    }

    &::before {
      transition: all 0.1s;
      background: transparent;
      height: 4px;
      position: absolute;
      bottom: 0;
      left: 0;
      content: '';
      right: 0;
      width: 100%;
    }

    &:hover {
      background: transparent !important;
    }
  `;

  return (
    <>
      <Menu.Item {...props} css={MenuItemStyle}>
        {children}
      </Menu.Item>
    </>
  );
};
