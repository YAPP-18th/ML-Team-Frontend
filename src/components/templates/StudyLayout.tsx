import React, { Dispatch, SetStateAction, useState } from 'react';
import 'twin.macro';
import { css } from '@emotion/react';

import styled from '@emotion/styled';
import { useMediaQuery } from 'react-responsive';
import { StudyStep } from '@pages/AppMain/Study/Study';

//components
import { Button, Layout, Modal } from 'antd';
import StudyRoomSide from '@components/organisms/StudyRoomSide';
// typography
import {
  StdTypoH4,
  StdTypoH5,
  StdTypoSubtitle1,
} from '@shared/styled/Typography';
// colors
import { GRAY_10, GRAY_12, GRAY_8 } from '@shared/styles/colors';

// images
import ExitImg from '@assets/images/exit.svg';
import PrivateImg from '@assets/images/private.svg';
import { useHistory } from 'react-router';

const { Header, Sider, Footer, Content } = Layout;

type StudyPageType = 'ready' | 'studyroom';

interface IStudyLayoutProps {
  page: StudyPageType;
  children: React.ReactNode;
  isPublic: boolean;
  setStep: Dispatch<SetStateAction<StudyStep>>;
}

export const StudyLayout: React.FC<IStudyLayoutProps> = ({
  children,
  page,
  isPublic,
  setStep,
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
      setStep(StudyStep.STUDY_FINISH);
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
            {isPublic == false && <img src={PrivateImg} alt="비밀방" />}
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
            tw="flex flex-col items-center justify-center bg-gray-10"
            css={css`
              width: 100%;
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
  border-bottom-width: 0.1px;
  border-color: ${GRAY_8};
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
      tw=" w-1/2 absolute rounded-none"
      css={[
        css`
          height: 74px;
        `,
        role == 'Cancel'
          ? css`
              left: 0;
              bottom: 0;
              border-bottom-left-radius: 10px;
              background-color: ${GRAY_8};
              &:hover {
                background-color: ${GRAY_10};
              }
            `
          : css`
              border-bottom-right-radius: 10px;
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
