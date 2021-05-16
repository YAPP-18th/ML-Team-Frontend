import React, { useState, useEffect } from 'react';
import {
  Link,
  withRouter,
  BrowserRouter,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom'; //npm install react-router-dom
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';
import 'twin.macro';

// components
import { Modal, Button, Layout } from 'antd';
import StudyRoomSide from '@components/Study/StudyRoomSide';
import RTCVideo from '@components/Study/RTCVideo';
import StatusModal from '@components/Study/StatusModal';
import StudyInfoBar from '@components/Study/StudyInfoBar';
const { Header, Sider, Footer, Content } = Layout;

// typography
import { StdTypoH1, StdTypoH5 } from '@shared/styled/Typography';

// colors
import { GRAY_8, GRAY_9, GRAY_12, PRIMARY_10 } from '@shared/styles/colors';

// images
import ExitImg from '@assets/images/exit.svg';
import PrivateImg from '@assets/images/private.svg';

interface IStudyInfoBarProps {
  status: string;
}

const Study = (props: RouteComponentProps) => {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [wantExit, setWantExit] = useState(false);
  const history = useHistory();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setLocalStream(stream);
    });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
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
          keyboard={false}
          // modalRender={(modal) => <ExitModal modal={modal} />}
          maskStyle={{
            background: `rgba(31,31,31,0.8)`,
            backdropFilter: `blur(5px)`,
          }}
        ></Modal>
      </Header>
      <Layout>
        <Content
          tw="flex justify-center"
          css={css`
            width: 100%;
          `}
        >
          <RTCVideo tw="relative" mediaStream={localStream} />
          <ResponsiveStyledStudyInfoBar status={'상태표시'} />
        </Content>
        <ResponsiveSider />
      </Layout>
    </Layout>
  );
};

// interface IExitModalProps {
//   modal: Modal;
// }

// const ExitModal: React.FC<IExitModalProps> = ({ setIsModalVisible }) => {
//   const history = useHistory();

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   useEffect(() => {
//     console.log(history.location);
//   }, [history]);

//   return (
//     <div
//       tw="bg-gray-10 relative "
//       css={css`
//         width: 420px;
//         height: 220px;
//         border-radius: 20px;
//       `}
//     >
//       <StdTypoH4
//         tw="text-gray-2 flex flex-col items-center justify-center"
//         css={css`
//           height: 148px;
//         `}
//       >
//         공부를 종료할까요?
//       </StdTypoH4>
//       <div tw="flex">
//         <Button
//           tw="w-1/2 absolute left-0 bottom-0 bg-gray-8 rounded-none"
//           css={css`
//             height: 74px;
//             border-bottom-left-radius: 20px;
//           `}
//           key="keep"
//           onClick={handleCancel}
//         >
//           <StdTypoSubtitle1>조금 더 해볼래요</StdTypoSubtitle1>
//         </Button>
//         <Button
//           tw="w-1/2 absolute right-0 bottom-0 rounded-none"
//           css={css`
//             height: 74px;
//             border-bottom-right-radius: 20px;
//           `}
//           key="quit"
//           type="primary"
//           onClick={() => {
//             console.log('clicked');
//           }}
//         >
//           <StdTypoSubtitle1>네, 그만할래요</StdTypoSubtitle1>
//         </Button>
//       </div>
//     </div>
//   );
// };

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

const ResponsiveSider = () => {
  const isLarge = useMediaQuery({ minWidth: 965 });
  return isLarge ? (
    <Sider width={465}>
      <StudyRoomSide />
    </Sider>
  ) : null;
};
const ResponsiveStyledStudyInfoBar = (props: IStudyInfoBarProps) => {
  const isLarge = useMediaQuery({ minWidth: 965 });
  return isLarge ? (
    <StudyInfoBar status={props.status} isLarge={true} />
  ) : (
    <StudyInfoBar status={props.status} isLarge={false} />
  );
};
