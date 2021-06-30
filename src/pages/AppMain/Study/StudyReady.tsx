import React, {
  Dispatch,
  SetStateAction,
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

interface IReadyStatusProps {
  status: 'AWAIT' | 'READY';
}

interface IStudyReadyProps {
  setStep: Dispatch<SetStateAction<StudyStep>>;
}

export const StudyReady = ({ setStep }: IStudyReadyProps) => {
  const [loading, setLoading] = useState(true);
  const [hand, setHand] = useState<boolean>(false);
  const [timer, setTimer] = useState(5);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    if (timer == 0) setStep(StudyStep.STUDY_ROOM);
    return () => clearInterval(countdown);
  }, [timer]);

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
          setHand(true);
        } else {
          setHand(false);
          setTimer(5);
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
          <p tw="absolute -bottom-12 left-0 right-0">{timer}초 뒤 자동입장</p>
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
