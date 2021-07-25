import React, { useEffect, useRef, useState } from 'react';
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
import { Footer } from 'antd/es/layout/layout';
import { interval, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { StdTypoBody1, StdTypoH4 } from '@shared/styled/Typography';
import StudyRoomSide from '@components/organisms/StudyRoomSide';
import { useRecoilState } from 'recoil';
import { studyingUsersState } from '../../../atoms/studyRoomState';

interface IStudyRoomProps {
  sendStatus: (status: CurrentActionType) => void;
}

export type CurrentActionType = 'study' | 'await' | 'sleep' | 'phone';

export const StudyRoom = ({ sendStatus }: IStudyRoomProps) => {
  const videoElementRef = useRef<HTMLVideoElement>(null);

  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [curAction, setCurAction] = useState<CurrentActionType>('study');

  const handDetectionSubject = new Subject<Results>();

  const isLarge = useMediaQuery({ minWidth: 965 });

  const [studyingUsers] = useRecoilState(studyingUsersState);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const destroyCam = () => {
    if (videoElementRef) {
      const tracks = (videoElementRef.current
        ?.srcObject as MediaStream)?.getTracks();
      tracks?.forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    return destroyCam();
  }, []);

  useEffect(() => {
    const handDetectionSubscription = handDetectionSubject
      .pipe(
        map((r) => handDetection(r) as CurrentActionType),
        distinctUntilChanged(),
        tap((action) => {
          sendStatus(action);
          setIsModalVisible(false);
          setCurAction(action);
        }),
        switchMap((action) => {
          return interval(1000).pipe(
            filter(() => action !== curAction && action !== 'study'),
            take(5),
            map((v) => {
              return { leftTime: 5 - 1 - v, action };
            }),
          );
        }),
      )
      .subscribe({
        next: ({ leftTime, action }) => {
          if (!leftTime) {
            setIsModalVisible(true);
          }
        },
      });

    return () => {
      handDetectionSubscription.unsubscribe();
    };
  }, []);

  const loadModel = async function (video: HTMLVideoElement) {
    setLoading(true);
    const _coco = await cocossd.load();

    const _hand = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`,
    });
    _hand.setOptions({
      //성능조절
      maxNumHands: 2, //손 인식 개수
      minDetectionConfidence: 0.5, // 높을수록 모델 정확도 향상
      minTrackingConfidence: 0.3, // 높을수록 속도저하, 모델 정확도 향상
    });

    const camera = new Camera(video, {
      onFrame: async () => {
        if (videoElementRef?.current) {
          await _hand?.send({
            image: videoElementRef.current,
          });
          await smartPhoneDetection(_coco, videoElementRef.current);
        }
      },
      width: 1280,
      height: 720,
    });

    _hand.onResults((results: Results) => {
      handDetectionSubject.next(results);
    });

    await camera.start();
    setLoading(false);
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
          <ResponsiveStyledStudyInfoBar status={curAction} isLarge={isLarge} />
        </Footer>
      </Layout>
      {isLarge && (
        <Layout.Sider width={465}>
          <StudyRoomSide studyingUsers={studyingUsers || []} />
        </Layout.Sider>
      )}
      <Modal
        visible={isModalVisible}
        closable={false}
        onCancel={handleCancel}
        keyboard={false}
        bodyStyle={{
          height: '330px',
          borderRadius: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: `${GRAY_10}`,
          display: 'flex',
          flexDirection: 'column',
        }}
        width={620}
        css={css`
          .ant-modal-footer {
            border: 0;
          }
        `}
        footer={
          <div
            tw="flex justify-center items-center"
            css={css`
              width: 100%;
              padding-bottom: 42px;
              margin: 0;
              border-bottom-right-radius: 20px;
              border-bottom-left-radius: 20px;
            `}
          >
            <Button
              css={css`
                width: 146px;
                height: 44px;
              `}
              type="primary"
              role="cancel"
              onClick={handleCancel}
            >
              <StdTypoBody1>공부 재개하기</StdTypoBody1>
            </Button>
          </div>
        }
      >
        <img
          css={css`
            margin-bottom: 15px;
            width: 160px;
            height: 160px;
          `}
          src={STATUS_TABLE[curAction]?.image}
        />
        <StdTypoH4
          tw="text-gray-2"
          css={css`
            margin: 15px 0;
          `}
        >
          {STATUS_TABLE[curAction]?.title}
        </StdTypoH4>
        <div tw="text-gray-4 text-center">
          <StdTypoBody1>{STATUS_TABLE[curAction]?.body}</StdTypoBody1>
          <StdTypoBody1>
            공부중이라고 알려주면 다시 공부가 시작돼요.
          </StdTypoBody1>
        </div>
      </Modal>
    </Layout>
  );
};

const ResponsiveStyledStudyInfoBar = ({
  status,
  isLarge,
}: {
  status: CurrentActionType;
  isLarge: boolean;
}) => {
  return (
    <StudyInfoBar
      status={status}
      // setTotalData={props.setTotalData}
      isLarge={isLarge}
    />
  );
};

const STATUS_TABLE: {
  [key in CurrentActionType]?: { image: string; title: string; body: string };
} = {
  sleep: {
    image: NowSleepImg,
    title: '혹시 졸고 계신가요?',
    body: '5초 이상 움직임이 없어서 공부가 중단됐어요. 다시 공부를 시작하세요!',
  },
  phone: {
    image: NowPhoneImg,
    title: '혹시 스마트폰을 사용하시나요?',
    body:
      '5초 이상 화면에 스마트폰이 보여서 공부가 중단됐어요. 다시 공부를 시작하세요!',
  },
  await: {
    image: NowLeftImg,
    title: '혹시 자리를 비우셨나요?',
    body:
      '5초 이상 화면에 두 손이 보이지 않아 공부가 중단됐어요. 다시 공부를 시작하세요!',
  },
};
