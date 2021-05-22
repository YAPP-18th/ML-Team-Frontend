import React, { useState } from 'react';
import { Layout, Menu, Button, Modal } from 'antd';
// import { Content, Header } from 'antd/es/layout/layout';
const { Header, Sider, Footer, Content } = Layout;
import Logo from '@assets/images/logo.svg';
import 'twin.macro';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import { StyledRestrictedArea } from '@shared/styled/Common';
import { Body2Style } from '@shared/styled/Typography';
import { useMediaQuery } from 'react-responsive';
import {
  Link,
  withRouter,
  BrowserRouter,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom'; //npm install react-router-dom

//components
import StudyRoomSide from '@components/Study/StudyRoomSide';

// typography
import {
  StdTypoSubtitle1,
  StdTypoH3,
  StdTypoH4,
  StdTypoH5,
} from '@shared/styled/Typography';
// colors
import {
  GRAY_6,
  GRAY_8,
  GRAY_10,
  GRAY_12,
  PRIMARY_8,
} from '@shared/styles/colors';

// images
import ExitImg from '@assets/images/exit.svg';
import PrivateImg from '@assets/images/private.svg';
import { useHistory } from 'react-router';

const MenuStyle = css`
  margin-left: 45px;
  background: transparent !important;
`;

type StudyPageType = 'ready' | 'studyroom';

interface IStudyLayoutProps {
  page: StudyPageType;
  children: React.ReactNode;
}

export const StudyLayout: React.FC<IStudyLayoutProps> = ({
  children,
  page,
}) => {
  const history = useHistory();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    if (page == 'ready') {
      history.push(`/app/mystudy`);
    } else {
      history.push(`/app/finish`);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Layout
        css={css`
          height: 100%;
        `}
      >
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
            bodyStyle={{
              // borderRadius: '20px',
              // width: '420px',
              height: '148px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            footer={[
              <div key="set" tw="flex">
                <StyledModalButton role="Cancel" func={handleCancel} />
                <StyledModalButton role="Ok" func={handleOk} />,
              </div>,
            ]}
          >
            <div>
              <StdTypoH4 tw="text-gray-2">공부를 종료할까요?</StdTypoH4>
            </div>
          </Modal>
        </Header>
        <Layout
          css={css`
            display: ${page == 'ready' && 'flex'};
            flex-direction: ${page == 'ready' && 'column'};
            justify-content: ${page == 'ready' && 'center'};
            align-items: ${page == 'ready' && 'center'};
          `}
        >
          <Content
            tw="flex flex-col items-center justify-center "
            css={css`
              width: ${page == 'studyroom' && '100%'};
            `}
          >
            {children}
          </Content>
          {page == 'studyroom' && <ResponsiveSider />}
        </Layout>
      </Layout>
    </>
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
`;

const ButtonImgStyled = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

interface IModalButtonProps {
  role: string;
  func: any;
}

const StyledModalButton = ({ role, func }: IModalButtonProps) => {
  return (
    <Button
      tw=" w-1/2 absolute"
      css={[
        css`
          height: 74px;
        `,
        role == 'Cancel'
          ? css`
              left: 0;
              bottom: 0;
              // border-bottom-left-radius: 10px;
              background-color: ${GRAY_8};
              &:hover {
                background-color: ${GRAY_10};
              }
            `
          : css`
              right: 0;
              bottom: 0;
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

const ResponsiveSider = () => {
  const isLarge = useMediaQuery({ minWidth: 965 });
  return isLarge ? (
    <Sider width={465}>
      <StudyRoomSide />
    </Sider>
  ) : null;
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