import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useMediaQuery } from 'react-responsive';
import 'twin.macro';
import StudyInfoBar from '@components/organisms/StudyInfoBar';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import {
  handDetection,
  smartPhoneDetection,
} from '../../../ml/userActionDetection';

import NowSleepImg from '@assets/images/sleeping_modal.svg';
import NowPhoneImg from '@assets/images/smartphone_modal.svg';
import NowLeftImg from '@assets/images/left.svg';
import { IStudyRoom } from '@shared/interface';
import { Button, Layout, Modal, Spin } from 'antd';
import { css } from '@emotion/react';
import { StdTypoBody1, StdTypoH4 } from '@shared/styled/Typography';
import { Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import StudyRoomSide from '@components/organisms/StudyRoomSide';
import { StudyStep } from '@pages/AppMain/Study/Study';

interface IStudyInfoBarProps {
  status: string;
  // setTotalData: Dispatch<SetStateAction<number[]>>;
}

interface IStudyRoomProps {
  study: IStudyRoom;
}

export const StudyRoom = ({ study }: IStudyRoomProps) => {
  const [loading, setLoading] = useState(true);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const [curAction, setCurAction] = useState('공부중');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (curAction !== '공부중') setIsModalVisible(true);
    console.log(isModalVisible);
    // if (prevAction !== curAction) {
    // 소켓으로 로그 데이터 전송
    // const logDataArr = [];
    // logDataArr.push(user.data?.id);
    // logDataArr.push(curAction);
    // logDataArr.push(new Date().getTime());
    // }
  }, [curAction]);

  const loadModel = async function (video: HTMLVideoElement) {
    setLoading(true);
    const coco = await cocossd.load();
    const hand = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });
    hand.setOptions({
      //성능조절
      maxNumHands: 2, //손 인식 개수
      minDetectionConfidence: 0.5, // 높을수록 모델 정확도 향상
      minTrackingConfidence: 0.3, // 높을수록 속도저하, 모델 정확도 향상
    });

    if (video) {
      const camera = new Camera(video, {
        onFrame: async () => {
          if (video) {
            await hand.send({
              image: video,
            });
            await smartPhoneDetection(coco, video);
          }
        },
        width: 1280,
        height: 720,
      });

      hand.onResults((results: Results) => {
        setCurAction(handDetection(results));
      });

      await camera.start();
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoElementRef?.current) {
      loadModel(videoElementRef.current);
    }
  }, [videoElementRef]);

  return (
    <Layout tw="h-full justify-center">
      <Layout tw="bg-gray-10">
        <div tw="flex-grow flex items-center justify-center">
          <Spin spinning={loading} size="large" delay={500}>
            <div
              css={css`
                padding: 20px;
              `}
            >
              <video tw="rounded-xl" ref={videoElementRef} muted />
            </div>
          </Spin>
        </div>
        <Footer tw="p-0">
          <ResponsiveStyledStudyInfoBar
            // setTotalData={setTotalData}
            status={curAction}
          />
        </Footer>
      </Layout>
      <Sider width={465}>
        <StudyRoomSide />
      </Sider>
      {/*{curAction !== '공부중' && (*/}
      {/*  <Modal*/}
      {/*    visible={isModalVisible}*/}
      {/*    closable={false}*/}
      {/*    onCancel={handleCancel}*/}
      {/*    keyboard={false}*/}
      {/*    bodyStyle={{*/}
      {/*      height: '330px',*/}
      {/*      borderRadius: '20px',*/}
      {/*      justifyContent: 'center',*/}
      {/*      alignItems: 'center',*/}
      {/*      // backgroundColor: `${GRAY_10}`,*/}
      {/*      display: 'flex',*/}
      {/*      flexDirection: 'column',*/}
      {/*    }}*/}
      {/*    width={620}*/}
      {/*    footer={*/}
      {/*      <div*/}
      {/*        tw="flex justify-center items-center"*/}
      {/*        css={css`*/}
      {/*          width: 100%;*/}
      {/*          padding-bottom: 42px;*/}
      {/*          margin: 0;*/}
      {/*          border-bottom-right-radius: 20px;*/}
      {/*          border-bottom-left-radius: 20px;*/}
      {/*        `}*/}
      {/*      >*/}
      {/*        <Button*/}
      {/*          css={css`*/}
      {/*            width: 146px;*/}
      {/*            height: 44px;*/}
      {/*          `}*/}
      {/*          type="primary"*/}
      {/*          role="cancel"*/}
      {/*        >*/}
      {/*          <StdTypoBody1>공부중이에요!</StdTypoBody1>*/}
      {/*        </Button>*/}
      {/*      </div>*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <img*/}
      {/*      css={css`*/}
      {/*        margin-bottom: 15px;*/}
      {/*        width: 160px;*/}
      {/*        height: 160px;*/}
      {/*      `}*/}
      {/*      src={STATUS_TABLE[curAction].image}*/}
      {/*    />*/}
      {/*    <StdTypoH4*/}
      {/*      tw="text-gray-2"*/}
      {/*      css={css`*/}
      {/*        margin: 15px 0;*/}
      {/*      `}*/}
      {/*    >*/}
      {/*      {STATUS_TABLE[curAction].title}*/}
      {/*    </StdTypoH4>*/}
      {/*    <div tw="text-gray-4">*/}
      {/*      <StdTypoBody1*/}
      {/*        css={css`*/}
      {/*          white-space: pre-wrap;*/}
      {/*        `}*/}
      {/*      >*/}
      {/*        {STATUS_TABLE[curAction].body}*/}
      {/*      </StdTypoBody1>*/}
      {/*      <StdTypoBody1>*/}
      {/*        공부중이라고 알려주면 다시 공부가 시작돼요.*/}
      {/*      </StdTypoBody1>*/}
      {/*    </div>*/}
      {/*  </Modal>*/}
      {/*)}*/}
    </Layout>
  );
};

const ResponsiveStyledStudyInfoBar = ({ status }: IStudyInfoBarProps) => {
  const isLarge = useMediaQuery({ minWidth: 965 });
  return isLarge ? (
    <StudyInfoBar
      status={status}
      // setTotalData={props.setTotalData}
      isLarge={true}
    />
  ) : (
    <StudyInfoBar
      status={status}
      // setTotalData={props.setTotalData}
      isLarge={false}
    />
  );
};

const STATUS_TABLE: {
  [key: string]: { image: string; title: string; body: string };
} = {
  조는중: {
    image: NowSleepImg,
    title: '혹시 졸고 계신가요?',
    body: '5분동안 움직임이 없어서 공부가 중단됐어요.',
  },
  스마트폰: {
    image: NowPhoneImg,
    title: '혹시 스마트폰을 사용하시나요?',
    body: '화면에 스마트폰이 보여서 공부가 중단됐어요. ',
  },
  자리비움: {
    image: NowLeftImg,
    title: '혹시 자리를 비우셨나요?',
    body: '화면에 두 손이 보이지 않아 공부가 중단됐어요. ',
  },
};
