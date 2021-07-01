import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import 'twin.macro';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import {
  handDetection,
  smartPhoneDetection,
} from '../../../ml/userActionDetection';
import { message, Spin } from 'antd';
import { StudyStep } from './Study';

// typography
import { StdTypoH3 } from '@shared/styled/Typography';

// colors
import {
  GRAY_1,
  GRAY_6,
  GRAY_8,
  GRAY_9,
  PRIMARY_8,
} from '@shared/styles/colors';
import SocketContext from '../../../context/socket/SocketContext';
import { Socket } from 'socket.io-client/build/socket';
import { IUser } from '@shared/interface';
import { interval, Subject, timer } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

interface IReadyStatusProps {
  status: 'AWAIT' | 'READY';
}

interface IStudyReadyProps {
  setStep: Dispatch<SetStateAction<StudyStep>>;
  socket: Socket;
  user: IUser;
  doJoinStudyRoom: () => void;
}

const DEFAULT_LEFT_TIME = 5;

export const StudyReady = ({
  setStep,
  socket,
  user,
  doJoinStudyRoom,
}: IStudyReadyProps) => {
  const [loading, setLoading] = useState(true);
  const [hand, setHand] = useState(false);
  const [leftTime, setLeftTime] = useState(DEFAULT_LEFT_TIME);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const detection$ = new Subject<boolean>();

  const loadModel = async function (video: HTMLVideoElement) {
    setLoading(true);
    const coco = await cocossd.load();
    const hand = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hand.setOptions({
      maxNumHands: 2,
      minDetectionConfidence: 0.8,
      minTrackingConfidence: 0.5,
    });

    if (video) {
      // camera 못찾을 때 error 핸들링
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
        if (
          results.multiHandedness !== undefined &&
          results.multiHandedness.length === 2
        ) {
          detection$.next(true);
        } else {
          detection$.next(false);
        }
        handDetection(results);
      });

      camera
        .start()
        .then(() => {
          setLoading(false);
        })
        .catch((_) =>
          message.error({
            content: '연결된 카메라가 없거나 불러오는 대에 실패했습니다.',
            style: { ErrMsgStyle },
          }),
        );
    }
  };

  useEffect(() => {
    const detectionSubscription = detection$
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        tap((detected) => {
          setLeftTime(DEFAULT_LEFT_TIME);
          setHand(detected);
        }),
        switchMap(() =>
          interval(1000).pipe(
            take(DEFAULT_LEFT_TIME),
            map((v) => DEFAULT_LEFT_TIME - 1 - v),
          ),
        ),
      )
      .subscribe({
        next: (time) => {
          setLeftTime(time);
          console.log(time);
          // Timeout 시
          if (time === 0) {
            doJoinStudyRoom();
          }
        },
      });
    return () => {
      detectionSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (videoElementRef?.current) {
      loadModel(videoElementRef.current);
    }
  }, [videoElementRef]);

  return (
    <div tw="text-center flex flex-col justify-center items-center">
      <StdTypoH3 tw="from-gray-1 mt-16 font-medium">
        정확한 집중도 분석을 위해
      </StdTypoH3>
      <StdTypoH3 tw="from-gray-1">화면에 두 손이 나오게 준비해주세요</StdTypoH3>

      <div tw="relative pt-6 mb-20">
        <StyledStudyReadyStatus status={!hand ? 'AWAIT' : 'READY'}>
          {!hand ? '준비 중' : '준비 완료'}
        </StyledStudyReadyStatus>
        {hand && (
          <p tw="absolute -bottom-12 left-0 right-0">
            {leftTime}초 뒤 자동입장
          </p>
        )}
      </div>

      <div tw="flex-1 flex justify-center items-center">
        <Spin spinning={loading} size="large" delay={500}>
          <video tw="rounded-xl" ref={videoElementRef} muted />
        </Spin>
      </div>
    </div>
  );
};

const StyledStudyReadyStatus = styled.span(({ status }: IReadyStatusProps) => ({
  width: '119px',
  height: '40px',
  backgroundColor: status == 'AWAIT' ? GRAY_8 : PRIMARY_8,
  color: status == 'AWAIT' ? GRAY_6 : 'white',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
}));

const ErrMsgStyle = css`
  margin-top: 20vh;
  background-color: ${GRAY_9};
  color: ${GRAY_1};
  font-size: 14px;
  font-weight: normal;
  line-height: 18px;
`;
