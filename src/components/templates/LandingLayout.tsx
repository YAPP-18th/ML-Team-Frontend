import React, { useEffect, useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Logo from '@assets/images/logo.svg';
import 'twin.macro';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { GRAY_10, PRIMARY_8 } from '@shared/styles/colors';
import tw from 'twin.macro';
import { StyledRestrictedArea } from '@shared/styled/Common';
import { Body2Style } from '@shared/styled/Typography';
import { MenuItemProps } from 'antd/lib/menu/MenuItem';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { deleteFromStorage } from '@rehooks/local-storage';
import { StdTypoBody1 } from '@shared/styled/Typography';
import PrivacyModal from '@components/organisms/PrivacyModal';
import ServiceModal from '@components/organisms/ServiceModal';

const FooterStyle = css`
  width: 100%;
  padding: 0 30px 20px 30px;
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
  flex: 1;
`;

type MenuKey = 'mystudy' | 'report';
type MenuItemMap = {
  [key in MenuKey]: MenuItem;
};
type MenuItem = { linkTo: string; title: string; disabled?: boolean };

const menuItemMap: MenuItemMap = {
  mystudy: {
    linkTo: '/app/mystudy',
    title: '내 학습',
  },
  report: {
    linkTo: '/app/report',
    title: '학습레포트',
  },
};

export const LandingLayout: React.FC = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>();
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isServiceModalVisible, setIsServiceModalVisible] = useState(false);
  const history = useHistory();
  const match = useRouteMatch<{ current: string }>('/app/:current');

  const onMenuClick: MenuClickEventHandler = ({ key }) => {
    history.push(menuItemMap[key as MenuKey]?.linkTo);
  };

  const logout = () => {
    deleteFromStorage('accessToken');
  };

  useEffect(() => {
    const currentRoute: MenuKey = match?.params?.current as MenuKey;
    setSelectedMenu(currentRoute);
  }, [match]);

  return (
    <>
      <Layout>
        <Header
          tw="p-0"
          css={css`
            padding: 0 30px;
            background: ${GRAY_10};
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
          `}
        >
          <StyledRestrictedArea tw="flex items-center">
            <Link to="/" tw="inline-flex flex-shrink-0">
              <img src={Logo} tw="self-center" alt="STUDEEP" />
            </Link>
            <Menu
              theme="dark"
              mode="horizontal"
              css={MenuStyle}
              selectedKeys={selectedMenu ? [selectedMenu] : []}
              onClick={onMenuClick}
            >
              {Object.entries(menuItemMap).map((i) => (
                <MenuItemOverride key={i[0]} disabled={i[1]?.disabled}>
                  {i[1].title}
                </MenuItemOverride>
              ))}
            </Menu>
            <Button
              type="primary"
              size="small"
              tw="justify-self-end flex-shrink-0"
              onClick={() => {
                history.push('/auth');
              }}
            >
              시작하기
            </Button>
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
                <li
                  tw="cursor-pointer"
                  onClick={() => setIsServiceModalVisible(true)}
                >
                  서비스 이용약관
                </li>
                <li
                  tw="cursor-pointer"
                  onClick={() => setIsPrivacyModalVisible(true)}
                >
                  개인정보 처리방침
                </li>
              </ul>
            </div>
            <span
              tw="text-gray-6"
              css={css`
                font-family: 'Lexend', sans-serif;
              `}
            >
              © STUDEEP All Rights Reserved.
            </span>
          </StyledFooterInner>
          <PrivacyModal
            isModalVisible={isPrivacyModalVisible}
            setIsModalVisible={setIsPrivacyModalVisible}
          />
          <ServiceModal
            isModalVisible={isServiceModalVisible}
            setIsModalVisible={setIsServiceModalVisible}
          />
        </Footer>
      </Layout>
    </>
  );
};

const MenuItemOverride: React.FC<MenuItemProps> = ({ children, ...props }) => {
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
