import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
import 'twin.macro';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { HAND_CONNECTIONS, Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import {
  handDetection,
  smartPhoneDetection,
} from '@components/Study/userActionDetection';
import { userHandDetection } from '@components/Study/userHandDetection';
import { Spin, Space } from 'antd';

// components
import RTCVideo from '@components/Study/RTCVideo';

// typography
import { StdTypoH3 } from '@shared/styled/Typography';

// colors
import { GRAY_6, GRAY_8, PRIMARY_8 } from '@shared/styles/colors';
import { StudyLayout } from '@components/Layouts/study/StudyLayout';
import { ICurrentStudy } from '@pages/AppMain/Study/Study';

interface IReadyStatusProps {
  status: string;
}

interface IStudyReadyProps {
  currentStudy?: ICurrentStudy;
  isPublic: boolean;
  // timer: number;
  // setTimer: Dispatch<SetStateAction<number>>;
}

export const StudyReady = ({
  currentStudy,
  isPublic,
}: // timer,
// setTimer,
IStudyReadyProps) => {
  const [loading, setLoading] = useState(true);
  const [hand, setHand] = useState<boolean>(false);
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [timer, setTimer] = useState(5);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setLocalStream(stream);
    });
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
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
      setLoading(false);

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
      await camera.start();
    }
  };

  useEffect(() => {
    // console.log(videoElementRef);
    if (videoElementRef?.current) {
      loadModel(videoElementRef.current);
    }
  }, [videoElementRef]);

  return (
    <StudyLayout isPublic={isPublic} page="ready">
      <StdTypoH3 tw="from-gray-1 mt-16 font-medium">
        정확한 집중도 분석을 위해
      </StdTypoH3>
      <StdTypoH3 tw="from-gray-1">화면에 두 손이 나오게 준비해주세요</StdTypoH3>

      {hand == false ? (
        <StyledStudyReadyStatus status="준비중">준비중</StyledStudyReadyStatus>
      ) : (
        <div>
          <StyledStudyReadyStatus status="준비완료">
            준비완료
          </StyledStudyReadyStatus>
          <div tw="mb-6">{timer}초 뒤 자동입장</div>
        </div>
      )}
      <div>
        <div
          tw="flex flex-col items-center justify-center"
          css={css`
            height: 100%;
          `}
        >
          {loading == true && (
            <div
              css={css`
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <Spin size="large" />
            </div>
          )}
          <video
            ref={videoElementRef}
            muted
            css={css`
              height: 100%;
            `}
          />
        </div>
      </div>
    </StudyLayout>
  );
};

const StyledStudyReadyStatus = styled.div(({ status }: IReadyStatusProps) => ({
  width: '119px',
  height: '40px',
  marginTop: '30px',
  marginBottom: status == '준비중' ? '78px' : '20px',
  backgroundColor: status == '준비중' ? GRAY_8 : PRIMARY_8,
  color: status == '준비중' ? GRAY_6 : 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
}));
